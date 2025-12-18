import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/jobs.json");

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    platform: string;
    postedDate: string;
    url?: string;
    description: string;
    fetchedAt: number;
}

export async function getJobs(page: number = 1, limit: number = 10): Promise<{ jobs: Job[]; total: number }> {
    try {
        const data = await fs.readFile(DB_PATH, "utf-8");
        const jobs: Job[] = JSON.parse(data);

        // Sort by fetch time (newest first)
        // jobs.sort((a, b) => b.fetchedAt - a.fetchedAt); 

        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            jobs: jobs.slice(start, end),
            total: jobs.length
        };
    } catch (error) {
        // If file doesn't exist, return empty
        return { jobs: [], total: 0 };
    }
}

export async function saveJobs(newJobs: Job[]) {
    try {
        let existingJobs: Job[] = [];
        try {
            const data = await fs.readFile(DB_PATH, "utf-8");
            existingJobs = JSON.parse(data);
        } catch {
            // File missing, start fresh
        }

        // Merge and deduplicate by URL (or title+company if URL missing)
        const jobMap = new Map();

        // Keep existing
        existingJobs.forEach(job => jobMap.set(job.url || `${job.title}-${job.company}`, job));

        // Add new (overwriting if exists to update fetchedAt)
        newJobs.forEach(job => jobMap.set(job.url || `${job.title}-${job.company}`, { ...job, fetchedAt: Date.now() }));

        const allJobs = Array.from(jobMap.values());

        const dir = path.dirname(DB_PATH);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(allJobs, null, 2));
    } catch (error) {
        console.error("Failed to save jobs to DB", error);
    }
}
