
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trophy, Calendar, ExternalLink, Code2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Hackathon {
    id: string;
    title: string;
    provider: string;
    location: string;
    prizes: string;
    date: string;
    type: string;
    url: string;
    tags: string[];
}

export default function HackathonsPage() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHackathons = async () => {
        setLoading(true);
        try {
            const url = "/api/hackathons";
            const res = await fetch(url);
            const data = await res.json();
            if (data.hackathons) {
                setHackathons(data.hackathons);
            }
        } catch (error) {
            console.error("Failed to fetch hackathons:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHackathons();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest"
                    >
                        BUILD & COMPETE 🚀
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight glitch-text uppercase">
                        Global <span className="text-emerald-400">Hackathons</span>
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
                        Discover upcoming hackathons, coding challenges, and innovation sprints.
                    </p>
                </div>
            </section>

            {/* Feed Section */}
            <main className="container mx-auto max-w-6xl px-6 pb-24 flex-grow">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2 uppercase">
                        <Code2 className="text-emerald-500" />
                        Live Events
                    </h2>
                    {loading && <span className="text-emerald-400 text-xs animate-pulse">Scanning Devpost & MLH...</span>}
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
                            {hackathons.map((h, i) => (
                                <motion.div
                                    key={h.id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-zinc-900 border border-white/10 p-6 hover:border-emerald-400 transition-all flex flex-col hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                            <Code2 className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-900/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">
                                            {h.type}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                                        {h.title}
                                    </h3>
                                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-4 font-bold">{h.provider}</p>

                                    <div className="space-y-3 mb-6 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                            <Calendar className="w-4 h-4 text-zinc-600" />
                                            {h.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono">
                                            <Trophy className="w-4 h-4 text-emerald-600" />
                                            {h.prizes}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                                            <MapPin className="w-4 h-4 text-zinc-600" />
                                            {h.location}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {h.tags?.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-white/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={h.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-white hover:bg-emerald-400 text-black font-bold text-sm uppercase transition-colors flex items-center justify-center gap-2 group-hover:translate-x-1"
                                    >
                                        Register Now <ExternalLink className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
