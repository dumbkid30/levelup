
import { NextResponse } from "next/server";
import { GoogleGenAI, Tool } from "@google/genai";

export const runtime = "nodejs";
// Cache for 24 hours (86400 seconds)
export const revalidate = 86400;

// Use stable model
const MODEL_ID = "gemini-1.5-flash";

// 1. PINNED HACKATHONS (req: GSOC, MLH on top)
const PINNED_HACKATHONS = [
    {
        "id": "gsoc-2025",
        "title": "Google Summer of Code (GSoC)",
        "provider": "Google",
        "location": "Global (Remote)",
        "prizes": "Stipend ($1500 - $3000)",
        "date": "May - August 2025",
        "url": "https://summerofcode.withgoogle.com/",
        "type": "Open Source",
        "tags": ["Mentorship", "Global"]
    },
    {
        "id": "mlh-fellowship",
        "title": "MLH Fellowship",
        "provider": "Major League Hacking",
        "location": "Remote",
        "prizes": "Stipend + Career Ops",
        "date": "Rolling Applications",
        "url": "https://fellowship.mlh.io/",
        "type": "Fellowship",
        "tags": ["Open Source", "Career"]
    }
];

// 2. INDIA & GLOBAL FALLBACKS (If Gemini fails)
const FALLBACK_HACKATHONS = [
    {
        "id": "smart-india-hackathon",
        "title": "Smart India Hackathon 2025",
        "provider": "Ministry of Education",
        "location": "India (Hybrid)",
        "prizes": "₹1 Lakh per problem",
        "date": "August - December 2025",
        "url": "https://sih.gov.in/",
        "type": "Government",
        "tags": ["Innovation", "India"]
    },
    {
        "id": "eth-india",
        "title": "ETHIndia",
        "provider": "ETHGlobal / Devfolio",
        "location": "Bengaluru, India",
        "prizes": "$100,000+ in prizes",
        "date": "December 2025",
        "url": "https://ethindia.co/",
        "type": "Web3",
        "tags": ["Blockchain", "Ethereum"]
    },
    {
        "id": "superteam-gran-prix",
        "title": "Superteam Earn - Solana",
        "provider": "Superteam DAO",
        "location": "Online / India",
        "prizes": "$1000+ per bounty",
        "date": "Monthly Sprints",
        "url": "https://earn.superteam.fun/",
        "type": "Bounties",
        "tags": ["Solana", "Crypto"]
    },
    {
        "id": "code-gladiators",
        "title": "TechGig Code Gladiators",
        "provider": "TechGig",
        "location": "Online / India",
        "prizes": "₹50 Lakhs Prize Pool",
        "date": "March - June 2025",
        "url": "https://www.techgig.com/codegladiators",
        "type": "Coding Battle",
        "tags": ["Competitive", "Hiring"]
    },
    {
        "id": "kaggle-competitions",
        "title": "Kaggle Competitions",
        "provider": "Kaggle",
        "location": "Online",
        "prizes": "High Cash Prizes",
        "date": "Year-round",
        "url": "https://www.kaggle.com/competitions",
        "type": "Data Science",
        "tags": ["AI/ML", "Global"]
    },
    {
        "id": "encode-club",
        "title": "Encode Club Hackathons",
        "provider": "Encode Club",
        "location": "Online / Global",
        "prizes": "Crypto + Grants",
        "date": "Monthly",
        "url": "https://www.encode.club/events",
        "type": "Web3 / AI",
        "tags": ["Blockchain", "Education"]
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

export async function GET(_request: Request) {
    // const { searchParams } = new URL(request.url);
    // const query = searchParams.get("query") || "Hackathons in India and Global for Developers";

    const apiKey = process.env.API_KEY;

    // Combine: Pinned -> Dynamic -> Fallback
    const mergeHackathons = (dynamic: any[]) => {
        const all = [...PINNED_HACKATHONS, ...dynamic, ...FALLBACK_HACKATHONS];
        // Deduplicate by Title
        const unique = Array.from(new Map(all.map(item => [item.title, item])).values());
        return unique.slice(0, 15);
    };

    if (!apiKey) {
        return NextResponse.json({ hackathons: mergeHackathons([]) });
    }

    const ai = new GoogleGenAI({ apiKey });
    const tools: Tool[] = [{ googleSearch: {} }];

    const prompt = `
    Find 6-8 active/upcoming hackathons for developers, prioritizing **INDIA**.
    
    CRITICAL: Scan EXACTLY these sources:
    - DoraHacks, Devpost, Superteam Earn, DevDisplay, ETHGlobal
    - DevNovate, Contra (Framer), Maximally (CodeHypothesis)
    - HackQuest, MyCareerNet, MLH, HackerEarth, Hack2Skill
    - TechGig, Turing Hat, AngelHack, Kaggle, CodeStudio
    - Taikai Network, Encode Club
    
    Return ONLY a JSON array:
    [
      {
        "id": "unique_id",
        "title": "Hackathon Name",
        "provider": "Organizer (Source Platform)",
        "location": "Online / City (Prioritize India)",
        "prizes": "Prize Pool",
        "date": "Date range",
        "url": "https://link-to-hackathon",
        "type": "Category",
        "tags": ["Tag1", "Tag2"]
      }
    ]
  `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_ID,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: { tools },
        });

        const geminiHackathons = parseGeminiText(response);

        return NextResponse.json({ hackathons: mergeHackathons(geminiHackathons) });

    } catch (error) {
        console.error("Gemini hackathon search failed:", error);
        return NextResponse.json({ hackathons: mergeHackathons([]) });
    }
}
