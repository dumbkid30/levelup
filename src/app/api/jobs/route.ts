import { NextResponse } from "next/server";
import { jobs as fallbackJobs, Job } from "@/lib/data";
import { scrapeLinkedInJobs } from "@/lib/scrapers/linkedin-cheerio";
import { saveJobs } from "@/lib/db";

export const runtime = "nodejs";
export const revalidate = 0;

type LatestJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  platform: string;
  postedDate: string;
  url?: string;
  description: string;
  timestamp: number;
};

const DEFAULT_QUERY = "React developer";

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const minutes = Math.round(diffMs / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function normalizeJobs(source: Job[]): LatestJob[] {
  const now = Date.now();

  return source.map((job, index) => {
    // Determine timestamp
    const timestamp =
      typeof job.postedAtMs === "number"
        ? job.postedAtMs
        : typeof job.freshnessMinutes === "number"
          ? now - job.freshnessMinutes * 60_000
          : now - index * 5 * 60_000;

    return {
      id: job.id || `job-${index}`,
      title: job.title || "Untitled role",
      company: job.company || "Unknown company",
      location: job.location || "Remote / Various",
      platform: job.source || "Google Search", // 'platform' in LatestJob, 'source' in Job
      postedDate: job.postedAt || formatTimeAgo(timestamp),
      url: job.url || undefined,
      description:
        (Array.isArray(job.skills) && job.skills.length > 0
          ? job.skills.join(", ")
          : job.category) || "No description available.",
      timestamp,
    };
  });
}

async function loadLatestJobs(query: string): Promise<LatestJob[]> {


  // 1. Fetch from LinkedIn (Cheerio Scraper) - Prioritized
  let linkedInJobs: LatestJob[] = [];
  try {
    // If the query is the default one, we want to fetch MULTIPLE categories to get volume
    // User requested: Frontend, Nodejs, Javascript
    const searchTerms = (query === DEFAULT_QUERY)
      ? ["React developer", "frontend developer", "nodejs", "javascript developer"]
      : query;

    const scrapedJobs = await scrapeLinkedInJobs(searchTerms);
    if (scrapedJobs.length > 0) {
      linkedInJobs = normalizeJobs(scrapedJobs);
    }
  } catch (error) {
    console.error("LinkedIn scrape failed:", error);
  }

  // 2. Return unique jobs
  const uniqueJobs = Array.from(new Map(linkedInJobs.map(job => [job.url, job])).values());

  if (uniqueJobs.length > 0) {
    // Fire and forget save to cache
    saveJobs(uniqueJobs as any).catch(err => console.error("Background save failed:", err));
    return uniqueJobs;
  }

  return normalizeJobs(fallbackJobs);
}

async function handleRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || DEFAULT_QUERY;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "20", 10));

  const jobs = await loadLatestJobs(query);

  // Custom sort: Use timestamp
  // User requested "ascending" order, but for jobs "Newest First" (Descending Timestamp) is standard.
  // We will sort Newest -> Oldest (b - a).
  const sorted = [...jobs].sort((a, b) => b.timestamp - a.timestamp);

  const start = (page - 1) * limit;
  const paginated = sorted
    .slice(start, start + limit)
    .map(({ timestamp, ...job }) => job);

  return NextResponse.json({
    jobs: paginated,
    total: sorted.length,
  });
}

export async function GET(request: Request) {
  try {
    return await handleRequest(request);
  } catch (error: any) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return await handleRequest(request);
  } catch (error: any) {
    console.error("Failed to refresh jobs:", error);
    return NextResponse.json({ error: "Failed to refresh jobs" }, { status: 500 });
  }
}
