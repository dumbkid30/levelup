import { Job } from "./data";

export type ScraperFunction = (query: string) => Promise<Job[]>;

export class ScraperRegistry {
    private scrapers: Map<string, ScraperFunction> = new Map();

    register(name: string, scraper: ScraperFunction) {
        this.scrapers.set(name, scraper);
    }

    async scrapeAll(query: string = "Software Engineer"): Promise<Job[]> {
        const promises = Array.from(this.scrapers.entries()).map(async ([name, scraper]) => {
            try {
                console.log(`Starting scraper: ${name}`);
                const jobs = await scraper(query);
                console.log(`Scraper ${name} found ${jobs.length} jobs.`);
                return jobs;
            } catch (error) {
                console.error(`Scraper ${name} failed:`, error);
                return [];
            }
        });

        const results = await Promise.all(promises);
        return results.flat();
    }
}

export const registry = new ScraperRegistry();
