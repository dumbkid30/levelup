import { scrapeAmbitionBox } from "./src/lib/scrapers/ambitionbox";
import fs from 'fs';

async function main() {
    console.log("Debugging AmbitionBox failure for 'Oracle'...");

    // Mimic the query extraction failure scenario to see if that's the cause
    // Or just test "Oracle" directly to verify selectors.
    // Let's test two cases.

    // Case 1: Clean extraction
    console.log("\n--- Case 1: 'Oracle' ---");
    const data1 = await scrapeAmbitionBox("Oracle");
    console.log("Result 1:", JSON.stringify(data1, null, 2));

    // Case 2: User query residue (if regex failed)
    const messy = "oracle pay to sde 2 in india";
    console.log(`\n--- Case 2: '${messy}' ---`);
    const data2 = await scrapeAmbitionBox(messy);
    console.log("Result 2:", JSON.stringify(data2, null, 2));
}

main();
