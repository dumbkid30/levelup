import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";

async function main() {
    console.log("Debugging AmbitionBox failure for 'Heizen'...");

    const company = "Heizen";
    const data = await scrapeAmbitionBox(company);

    console.log("Result:", JSON.stringify(data, null, 2));
}

main();
