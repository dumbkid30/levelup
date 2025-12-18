"use client";

import { useState, useEffect } from "react";
import { Job } from "@/lib/data";
import JobCard from "./JobCard";
import JobFilter from "./JobFilter";
import { motion } from "framer-motion";

export default function JobBoard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [experienceLevel, setExperienceLevel] = useState("All");

    // Fetch jobs when filters change (or initial load)
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                // Construct query based on filters
                let query = "Software Engineer"; // Default
                if (selectedCategory !== "All") {
                    query = selectedCategory;
                }
                if (experienceLevel === "Fresher/Internship") {
                    query += " Intern";
                } else if (experienceLevel === "Experienced") {
                    query += " Senior";
                }

                // If category is All, make query more general
                if (selectedCategory === "All") {
                    query = "tech jobs";
                }

                const response = await fetch(`/api/jobs?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                const incoming = Array.isArray(data?.data) ? data.data : [];
                setJobs(incoming);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [selectedCategory, experienceLevel]);

    const categories = [
        "All",
        "Software Engineering",
        "Product Management",
        "Design",
        "Marketing",
        "Data Science"
    ];

    return (
        <section className="min-h-screen bg-black py-20 px-4 font-pixel">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
                    >
                        Level Up <span className="text-yellow-500">Careers</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto font-mono"
                    >
                        Find your dream role in tech. Filter by experience and category to
                        discover opportunities tailored for you.
                    </motion.p>
                </div>

                <JobFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    experienceLevel={experienceLevel}
                    onSelectExperience={setExperienceLevel}
                />

                <div className="space-y-6">
                    {loading ? (
                        // Loading Skeleton
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-gray-900 border-4 border-gray-800 p-6 animate-pulse h-48 rounded-none" />
                        ))
                    ) : jobs.length > 0 ? (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                    ) : (
                        <div className="text-center py-20 text-white/40 font-mono">
                            <p className="text-xl">No jobs found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setExperienceLevel("All");
                                }}
                                className="mt-4 text-yellow-500 hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
