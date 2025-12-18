
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, GraduationCap, Calendar, DollarSign, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Scholarship {
    id: string;
    title: string;
    provider: string;
    country: string;
    amount: string;
    deadline: string;
    degree: string;
    url: string;
    flag: string;
    tags: string[];
}

export default function StudyAbroadPage() {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch scholarships using Gemini API (Feed Mode)
    const fetchScholarships = async () => {
        setLoading(true);
        try {
            // No query param -> API uses default broad search
            const url = "/api/scholarships";
            const res = await fetch(url);
            const data = await res.json();
            if (data.scholarships) {
                setScholarships(data.scholarships);
            }
        } catch (error) {
            console.error("Failed to fetch scholarships:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScholarships(); // Initial load
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-green-500/5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded bg-green-900/20 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest"
                    >
                        Directory
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight glitch-text uppercase">
                        Study <span className="text-green-400">Abroad</span>
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
                        Curated list of international scholarships. Updated daily using AI.
                    </p>
                </div>
            </section>

            {/* Results Section */}
            <main className="container mx-auto max-w-6xl px-6 pb-24 flex-grow">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2 uppercase">
                        <GraduationCap className="text-green-500" />
                        Latest Opportunities
                    </h2>
                    {loading && <span className="text-green-400 text-xs animate-pulse">Scanning Global Database...</span>}
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 bg-zinc-900/50 border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {scholarships.map((s, i) => (
                                <motion.div
                                    key={s.id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-zinc-900 border border-white/10 p-6 hover:border-green-400 transition-all flex flex-col hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-3xl group-hover:scale-110 transition-transform cursor-default" title={s.country}>
                                            {s.flag}
                                        </div>
                                        <span className="px-2 py-1 bg-green-900/20 text-green-400 text-[10px] font-bold uppercase border border-green-500/20">
                                            {s.degree}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
                                        {s.title}
                                    </h3>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-bold">{s.provider}</p>

                                    <div className="space-y-3 mb-6 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                            <MapPin className="w-4 h-4 text-zinc-600" />
                                            {s.country}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-green-300 font-mono">
                                            <DollarSign className="w-4 h-4 text-green-600" />
                                            {s.amount}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                            <Calendar className="w-4 h-4 text-zinc-600" />
                                            Deadline: {s.deadline}
                                        </div>
                                    </div>

                                    <a
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-white hover:bg-green-400 text-black font-bold text-sm uppercase transition-colors flex items-center justify-center gap-2 group-hover:translate-x-1"
                                    >
                                        Apply Now <ExternalLink className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && scholarships.length === 0 && (
                    <div className="text-center py-24 text-zinc-500 font-mono">
                        [NO_DATA] Try reloading.
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
