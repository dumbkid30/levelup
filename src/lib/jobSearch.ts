import { GoogleGenAI, Tool } from "@google/genai";
import { Job, saveJobs } from "./db";

// Re-export Job from db to keep imports clean
export type { Job };

export interface SeedResult {
    message: string;
    totalAdded: number;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Diverse queries to get a broad mix of jobs
const QUERIES = [
    'site:linkedin.com/jobs/view ("React Developer" OR "Frontend Engineer") "Remote" "posted 24h"',
    'site:wellfound.com ("React" OR "Node.js") "Remote" startup',
    'site:naukri.com "React Developer" "Remote"',
    'site:indeed.com/viewjob "Node.js Developer" "Remote"',
    'site:linkedin.com/jobs/view "Next.js" "Remote"',
    'site:weworkremotely.com "React" OR "Node"'
];

export const seedJobs = async (): Promise<SeedResult> => {
    const modelId = "gemini-2.5-flash";
    const tools: Tool[] = [{ googleSearch: {} }];

    console.log("🌱 Seeding jobs initiated...");

    const fetchForQuery = async (query: string) => {
        const prompt = `
      You are a specialized job hunter.
      GOAL: Find REAL, ACTIVE job listings for this specific query: '${query}'
      CRITICAL: Only output jobs that have a VALID, DIRECT URL.
      
      OUTPUT FORMAT (JSON ARRAY ONLY):
      [
        {
          "title": "Job Title",
          "company": "Company Name",
          "location": "Location",
          "platform": "Platform Name",
          "postedDate": "e.g. 2 hours ago",
          "url": "https://...", 
          "description": "Short summary (max 120 chars)"
        }
      ]
      
      RULES:
      - Return at least 6-8 jobs per query.
      - URL is MANDATORY. If no URL, skip the job.
      - Return ONLY the JSON array. No markdown, no "json" code fencing.
      - If strict 24h yields nothing, look up to 3 days.
    `;

        try {
            const response = await ai.models.generateContent({
                model: modelId,
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                config: { tools },
            });

            const text = (response as any).text || "";
            // Clean up potential code fences
            const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const parsed = JSON.parse(cleanJson);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error(`Failed query: ${query}`, e);
            return [];
        }
    };

    // Run all queries in parallel
    const results = await Promise.all(QUERIES.map(q => fetchForQuery(q)));
    const flatJobs = results.flat();

    // Basic validation and mapping
    const validJobs: Job[] = flatJobs
        .filter((j: any) => j.url && j.title)
        .map((j: any) => ({
            id: Math.random().toString(36).slice(2),
            title: j.title || "Unknown Title",
            company: j.company || "Unknown Company",
            location: j.location || "Remote",
            platform: j.platform || "Other",
            postedDate: j.postedDate || "Recently",
            url: j.url,
            description: j.description || "No description available.",
            fetchedAt: Date.now()
        }));

    await saveJobs(validJobs);

    return {
        message: "Jobs seeded successfully",
        totalAdded: validJobs.length
    };
};
