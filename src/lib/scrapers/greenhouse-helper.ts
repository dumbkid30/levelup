import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeGreenhouse(boardToken: string, companyName: string): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        const url = `https://boards.greenhouse.io/${boardToken}`;
        await page.goto(url, { waitUntil: "networkidle" });

        // Greenhouse boards usually have a list of sections or a direct list of .opening
        try {
            await page.waitForSelector(".opening", { timeout: 10000 });
        } catch {
            console.warn(`Greenhouse scraper (${companyName}): Timeout waiting for jobs.`);
            return [];
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            const openings = Array.from(document.querySelectorAll(".opening"));

            openings.forEach(opening => {
                const link = opening.querySelector("a");
                const locationEl = opening.querySelector(".location");

                if (link) {
                    items.push({
                        title: link.innerText.trim(),
                        url: (link as HTMLAnchorElement).href,
                        location: locationEl ? (locationEl as HTMLElement).innerText.trim() : "Remote"
                    });
                }
            });
            return items;
        });

        rawJobs.forEach((j, i) => {
            jobs.push({
                id: `gh-${boardToken}-${i}-${Date.now()}`,
                title: j.title,
                company: companyName,
                location: j.location,
                type: "Full-time",
                experienceLevel: j.title.toLowerCase().includes("senior") ? "Experienced" : "Fresher/Internship",
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: companyName,
                logo: `[${companyName.substring(0, 2).toUpperCase()}]`,
                skills: [],
                url: j.url
            });
        });

    } catch (error) {
        console.error(`Error scraping Greenhouse board ${boardToken}:`, error);
    } finally {
        if (browser) await browser.close();
    }

    return jobs;
}
