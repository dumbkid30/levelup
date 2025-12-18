import { scrapeJobs } from "./src/lib/scraper";

async function test() {
    console.log("Testing scraper...");
    try {
        const jobs = await scrapeJobs("Software Engineer");
        console.log(`Found ${jobs.length} jobs.`);
        if (jobs.length > 0) {
            console.log("First job:", jobs[0]);
        } else {
            console.log("No jobs found. Check selectors.");
        }
    } catch (error) {
        console.error("Scraper failed:", error);
    }
}

test();
