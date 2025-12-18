import { registry } from "./src/lib/scraper-registry";
// Import main scraper file to trigger registration
import "./src/lib/scraper";

async function testRegistry() {
    console.log("Testing Scraper Registry...");
    try {
        const jobs = await registry.scrapeAll("Software Engineer");
        console.log(`Total jobs found: ${jobs.length}`);

        // Group by company
        const byCompany: Record<string, number> = {};
        jobs.forEach(j => {
            byCompany[j.company] = (byCompany[j.company] || 0) + 1;
        });

        console.log("Jobs per company:", JSON.stringify(byCompany, null, 2));

        if (jobs.length > 0) {
            console.log("Sample job:", JSON.stringify(jobs[0], null, 2));
        }
    } catch (error) {
        console.error("Registry test failed:", error);
    }
}

testRegistry();
