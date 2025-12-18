import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeNetflixJobs(query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const url = `https://explore.jobs.netflix.net/search?q=${encodeURIComponent(query)}`;
        await page.goto(url, { waitUntil: "networkidle" });

        // Fallback: Just return a "View all" link if strict parsing fails,
        // but first try to find actual job links.
        // Netflix link structure usually involves <a> containing the title.

        try {
            await page.waitForSelector('a[href*="/job/"]', { timeout: 5000 });
        } catch {
            // ignore timeout
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            // loose selector for any link that looks like a job
            const links = Array.from(document.querySelectorAll('a[href*="/job/"]')) as HTMLAnchorElement[];

            links.forEach(link => {
                const title = link.innerText.trim();
                // Filter out short links or irrelevant ones
                if (title.length > 5 && (title.toLowerCase().includes("engineer") || title.toLowerCase().includes("developer"))) {
                    items.push({
                        title: title,
                        url: (link as HTMLAnchorElement).href,
                        location: "Netflix / Remote" // Hard to parse reliable location without rigid selectors
                    });
                }
            });
            return items;
        });

        // Dedup rawJobs based on url
        const distinct = new Map();
        rawJobs.forEach(j => distinct.set(j.url, j));

        distinct.forEach((j, url) => {
            jobs.push({
                id: `netflix-${url.split('/').pop()}-${Date.now()}`,
                title: j.title,
                company: "Netflix",
                location: j.location,
                type: "Full-time",
                experienceLevel: j.title.toLowerCase().includes("senior") ? "Experienced" : "Fresher/Internship",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Netflix Jobs",
                logo: "[N]",
                skills: [],
                url: j.url
            });
        });

        if (jobs.length === 0) {
            // Fallback item
            jobs.push({
                id: `netflix-fallback`,
                title: "Explore all Netflix Jobs",
                company: "Netflix",
                location: "Global",
                type: "Full-time",
                experienceLevel: "Experienced",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Just now",
                postedAtMs: Date.now(),
                source: "Netflix Jobs",
                logo: "[N]",
                skills: [],
                url: url
            });
        }

    } catch (error) {
        console.error("Error in scrapeNetflixJobs:", error);
    } finally {
        if (browser) await browser.close();
    }

    return jobs;
}
