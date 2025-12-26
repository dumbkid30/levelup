
import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";

(async () => {
    console.log("Testing Hyperpure Scraper...");
    const company = "Hyperpure";

    const data = await scrapeAmbitionBox(company);

    if (data) {
        console.log("Result:", JSON.stringify(data, null, 2));
    } else {
        console.log("FAILED to scrape.");
    }
})();
