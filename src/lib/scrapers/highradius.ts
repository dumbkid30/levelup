import { Job } from "../data";

export async function scrapeHighRadiusJobs(_query: string = "Software Engineer"): Promise<Job[]> {
    // Fallback "Link Only" scraper because HighRadius uses dynamic Greenhouse which is hard to scrape consistently.
    return [{
        id: `highradius-fallback-${Date.now()}`,
        title: "Browse Career Opportunities at HighRadius",
        company: "HighRadius",
        location: "Global",
        type: "Full-time",
        experienceLevel: "Experienced",
        category: "Software Engineering",
        salary: "Competitive",
        postedAt: "Just now",
        postedAtMs: Date.now(),
        source: "HighRadius",
        logo: "[HR]",
        skills: ["Software Engineering", "FinTech"],
        url: "https://www.highradius.com/careers/"
    }];
}
