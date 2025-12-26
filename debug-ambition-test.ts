
import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";

(async () => {
    console.log("Testing AmbitionBox Scraper...");
    const companies = ["Oracle", "Tata Consultancy Services"];

    for (const company of companies) {
        console.log(`\n--- Scraping ${company} ---`);
        const start = Date.now();
        const data = await scrapeAmbitionBox(company);
        const duration = Date.now() - start;

        if (data) {
            console.log("Success!");
            console.log("Review URL:", data.reviewUrl);
            console.log("Salary URL:", data.salaryUrl);
            console.log("Rating:", data.rating);
            console.log("Reviews:", data.reviewsDetails?.length || 0);
            console.log("Salary Rows:", data.salaryRows?.length || 0);
        } else {
            console.log("FAILED to scrape.");
        }
        console.log(`Duration: ${duration}ms`);
    }
})();
