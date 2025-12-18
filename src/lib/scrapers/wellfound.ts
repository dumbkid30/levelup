import { chromium } from "playwright";
import { Job } from "../data";

export async function scrapeWellfoundJobs(query: string = "Software Engineer"): Promise<Job[]> {
    const jobs: Job[] = [];
    let browser;

    // Check for credentials
    const email = process.env.WELLFOUND_EMAIL;
    const password = process.env.WELLFOUND_PASSWORD;

    if (!email || !password) {
        console.log("Wellfound: No credentials found in env, using fallback.");
        return getFallback(query);
    }

    try {
        console.log("Wellfound: Credentials found, attempting login...");
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // 1. Login
        await page.goto("https://wellfound.com/login", { waitUntil: "networkidle" });

        // Simple login flow (selectors might need adjustment if WF changes them)
        await page.fill('input[type="email"]', email);
        await page.fill('input[type="password"]', password);
        await page.click('button[type="submit"]'); // or 'input[type="submit"]'

        await page.waitForNavigation({ waitUntil: "networkidle", timeout: 15000 }).catch(() => { });

        // Check if login succeeded (e.g. check for avatar or redirect)

        // 2. Search
        const searchUrl = `https://wellfound.com/jobs?role=${encodeURIComponent(query)}`;
        await page.goto(searchUrl, { waitUntil: "networkidle" });

        // 3. Scrape
        // Look for job cards
        try {
            await page.waitForSelector('[data-test="JobCard"]', { timeout: 10000 });
        } catch {
            console.warn("Wellfound: Timeout waiting for job cards after login.");
        }

        const rawJobs = await page.evaluate(() => {
            const items: any[] = [];
            // Selectors based on common Wellfound structure (data-test attributes are best if available)
            const cards = Array.from(document.querySelectorAll('[data-test="JobCard"]'));

            cards.forEach(card => {
                const titleEl = card.querySelector('[data-test="JobTitle"]');
                const companyEl = card.querySelector('[data-test="StartupHeader"]'); // heuristic
                const linkEl = titleEl?.closest('a') || card.querySelector('a');
                const locationEl = card.querySelector('.location'); // heuristic

                if (titleEl && linkEl) {
                    items.push({
                        title: (titleEl as HTMLElement).innerText.trim(),
                        company: companyEl ? (companyEl as HTMLElement).innerText.trim() : "Startup",
                        url: (linkEl as HTMLAnchorElement).href,
                        location: locationEl ? (locationEl as HTMLElement).innerText.trim() : "Remote"
                    });
                }
            });
            return items;
        });

        rawJobs.forEach((j, i) => {
            jobs.push({
                id: `wf-${i}-${Date.now()}`,
                title: j.title,
                company: j.company,
                location: j.location,
                type: "Full-time",
                experienceLevel: "Experienced", // Default, as strict filtering handles the rest
                category: "Software Engineering",
                salary: "Competitive",
                postedAt: "Recently",
                postedAtMs: Date.now(),
                source: "Wellfound",
                logo: "[WF]",
                skills: [],
                url: j.url
            });
        });

    } catch (error) {
        console.error("Error in scrapeWellfoundJobs (Authenticated):", error);
        // Return fallback on error
        return getFallback(query);
    } finally {
        if (browser) await browser.close();
    }

    if (jobs.length === 0) return getFallback(query);

    return jobs;
}

function getFallback(query: string): Job[] {
    return [{
        id: `wellfound-fallback-${Date.now()}`,
        title: `Browse Startup Jobs on Wellfound ("${query}")`,
        company: "Wellfound (AngelList)",
        location: "Global / Remote",
        type: "Full-time",
        experienceLevel: "Experienced",
        category: "Software Engineering",
        salary: "Competitive",
        postedAt: "Just now",
        postedAtMs: Date.now(),
        source: "Wellfound",
        logo: "[WF]",
        skills: ["Startup", "Tech"],
        url: `https://wellfound.com/jobs?role=${encodeURIComponent(query)}`
    }];
}
