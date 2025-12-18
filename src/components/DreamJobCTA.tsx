import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const DreamJobCTA = () => {
    return (
        <div className="w-full bg-black relative overflow-hidden pb-16 pt-0 md:pb-24">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute right-10 top-10 text-yellow-500/20">
                    <Sparkles size={120} />
                </div>
                {/* Gradient glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-4xl uppercase font-pixel drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                    Your dream job is <br className="hidden md:block" />
                    <span className="text-white">absolutely worth it</span>
                </h2>

                <div className="flex flex-col items-center gap-4">
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-black font-bold text-lg md:text-xl border-b-4 border-r-4 border-yellow-600 active:border-0 active:translate-y-1 transition-all uppercase"
                    >
                        Get started now
                    </Link>
                    <p className="text-zinc-500 text-sm md:text-base font-medium">
                        200+ questions are free to do
                    </p>
                </div>
            </div>
        </div>
    );
};
