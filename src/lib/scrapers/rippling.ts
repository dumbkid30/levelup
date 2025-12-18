import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeRipplingJobs(query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const url = "https://www.rippling.com/careers/open-roles";
        await page.goto(url, { waitUntil: "networkidle" });

        // Try multiple selectors that might contain job links
        try {
            await page.waitForSelector('a[href*="/careers/"]', { timeout: 5000 });
        } catch {
            // ignore
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            const links = Array.from(document.querySelectorAll('a'));

            links.forEach(link => {
                const href = link.href;
                const title = link.innerText.trim();

                // Heuristic: Rippling job links likely live under /careers/ and have a title
                // We filter for roles relevant to engineering to avoid "About Us" links
                const isJobLink = href.includes("/careers/") &&
                    !href.endsWith("/careers/") &&
                    !href.endsWith("/open-roles");

                if (isJobLink && title.length > 5) {
                    const lowerTitle = title.toLowerCase();
                    if (lowerTitle.includes("engineer") || lowerTitle.includes("developer") || lowerTitle.includes("manager") || lowerTitle.includes("product")) {
                        items.push({
                            title: title,
                            url: href,
                            location: "Rippling / Remote"
                        });
                    }
                }
            });
            return items;
        });

        // Dedup
        const distinct = new Map();
        rawJobs.forEach(j => distinct.set(j.url, j));

        distinct.forEach((j) => {
            jobs.push({
                id: `rippling-${Date.now()}-${Math.random()}`,
                title: j.title,
                company: "Rippling",
                location: j.location,
                type: "Full-time",
                experienceLevel: j.title.toLowerCase().includes("senior") ? "Experienced" : "Fresher/Internship",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Rippling Careers",
                logo: "[RP]",
                skills: [],
                url: j.url
            });
        });

    } catch (error) {
        console.error("Error in scrapeRipplingJobs:", error);
    } finally {
        if (browser) await browser.close();
    }

    // Fallback if no jobs found
    if (jobs.length === 0) {
        return [{
            id: `rippling-fallback-${Date.now()}`,
            title: "Browse Career Opportunities at Rippling",
            company: "Rippling",
            location: "Global",
            type: "Full-time",
            experienceLevel: "Experienced",
            category: "Software Engineering",
            salary: "Competitive",
            postedAt: "Just now",
            postedAtMs: Date.now(),
            source: "Rippling",
            logo: "[RP]",
            skills: ["Software Engineering", "HR Tech"],
            url: "https://www.rippling.com/careers/open-roles"
        }];
    }

    return jobs;
}
