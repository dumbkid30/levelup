"use client";

import { motion } from "framer-motion";

interface JobFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    experienceLevel: string;
    onSelectExperience: (level: string) => void;
}

export default function JobFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    experienceLevel,
    onSelectExperience,
}: JobFilterProps) {
    return (
        <div className="space-y-8 mb-12">
            {/* Experience Level Toggle */}
            <div className="flex justify-center">
                <div className="bg-gray-900 p-1 border-2 border-gray-800 inline-flex rounded-lg">
                    {["All", "Fresher/Internship", "Experienced"].map((level) => (
                        <button
                            key={level}
                            onClick={() => onSelectExperience(level)}
                            className={`px-6 py-2 text-sm font-bold uppercase tracking-wide transition-all ${experienceLevel === level
                                    ? "bg-yellow-400 text-black shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                    : "text-white/60 hover:text-white hover:bg-gray-800"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => onSelectCategory("All")}
                    className={`px-4 py-2 border-2 text-sm font-bold uppercase tracking-wide transition-all ${selectedCategory === "All"
                            ? "bg-white text-black border-white shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
                            : "bg-black text-white border-gray-800 hover:border-gray-600 text-white/60"
                        }`}
                >
                    All Roles
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 border-2 text-sm font-bold uppercase tracking-wide transition-all ${selectedCategory === category
                                ? "bg-white text-black border-white shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
                                : "bg-black text-white border-gray-800 hover:border-gray-600 text-white/60"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
