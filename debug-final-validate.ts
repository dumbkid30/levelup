
import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";

(async () => {
    console.log("Testing Zomato Scraper...");
    const data = await scrapeAmbitionBox("Zomato");
    console.log("Result:", JSON.stringify(data, null, 2));

    console.log("\nTesting Oracle Scraper...");
    const data2 = await scrapeAmbitionBox("Oracle");
    console.log("Result:", JSON.stringify(data2, null, 2));
})();
