"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";



export const GoogleGeminiEffect = ({
    title,
    description,
    className,
}: {
    title?: string;
    description?: string;
    className?: string;
}) => {
    return (
        <div className={cn("relative pt-0 pb-10", className)}>
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-6 uppercase font-pixel drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                {title || `Build with Aceternity UI`}
            </h2>
            <p className="text-sm md:text-lg text-center text-zinc-400 max-w-2xl mx-auto mb-0 px-4">
                {description ||
                    `Scroll this component and see the bottom SVG come to life wow this
        works!`}
            </p>

            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center -mt-12 md:-mt-32">
                <div className="relative w-[1200px] h-[500px] scale-[0.4] md:scale-75 lg:scale-100 origin-center">
                    {/* Connecting Lines SVG */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1200 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Left Connections */}
                        {/* Center 1 (GFE 75) to Left 1 (Accessibility) */}
                        <motion.path
                            d="M 470 270 C 350 270 350 150 250 150"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* Center 1 (GFE 75) to Left 2 (JS Functions) */}
                        <motion.path
                            d="M 470 270 C 350 270 350 225 250 225"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Center 2 (Blind 75) to Left 3 (React) */}
                        <motion.path
                            d="M 470 310 C 350 310 350 300 250 300"
                            stroke="#eab308"
                            strokeOpacity="0.8"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Center 3 (System Design) to Left 4 (Networking) */}
                        <motion.path
                            d="M 470 350 C 350 350 350 375 250 375"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* Center 3 (System Design) to Left 5 (DSA) */}
                        <motion.path
                            d="M 470 350 C 350 350 350 450 230 450"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Right Connections */}
                        {/* Center 1 (GFE 75) to Right 1 (FE System Design) */}
                        <motion.path
                            d="M 750 270 C 850 270 850 150 970 150"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* Center 1 (GFE 75) to Right 2 (DOM) */}
                        <motion.path
                            d="M 750 270 C 850 270 850 225 970 225"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Center 2 (Blind 75) to Right 3 (I18n) */}
                        <motion.path
                            d="M 750 310 C 850 310 850 300 970 300"
                            stroke="#eab308"
                            strokeOpacity="0.8"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Center 3 (System Design) to Right 4 (UI) */}
                        <motion.path
                            d="M 750 350 C 850 350 850 375 970 375"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* Center 3 (System Design) to Right 5 (Performance) */}
                        <motion.path
                            d="M 750 350 C 850 350 850 450 970 450"
                            stroke="#3f3f46"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Nodes Layer */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        {/* Center Block */}
                        <div className="absolute left-[470px] top-[250px] w-[280px] h-fit z-20 border border-white/10 bg-black/80 rounded-xl p-4 flex flex-col gap-4 backdrop-blur-md shadow-2xl">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 h-10">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-mono text-zinc-400">1</span>
                                <span className="text-sm font-medium text-zinc-300">SOLID Principles</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5 h-10">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-mono text-zinc-400">2</span>
                                <span className="text-sm font-medium text-zinc-300">Backend with TypeScript</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)] h-10">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-mono text-zinc-400">3</span>
                                <span className="text-sm font-medium text-white">Front end system design</span>
                            </div>
                        </div>

                        {/* Left Nodes - Anchored to x=250 line */}
                        <div className="absolute right-[950px] top-0 bottom-0 w-[200px] flex flex-col justify-center gap-0 text-right pr-4">
                            <div className="absolute right-0 top-[135px] h-[30px] flex items-center justify-end">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">Accessibility</span>
                            </div>
                            <div className="absolute right-0 top-[210px] h-[30px] flex items-center justify-end">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">JavaScript Functions</span>
                            </div>
                            <div className="absolute right-0 top-[285px] h-[30px] flex items-center justify-end">
                                <span className="text-sm text-white border-l-2 border-yellow-500 bg-white/5 px-4 py-1.5 rounded-r-full whitespace-nowrap">React</span>
                            </div>
                            <div className="absolute right-0 top-[360px] h-[30px] flex items-center justify-end">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">Networking</span>
                            </div>
                            <div className="absolute right-0 top-[435px] h-[30px] flex items-center justify-end">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">Data structures & algorithms</span>
                            </div>
                        </div>

                        {/* Right Nodes - Anchored to x=950 line */}
                        <div className="absolute left-[950px] top-0 bottom-0 w-[200px] flex flex-col justify-center gap-0 text-left pl-4">
                            <div className="absolute left-0 top-[135px] h-[30px] flex items-center justify-start">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">Front end system design</span>
                            </div>
                            <div className="absolute left-0 top-[210px] h-[30px] flex items-center justify-start">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">DOM manipulation</span>
                            </div>
                            <div className="absolute left-0 top-[285px] h-[30px] flex items-center justify-start">
                                <span className="text-sm text-white border-l-2 border-yellow-500 bg-white/5 px-4 py-1.5 rounded-r-full whitespace-nowrap">Internationalization</span>
                            </div>
                            <div className="absolute left-0 top-[360px] h-[30px] flex items-center justify-start">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">User interfaces</span>
                            </div>
                            <div className="absolute left-0 top-[435px] h-[30px] flex items-center justify-start">
                                <span className="text-sm text-zinc-400 border border-white/10 bg-black/50 px-4 py-1.5 rounded-full whitespace-nowrap">Performance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
