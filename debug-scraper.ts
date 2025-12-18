
import { scrapeLinkedInJobs } from "./src/lib/scrapers/linkedin-cheerio";

async function debugScraper() {
    console.log("Starting Debug Scraper...");
    try {
        const jobs = await scrapeLinkedInJobs();
        console.log(`Found ${jobs.length} jobs.`);
        if (jobs.length > 0) {
            console.log("First job sample:");
            console.log(JSON.stringify(jobs[0], null, 2));

            // Check for asterisks
            if (jobs[0].title.includes("****")) {
                console.log("ALERT: Title is obfuscated!");
            }
        } else {
            console.log("No jobs found.");
        }
    } catch (e) {
        console.error("Scraper failed:", e);
    }
}

debugScraper();
