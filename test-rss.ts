import axios from "axios";

async function testRSS() {
    console.log("Testing WWR RSS Feed...");
    try {
        const response = await axios.get("https://weworkremotely.com/remote-jobs.rss", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });
        console.log("Status:", response.status);
        console.log("Data snippet:", response.data.substring(0, 200));
    } catch (error) {
        console.error("RSS Fetch failed:", error);
    }
}

testRSS();
