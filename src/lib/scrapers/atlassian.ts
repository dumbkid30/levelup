import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeAtlassianJobs(_query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        // This URL is specific to Engineering filter
        const url = "https://www.atlassian.com/company/careers/all-jobs?team=Engineering&location=&search=";
        await page.goto(url, { waitUntil: "networkidle" });

        // Wait for links to appear
        try {
            await page.waitForSelector('a[href*="/company/careers/details/"]', { timeout: 10000 });
        } catch {
            // ignore timeout
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            const links = Array.from(document.querySelectorAll('a[href*="/company/careers/details/"]')) as HTMLAnchorElement[];

            links.forEach(link => {
                const title = link.innerText.trim();
                if (title.length > 5) { // Filter out empty or icon links
                    items.push({
                        title: title,
                        url: (link as HTMLAnchorElement).href,
                        location: "Atlassian / Remote"
                    });
                }
            });
            return items;
        });

        rawJobs.forEach((j, i) => {
            // Simple dedup based on URL or title
            jobs.push({
                id: `atlassian-${i}-${Date.now()}`,
                title: j.title,
                company: "Atlassian",
                location: j.location,
                type: "Full-time",
                experienceLevel: j.title.toLowerCase().includes("senior") ? "Experienced" : "Fresher/Internship",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Atlassian Careers",
                logo: "[A]", // Placeholder logo
                skills: [],
                url: j.url
            });
        });

    } catch (error) {
        console.error("Error in scrapeAtlassianJobs:", error);
    } finally {
        if (browser) await browser.close();
    }

    return jobs;
}
