import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeGoogleJobs(query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // helpful for some environments
        });
        const page = await browser.newPage();

        // Go to Google Careers
        // Using strict query to maximize relevance
        const url = `https://www.google.com/about/careers/applications/jobs/results?q=${encodeURIComponent(query)}`;
        await page.goto(url, { waitUntil: "networkidle" });

        // Wait for results
        try {
            await page.waitForSelector("a.WpHeLc", { timeout: 10000 });
        } catch {
            console.warn("Google scraper: Timeout waiting for job links.");
            return [];
        }

        // Extract data
        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            // Select all job links (Learn more buttons)
            const links = Array.from(document.querySelectorAll("a.WpHeLc"));

            links.forEach(link => {
                // The structure is complex, but the 'Learn more' link is a stable anchor.
                // We look for the job title in previous specific classes or by proximity.
                // Based on observation, the title is often in an h3 or just text in a parent block.
                // We'll try to get the closest sensible text block.

                // This traversal is heuristic
                const parent = link.closest('div[role="listitem"]') || link.parentElement?.parentElement?.parentElement;

                if (parent) {
                    const text = (parent as HTMLElement).innerText;
                    const lines = text.split('\n').filter(l => l.trim().length > 0);

                    if (lines.length >= 1) {
                        const title = lines[0]; // Title is usually the first strong text
                        const location = lines.find(l => l.includes("USA") || l.includes("Remote") || l.includes(",")) || "Remote";

                        items.push({
                            title,
                            location,
                            url: (link as HTMLAnchorElement).href
                        });
                    }
                }
            });
            return items;
        });

        rawJobs.forEach((j, i) => {
            // Basic validation
            if (!j.title) return;

            jobs.push({
                id: `google-${i}-${Date.now()}`,
                title: j.title,
                company: "Google",
                location: j.location,
                type: "Full-time",
                experienceLevel: j.title.toLowerCase().includes("senior") ? "Experienced" : "Fresher/Internship",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Google Careers",
                logo: "G", // Placeholder text logo
                skills: [],
                url: j.url
            });
        });

    } catch (error) {
        console.error("Error in scrapeGoogleJobs:", error);
    } finally {
        if (browser) await browser.close();
    }

    return jobs;
}
