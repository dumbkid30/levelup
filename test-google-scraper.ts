import { scrapeGoogleJobs } from "./src/lib/scrapers/google";

async function test() {
    console.log("Testing Google Scraper...");
    try {
        const jobs = await scrapeGoogleJobs("Software Engineer");
        console.log(`Found ${jobs.length} jobs.`);
        if (jobs.length > 0) {
            console.log("First job:", JSON.stringify(jobs[0], null, 2));
        } else {
            console.warn("No jobs found. Check selectors or network.");
        }
    } catch (error) {
        console.error("Test failed:", error);
    }
}

test();
