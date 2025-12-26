import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";

async function main() {
    console.log("Testing AmbitionBox Scraper...");

    // Test Case 1: Known direct slug
    const company1 = "Zomato";
    console.log(`\n--- Query: ${company1} ---`);
    const data1 = await scrapeAmbitionBox(company1);
    console.log("Result:", JSON.stringify(data1, null, 2));

    // Test Case 2: Needs search (usually)
    const company2 = "Tata Consultancy Services";
    console.log(`\n--- Query: ${company2} ---`);
    const data2 = await scrapeAmbitionBox(company2);
    console.log("Result:", JSON.stringify(data2, null, 2));
}

main();
