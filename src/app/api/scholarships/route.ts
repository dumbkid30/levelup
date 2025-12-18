
import { NextResponse } from "next/server";
import { GoogleGenAI, Tool } from "@google/genai";

export const runtime = "nodejs";
// Cache for 24 hours (86400 seconds)
export const revalidate = 86400;

// Use stable model
const MODEL_ID = "gemini-1.5-flash";

// 1. PINNED SCHOLARSHIPS (Always displayed at top)
const PINNED_SCHOLARSHIPS = [
    {
        "id": "stipendium-hungaricum-2026",
        "title": "Stipendium Hungaricum Scholarship 2026-27",
        "provider": "Government of Hungary",
        "country": "Hungary",
        "amount": "Full Tuition + Stipend + Housing",
        "deadline": "January 15, 2026",
        "degree": "Bachelor / Master / PhD",
        "url": "https://stipendiumhungaricum.hu/",
        "flag": "🇭🇺",
        "tags": ["Fully Funded", "Europe"]
    },
    {
        "id": "china-csc-2025",
        "title": "Chinese Government Scholarship (CSC)",
        "provider": "China Scholarship Council",
        "country": "China",
        "amount": "Full Tuition + Accommodation + Stipend",
        "deadline": "February-April 2025 (Varies)",
        "degree": "Bachelor / Master / PhD",
        "url": "https://www.campuschina.org/",
        "flag": "🇨🇳",
        "tags": ["Fully Funded", "Asia"]
    },
    {
        "id": "anso-scholarship",
        "title": "ANSO Scholarship for Young Talents",
        "provider": "Alliance of International Science Organizations",
        "country": "China",
        "amount": "Full Tuition + High Stipend (up to 7000 RMB)",
        "deadline": "February 15, 2025",
        "degree": "Master / PhD",
        "url": "http://www.anso.org.cn/programmes/talent/scholarship/",
        "flag": "🇨🇳",
        "tags": ["Science", "High Value"]
    }
];

// 2. FALLBACK SCHOLARSHIPS (Displayed if Gemini fails)
const FALLBACK_SCHOLARSHIPS = [
    {
        "id": "chevening-2025",
        "title": "Chevening Scholarship",
        "provider": "UK Government",
        "country": "United Kingdom",
        "amount": "Full Funding + Stipend",
        "deadline": "November 2025",
        "degree": "Masters",
        "url": "https://www.chevening.org/",
        "flag": "🇬🇧",
        "tags": ["Fully Funded", "Leadership"]
    },
    {
        "id": "fulbright-2025",
        "title": "Fulbright Foreign Student Program",
        "provider": "USA Government",
        "country": "United States",
        "amount": "Full Tuition + Living",
        "deadline": "Varies (Oct-Dec)",
        "degree": "Masters / PhD",
        "url": "https://foreign.fulbrightonline.org/",
        "flag": "🇺🇸",
        "tags": ["Prestige", "Research"]
    },
    {
        "id": "gates-cambridge",
        "title": "Gates Cambridge Scholarship",
        "provider": "Bill & Melinda Gates Foundation",
        "country": "United Kingdom",
        "amount": "Full Cost",
        "deadline": "January 2026",
        "degree": "Postgraduate",
        "url": "https://www.gatescambridge.org/",
        "flag": "🇬🇧",
        "tags": ["Merit", "Leadership"]
    }
];

function parseGeminiText(raw: any): any[] {
    const candidateText = Array.isArray(raw?.response?.candidates)
        ? raw.response.candidates
            .flatMap((c: any) =>
                Array.isArray(c?.content?.parts)
                    ? c.content.parts
                        .map((p: any) => (typeof p?.text === "string" ? p.text : ""))
                        .join("\n")
                    : ""
            )
            .join("\n")
        : "";

    const text =
        typeof raw?.text === "function"
            ? raw.text()
            : typeof raw?.text === "string"
                ? raw.text
                : candidateText;

    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    try {
        const parsed = JSON.parse(cleanJson);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        console.error("Failed to parse Gemini JSON:", cleanJson);
        return [];
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "Scholarships for international students";

    const apiKey = process.env.API_KEY;

    // Combine pinned with either Gemini or Fallback
    // Helper to ensure uniqueness
    const mergeScholarships = (dynamic: any[]) => {
        const all = [...PINNED_SCHOLARSHIPS, ...dynamic];
        const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
        return unique;
    };

    // 1. If No API Key -> Return Pinned + Fallback
    if (!apiKey) {
        return NextResponse.json({ scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS) });
    }

    const ai = new GoogleGenAI({ apiKey });
    const tools: Tool[] = [{ googleSearch: {} }];

    const prompt = `
    Find 6-8 active scholarships for: "${query}".
    Focus on fully funded or high-value scholarships for international students.
    
    Return ONLY a JSON array with this structure:
    [
      {
        "id": "unique_id",
        "title": "Scholarship Name",
        "provider": "University or Organization Name",
        "country": "Country Name",
        "amount": "Funding Amount (e.g. $10,000 or Full Tuition)",
        "deadline": "Deadline Date",
        "degree": "Target Degree (Masters, PhD, Undergraduate)",
        "url": "https://application-link",
        "flag": "Country Flag Emoji",
        "tags": ["Full Funded", "Merit-based"]
      }
    ]
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_ID,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: { tools },
        });

        const geminiScholarships = parseGeminiText(response);

        // 2. Return Pinned + Gemini results
        if (geminiScholarships.length > 0) {
            return NextResponse.json({ scholarships: mergeScholarships(geminiScholarships) });
        }

        // 3. Fallback if Gemini empty -> Return Pinned + Fallback
        return NextResponse.json({ scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS) });

    } catch (error) {
        console.error("Gemini scholarship search failed:", error);
        // 4. Fallback on error -> Return Pinned + Fallback
        return NextResponse.json({ scholarships: mergeScholarships(FALLBACK_SCHOLARSHIPS) });
    }
}
