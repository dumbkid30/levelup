"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IconBriefcase, IconExternalLink, IconArrowLeft, IconArrowRight, IconMapPin, IconClock } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    platform: string;
    postedDate: string;
    url?: string;
    description: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const LIMIT = 9;

    const fetchJobs = useCallback(async (pageNum: number) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/jobs?page=${pageNum}&limit=${LIMIT}`, { cache: "no-store" });
            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            const incomingJobs = Array.isArray(data.jobs) ? data.jobs : [];
            setJobs(incomingJobs);
            setTotal(typeof data.total === "number" ? data.total : incomingJobs.length);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch jobs. Please try again.");
            setJobs([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs(page);
    }, [page, fetchJobs]);

    const handleRefresh = () => {
        setPage(1);
        fetchJobs(1);
    };

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 relative overflow-hidden">
                {/* Retro Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    {/* Header Section */}
                    {/* Header Removed */}

                    {/* Error */}
                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded mb-8 text-center font-mono text-sm">
                            [ERROR] {error}
                        </div>
                    )}

                    {/* Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-zinc-900/50 rounded border border-white/5 animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
                                </div>
                            ))}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-24 bg-zinc-900/30 rounded border border-white/5 border-dashed">
                            <IconBriefcase className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-zinc-400 mb-2">NO SIGNALS DETECTED</h3>
                            <button onClick={handleRefresh} className="text-yellow-400 hover:underline text-sm uppercase">
                                Try Scanning Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                <AnimatePresence mode="popLayout">
                                    {jobs.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative bg-zinc-900 border border-white/10 p-6 rounded hover:border-yellow-400 transition-all flex flex-col h-full hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="bg-zinc-800 p-2 rounded border border-white/5 text-zinc-400 group-hover:text-yellow-400 transition-colors">
                                                    <IconBriefcase size={20} />
                                                </div>
                                                <span className="text-[10px] font-bold px-2 py-1 bg-blue-900/20 text-blue-400 rounded uppercase tracking-wider border border-blue-500/20">
                                                    {job.platform}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors" title={job.title}>
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 mb-4 font-mono truncate">
                                                {job.company}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                                <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-white/10">
                                                    <IconMapPin size={12} /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-green-400 bg-green-900/10 px-2 py-1 rounded border border-green-500/20">
                                                    <IconClock size={12} /> {job.postedDate}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/10 flex gap-2">
                                                {job.url ? (
                                                    <a
                                                        href={job.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 bg-white hover:bg-yellow-400 text-black font-bold text-center py-2.5 rounded text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide group-hover:translate-x-1"
                                                    >
                                                        Apply <IconExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <button disabled className="flex-1 bg-zinc-800 text-zinc-600 font-bold py-2 rounded text-sm cursor-not-allowed">
                                                        Closed
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-3 bg-zinc-900 border border-white/10 hover:border-yellow-400 text-white rounded transition-colors disabled:opacity-30 disabled:hover:border-white/10"
                                    >
                                        <IconArrowLeft size={20} />
                                    </button>

                                    <div className="font-pixel text-sm bg-zinc-900 px-4 py-2 rounded border border-white/10 text-zinc-400">
                                        Page <span className="text-yellow-400 mx-1">{page}</span> / {totalPages}
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-3 bg-zinc-900 border border-white/10 hover:border-yellow-400 text-white rounded transition-colors disabled:opacity-30 disabled:hover:border-white/10"
                                    >
                                        <IconArrowRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
