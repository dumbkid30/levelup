import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeHeizenJobs(_query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const url = "https://www.heizen.work/careers";
        await page.goto(url, { waitUntil: "networkidle" });

        // Try to find job links. 
        // Heizen might be a small site or using a builder.
        try {
            await page.waitForSelector('a[href*="/jobs/"]', { timeout: 5000 });
        } catch {
            // ignore
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            const links = Array.from(document.querySelectorAll('a'));

            links.forEach(link => {
                const href = link.getAttribute('href');
                const title = link.innerText.trim();

                // Heuristic for job links
                if (href && (href.includes("/jobs/") || href.includes("/career/")) && title.length > 3) {
                    items.push({
                        title: title,
                        url: link.href,
                        location: "Remote" // Assumption for Heizen
                    });
                }
            });
            return items;
        });

        rawJobs.forEach((j, i) => {
            jobs.push({
                id: `heizen-${i}-${Date.now()}`,
                title: j.title,
                company: "Heizen",
                location: j.location,
                type: "Full-time",
                experienceLevel: "Experienced",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Heizen Careers",
                logo: "[H]",
                skills: [],
                url: j.url
            });
        });

        if (jobs.length === 0) {
            // Fallback
            jobs.push({
                id: `heizen-fallback`,
                title: "Browse Career Opportunities at Heizen",
                company: "Heizen",
                location: "Global",
                type: "Full-time",
                experienceLevel: "Experienced",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Just now",
                postedAtMs: Date.now(),
                source: "Heizen",
                logo: "[H]",
                skills: ["Software Engineering"],
                url: url
            });
        }

    } catch (error) {
        console.error("Error in scrapeHeizenJobs:", error);
        // Fallback text if browser fails
        jobs.push({
            id: `heizen-fallback-err`,
            title: "Browse Career Opportunities at Heizen",
            company: "Heizen",
            location: "Global",
            type: "Full-time",
            experienceLevel: "Experienced",
            category: "Software Engineering",
            salary: "Competitive",
            postedAt: "Just now",
            postedAtMs: Date.now(),
            source: "Heizen",
            logo: "[H]",
            skills: ["Software Engineering"],
            url: "https://www.heizen.work/careers"
        });
    } finally {
        if (browser) await browser.close();
    }

    return jobs;
}
