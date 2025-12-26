import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getCompanyInsight } from "@/data/company-insights";

export const runtime = "nodejs";

const MODEL_ID = "gemini-flash-latest";

type RoadmapSource = {
    path: string; // Path relative to WeMakeDevs/roadmaps main branch
    keywords: string[];
    label: string;
};

// Explicit mappings to the user-provided WeMakeDevs roadmap files
const ROADMAP_SOURCES: RoadmapSource[] = [
    {
        label: "Frontend Development",
        path: "Frontend-Development/README.md",
        keywords: ["frontend", "front-end", "front end"],
    },
    {
        label: "Backend Development",
        path: "Backend-Development/README.md",
        keywords: ["backend", "back-end", "back end", "server-side", "server side"],
    },
    {
        label: "Fullstack Development",
        path: "Fullstack-Development/README.md",
        keywords: ["fullstack", "full stack", "full-stack"],
    },
    {
        label: "Android Development",
        path: "Android-Development/readme.md",
        keywords: ["android", "android dev", "android development", "kotlin"],
    },
    {
        label: "iOS Development",
        path: "iOS-Development/readme.md",
        keywords: ["ios", "ios dev", "ios development", "swift"],
    },
    {
        label: "Flutter Development",
        path: "Flutter-Development/readme.md",
        keywords: ["flutter", "dart"],
    },
    {
        label: "DevRel",
        path: "DevRel/Readme.md",
        keywords: ["devrel", "developer relations", "developer advocate", "developer advocacy"],
    },
    {
        label: "DevOps",
        path: "DevOps/README.md",
        keywords: ["devops", "sre", "site reliability"],
    },
    {
        label: "Data Science",
        path: "Data-Science/README.md",
        keywords: ["data science", "data-science", "data engineer", "data engineering", "machine learning", "ml"],
    },
    {
        label: "Blockchain",
        path: "Blockchain/readme.md",
        keywords: ["blockchain", "web3", "solidity"],
    },
    {
        label: "Open Source",
        path: "Open-Source/README.md",
        keywords: ["open source", "open-source", "oss"],
    },
];

const SYSTEM_INSTRUCTION = `
You are a senior technical mentor at LevelUp.

Answer directly and concisely. Do not start with long introductions or meta-comments (no "As a mentor" / "internal knowledge base" etc.).
Do not mention scraping, tools, or implementation details to the user.

CRITICAL INSTRUCTIONS - YOU MUST FOLLOW THESE RULES:

1. ROADMAPS (Source: WeMakeDevs/roadmaps):
   - Official files: Frontend-Development/README.md, Fullstack-Development/README.md, Open-Source/README.md, iOS-Development/readme.md, Flutter-Development/readme.md, DevRel/Readme.md, DevOps/README.md, Data-Science/README.md, Blockchain/readme.md, Backend-Development/README.md, Android-Development/readme.md.
   - **IF "CONTEXT_ROADMAP_CONTENT" IS PROVIDED BELOW:**
     - YOU MUST USE ONLY THAT CONTENT.
     - DO NOT generate your own generic roadmap.
     - DO NOT summarize excessively; list the specific resources/links from the context.
     - The context contains raw Markdown (links, headers). Preserve them.
   - **IF NO CONTEXT IS PROVIDED:**
     - Point the user to the closest official roadmap link above. Do NOT invent or hallucinate steps.
   - BRANDING: Present as LevelUp's curated path.

2. COMPANY QUESTIONS ("how is [Company]?", "[Company] reviews", "[Company] salary", "is [Company] good?"):
   - Use tools (e.g., web search / browsing) to look up the company, and when possible open its AmbitionBox review and salary pages.
   - Extract concrete data from those sources: overall rating, 2–3 key pros/cons themes, and 1–3 representative salary ranges.
   - **OUTPUT FORMAT (STRICT):** 3–6 bullet points covering:
     - Rating: include the numeric rating (e.g., 3.6/5) if you know it; if not, say `Rating: unknown`.
     - Work culture: one short sentence based on employee feedback.
     - Growth / learning: one short sentence.
     - Compensation: one short sentence that qualitatively compares pay (e.g., "competitive for the market", "below average"); mention example roles and ranges only if you've seen them.
     - Optional extra bullet for any critical caveat (e.g., "high pressure, long hours").
   - **PROHIBITIONS:**
     - Do NOT include any URLs, links, or external references unless the user explicitly asks.
     - Do NOT mention scraping, tools, AmbitionBox, or phrases like "I cannot fetch" / "I cannot provide"; if you lack exact data, briefly state what you do and don’t know.
     - Do NOT write long paragraphs, tables, or disclaimers. Stay brief and practical.

3. GENERAL MENTORSHIP:
   - For technical questions (debugging, concepts), answer as an expert engineer.
   - For network/referral queries: "You need to sign up and I will fetch it."

FORMATTING:
- Use clear Markdown where helpful.
- Use bold text for key figures (e.g., ratings) when you know them.
- Keep the tone straightforward and professional.
`;

async function fetchRoadmapContent(source: RoadmapSource): Promise<string | null> {
    const basePath = source.path.replace(/^\/+/, "");
    const pathVariants = Array.from(
        new Set([
            basePath,
            basePath.replace(/README\.md$/i, "README.md"),
            basePath.replace(/README\.md$/i, "Readme.md"),
            basePath.replace(/README\.md$/i, "readme.md"),
        ])
    );

    for (const candidate of pathVariants) {
        const url = `https://raw.githubusercontent.com/WeMakeDevs/roadmaps/main/${candidate}`;
        console.log(`[Ask API] Fetching roadmap for ${source.label} from ${url}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!res.ok) {
                console.warn(`[Ask API] Roadmap fetch failed with status ${res.status} for ${candidate}`);
                continue;
            }

            const text = await res.text();
            const folderPath = candidate.substring(0, candidate.lastIndexOf("/"));
            const repoBaseUrl = `https://github.com/WeMakeDevs/roadmaps/blob/main/${folderPath}`;

            const fixedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, href) => {
                if (href.startsWith("http") || href.startsWith("#")) {
                    return match; // Already absolute or anchor
                }
                const cleanHref = href.startsWith("./") ? href.substring(2) : href;
                return `[${linkText}](${repoBaseUrl}/${cleanHref})`;
            });

            return fixedText;
        } catch (e: any) {
            clearTimeout(timeoutId);
            if (e.name === "AbortError") {
                console.error(`[Ask API] Roadmap fetch timed out for ${source.label}`);
            } else {
                console.error(`[Ask API] Failed to fetch roadmap for ${source.label}:`, e);
            }
        }
    }

    console.error(`[Ask API] All roadmap fetch attempts failed for ${source.label}`);
    return null;
}

function findRoadmapSource(prompt: string): RoadmapSource | null {
    const lower = prompt.toLowerCase();
    return ROADMAP_SOURCES.find((source) =>
        source.keywords.some((keyword) => lower.includes(keyword))
    ) || null;
}

const AMBITIONBOX_COMPANY_PATTERNS: RegExp[] = [
    /\bhow\s+much\s+(.+?)\s+pay\b/i,
    /\bhow\s+is\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
    /\btell\s+me\s+about\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
    /\binfo\s+on\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
    /\bstats\s+for\s+(.+?)(?:\b(reviews?|rating|salary|salaries|pay|compensation|package)\b|$)/i,
    /\b(?:salary|salaries|reviews?|rating|pay|compensation|package)\s+(?:for|at|in)\s+(.+?)$/i,
    /\b(.+?)\s+(?:reviews?|rating|salary|salaries|pay|compensation|package)\b/i,
    /\b(?:at|in|with|for|@)\s+(.+?)$/i,
];

const AMBITIONBOX_ROLE_NOISE = /\b(sde\s*\d+|sde|software engineer|developer|engineer|analyst|manager|intern|trainee|lead|architect|qa|tester|product manager|data scientist|devops|full stack|fullstack|frontend|backend|mobile|ios|android|designer|consultant|associate|staff|principal|director|senior|junior|sr|jr)\b/gi;
const AMBITIONBOX_QUERY_NOISE = /\b(review|reviews|rating|salary|salaries|pay|compensation|package|ctc|benefits|interview|interviews|company|culture|work|good|bad|role|position|job|designation|about|info|stats|what|how|much|does|tell|me)\b/gi;
const AMBITIONBOX_LOCATION_NOISE = /\b(in|at|for|as)\s+(india|usa|us|uk|canada|remote|bangalore|bengaluru|hyderabad|pune|mumbai|delhi|noida|gurgaon|gurugram|chennai|kolkata|ahmedabad|chandigarh|kochi|lucknow|jaipur|coimbatore|trivandrum|bhubaneswar)\b/gi;

function cleanCompanyCandidate(candidate: string): string {
    let cleaned = candidate.replace(/\(.*?\)/g, " ");
    cleaned = cleaned.replace(/[?.]/g, " ");
    cleaned = cleaned.replace(AMBITIONBOX_ROLE_NOISE, " ");
    cleaned = cleaned.replace(AMBITIONBOX_QUERY_NOISE, " ");
    cleaned = cleaned.replace(AMBITIONBOX_LOCATION_NOISE, " ");
    cleaned = cleaned.replace(/\b(at|in|for|as|to|of|from|with)\b$/i, "");
    cleaned = cleaned.replace(/\s+/g, " ").trim();
    return cleaned;
}

function extractAmbitionBoxCompany(prompt: string): string | null {
    const normalized = prompt.replace(/\s+/g, " ").trim();
    if (!normalized || /\byourself\b/i.test(normalized)) {
        return null;
    }

    for (const pattern of AMBITIONBOX_COMPANY_PATTERNS) {
        const match = normalized.match(pattern);
        if (match?.[1]) {
            const candidate = cleanCompanyCandidate(match[1]);
            if (candidate.length > 2 && !/roadmap/i.test(candidate)) {
                return candidate;
            }
        }
    }

    const fallback = cleanCompanyCandidate(normalized);
    if (fallback.length > 2 && !/roadmap/i.test(fallback)) {
        return fallback;
    }
    return null;
}


export async function POST(request: Request) {
    console.log("[Ask API] Received request");

    try {
        const body = await request.json().catch(() => null);

        if (!body || !body.prompt) {
            console.warn("[Ask API] Missing prompt");
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const { prompt } = body;
        console.log(`[Ask API] Processing prompt: "${prompt.substring(0, 50)}..."`);

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("[Ask API] API_KEY not found");
            return NextResponse.json(
                { error: "Ask API not configured: set API_KEY in .env.local" },
                { status: 500 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });
        // Use 'any' type for tools if Tool type is missing or causing issues
        const tools: any[] = [{ googleSearch: {} }];

        let dynamicContext = "";
        const lowerPrompt = prompt.toLowerCase();

        const isRoadmapIntent = (
            lowerPrompt.includes("roadmap") ||
            lowerPrompt.includes("path") ||
            lowerPrompt.includes("guide") ||
            lowerPrompt.includes("become") ||
            lowerPrompt.includes("career in")
        );

        // 1. Roadmap Intent
        if (isRoadmapIntent) {
            const roadmapSource = findRoadmapSource(prompt);
            if (roadmapSource) {
                const roadmapContent = await fetchRoadmapContent(roadmapSource);
                const sourceLink = `https://github.com/WeMakeDevs/roadmaps/blob/main/${roadmapSource.path}`;
                if (roadmapContent) {
                    const truncated = roadmapContent.slice(0, 25000);
                    dynamicContext += `\n\n[CONTEXT_ROADMAP_CONTENT]\nSource: ${sourceLink}\nThe following is the OFFICIAL roadmap content you must use:\n${truncated}\n[END CONTEXT]\n`;
                    console.log(`[Ask API] Injected roadmap context for: ${roadmapSource.label}`);
                } else {
                    dynamicContext += `\n\n[CONTEXT_ROADMAP_CONTENT]\nThe official roadmap source link (use this if content missing): ${sourceLink}\n[END CONTEXT]\n`;
                    console.warn(`[Ask API] Roadmap content missing, provided link for ${roadmapSource.label}`);
                }
            }
        }

        // 2. Company Intent: try static LevelUp data first, then fall back to model
        const companyQuery = extractAmbitionBoxCompany(prompt);
        if (companyQuery) {
            const staticInsight = getCompanyInsight(companyQuery);
            if (staticInsight) {
                console.log(`[Ask API] Using static company insight for: ${staticInsight.name}`);
                const bullets: string[] = [];

                if (staticInsight.rating) {
                    bullets.push(`- Rating: **${staticInsight.rating}**`);
                }
                if (staticInsight.reputation) {
                    bullets.push(`- Reputation: ${staticInsight.reputation}`);
                }
                if (staticInsight.culture) {
                    bullets.push(`- Culture: ${staticInsight.culture}`);
                }
                if (staticInsight.growth) {
                    bullets.push(`- Growth: ${staticInsight.growth}`);
                }
                if (staticInsight.compensation) {
                    bullets.push(`- Compensation: ${staticInsight.compensation}`);
                }
                if (staticInsight.caveats?.length) {
                    bullets.push(`- Caveats: ${staticInsight.caveats.join("; ")}`);
                }

                const responseText = bullets.join("\n");
                return NextResponse.json({ response: responseText });
            }

            // No static data; ask the model to fetch and summarize
            dynamicContext += `\n\n[CONTEXT_COMPANY]\n`;
            dynamicContext += `Company: ${companyQuery}\n`;
            dynamicContext += `For this company, respond with 3-6 bullet points as described in the COMPANY QUESTIONS rules above (rating, culture, growth, compensation, caveats).\n`;
            dynamicContext += `Do not include any URLs or references; just give the best real data you can find using your tools.\n`;
            dynamicContext += `[END CONTEXT_COMPANY]\n`;
        }

        // 3. Construct Full Prompt
        const fullPrompt = `${SYSTEM_INSTRUCTION}${dynamicContext}\n\nUser Query: ${prompt}`;

        console.log("[Ask API] Calling Gemini...");
        const response = await ai.models.generateContent({
            model: MODEL_ID,
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
            config: { tools },
        });

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        console.log("[Ask API] Generated response successfully");

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error("[Ask API] Critical Error:", error);
        console.error("Error details:", error.message);

        if (process.env.NODE_ENV !== "production") {
            return NextResponse.json(
                {
                    response:
                        "Ask service encountered an error. Check server terminal for details.",
                    debugError: error.message
                },
                { status: 200 } // Return 200 to prevent 'Failed to fetch' on client
            );
        }
        return NextResponse.json(
            { error: "Failed to generate response", details: error.message },
            { status: 500 }
        );
    }
}
