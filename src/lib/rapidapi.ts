import axios from "axios";
import { Job } from "./data";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || RAPIDAPI_KEY;
const SCRAPER_BASE_URL = process.env.SCRAPER_BASE_URL || "https://jobs-search-api.p.rapidapi.com";
const SCRAPER_API_HOST = process.env.SCRAPER_API_HOST || "jobs-search-api.p.rapidapi.com";

const LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY || RAPIDAPI_KEY;
const LINKEDIN_API_HOST = process.env.LINKEDIN_API_HOST || "linkedin-data-api.p.rapidapi.com";
const LINKEDIN_API_BASE_URL =
  process.env.LINKEDIN_API_BASE_URL || "https://linkedin-data-api.p.rapidapi.com";

const defaultHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * Fetch company details from LinkedIn Data API via RapidAPI.
 */
export async function fetchLinkedInCompany(domain: string) {
  if (!LINKEDIN_API_KEY) throw new Error("LINKEDIN_API_KEY is not set");

  const url = `${LINKEDIN_API_BASE_URL}/get-company-by-domain?domain=${encodeURIComponent(domain)}`;

  const { data } = await axios.get(url, {
    headers: {
      ...defaultHeaders,
      "x-rapidapi-host": LINKEDIN_API_HOST,
      "x-rapidapi-key": LINKEDIN_API_KEY,
    },
    timeout: 15_000,
  });

  return data;
}

/**
 * Fetch jobs from RapidAPI jobs-search-api.
 * The API response shape may vary by plan; we normalize best-effort.
 */
export async function fetchRapidJobs(query: string): Promise<Job[]> {
  if (!SCRAPER_API_KEY) return [];

  const url = `${SCRAPER_BASE_URL}/`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        ...defaultHeaders,
        "x-rapidapi-host": SCRAPER_API_HOST,
        "x-rapidapi-key": SCRAPER_API_KEY,
      },
      params: { q: query },
      timeout: 15_000,
    });

    const rawJobs: any[] = Array.isArray((data as any)?.data) ? (data as any).data : Array.isArray((data as any)?.jobs) ? (data as any).jobs : [];
    const now = Date.now();

    return rawJobs.slice(0, 50).map((job, idx) => {
      const postedAtMs =
        typeof job.publishedAt === "string" || typeof job.date === "string"
          ? Date.parse((job.publishedAt as string) || (job.date as string))
          : now - idx * 5 * 60_000; // stagger if missing

      return {
        id: `rapid-${job.id ?? job.job_id ?? idx}`,
        title: job.title ?? job.position ?? "Job",
        company: job.company ?? job.company_name ?? "Company",
        location: job.location ?? job.city ?? "Remote / Various",
        type: (job.type as Job["type"]) ?? "Full-time",
        experienceLevel: "Experienced",
        category: "Software Engineering",
        salary: job.salary ?? "Competitive",
        postedAt: postedAtMs ? new Date(postedAtMs).toLocaleString() : "Unknown",
        postedAtMs: Number.isFinite(postedAtMs) ? postedAtMs : undefined,
        source: "RapidAPI Jobs",
        logo: "[RJ]",
        skills: Array.isArray(job.skills) ? job.skills : [],
        url: job.url ?? job.link ?? "#",
      };
    });
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 403) {
      console.warn("RapidAPI jobs-search blocked (403) - skipping.");
      return [];
    }
    console.error("RapidAPI jobs-search failed:", (error as Error).message);
    return [];
  }
}
