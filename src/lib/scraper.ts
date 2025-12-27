import { Job } from "./data";
import { registry } from "./scraper-registry";
import { scrapeGoogleJobs } from "./scrapers/google";
import { scrapeNetflixJobs } from "./scrapers/netflix";
import { scrapeRipplingJobs } from "./scrapers/rippling";
import { scrapeHighRadiusJobs } from "./scrapers/highradius";
import { scrapeAtlassianJobs } from "./scrapers/atlassian";
import { scrapeHeizenJobs } from "./scrapers/heizen";
import { scrapeWellfoundJobs } from "./scrapers/wellfound";

// Register scrapers
registry.register("Google", scrapeGoogleJobs);
registry.register("Netflix", scrapeNetflixJobs);
registry.register("Rippling", scrapeRipplingJobs);
registry.register("HighRadius", scrapeHighRadiusJobs);
registry.register("Atlassian", scrapeAtlassianJobs);
registry.register("Heizen", scrapeHeizenJobs);
registry.register("Wellfound", scrapeWellfoundJobs);

// Strict whitelist filters requested by user
const ALLOWED_KEYWORDS = ["frontend", "sde", "software engineer", "backend", "nodejs", "product", "manager", "design", "marketing", "data", "science", "analyst", "ux", "ui", "developer", "engineer"];

// Exclude senior/leadership roles to enforce "0-4 years" constraint
const EXCLUDED_KEYWORDS = [
  "senior", "sr.", "sr ", "staff", "principal", "lead", "manager",
  "architect", "head", "director", "vp", "iii", "iv"
];

function matchesFilters(job: Job): boolean {
  const text = `${job.title} ${job.skills.join(" ")}`.toLowerCase();

  // 1. Must contain at least one ALLOWED keyword
  const hasAllowed = ALLOWED_KEYWORDS.some(keyword => text.includes(keyword));
  if (!hasAllowed) return false;

  // 2. Must NOT contain any EXCLUDED keyword (enforcing 0-4 years)
  const hasExcluded = EXCLUDED_KEYWORDS.some(keyword => text.includes(keyword));
  if (hasExcluded) return false;

  return true;
}

export async function scrapeJobs(query: string = "Software Engineer"): Promise<Job[]> {
  console.log("Starting scrapeJobs with query:", query);

  // 1. Run all registered scrapers
  const allJobs = await registry.scrapeAll(query);

  // 2. Apply Strict Filtering
  const filteredJobs = allJobs.filter(matchesFilters);

  // Deduping
  const deduped = Array.from(
    filteredJobs.reduce((map, job) => {
      const key = job.url || job.id;
      if (!map.has(key)) map.set(key, job);
      return map;
    }, new Map<string, Job>())
  ).map(([, job]) => job);

  // Shuffle the results to mix companies
  // Fisher-Yates shuffle
  for (let i = deduped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deduped[i], deduped[j]] = [deduped[j], deduped[i]];
  }

  return deduped;
}
