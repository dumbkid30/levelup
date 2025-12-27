"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProgress } from "@/context/UserProgressContext";

export default function GitCoursePage() {
    const router = useRouter();
    const { completedTopics, xp } = useUserProgress();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    const modules = [
        {
            title: "Version Control Basics & Git Setup",
            topics: [
                { title: "What is Version Control?", xp: 20 },
                { title: "Introduction to Git", xp: 25 },
                { title: "Installing Git & Git Bash", xp: 30 },
                { title: "Configuring Git Credentials", xp: 20 },
                { title: "Initializing Your First Repo: git init", xp: 50 }
            ]
        },
        {
            title: "Recording Changes to the Repository",
            topics: [
                { title: "The Three States of Git", xp: 20 },
                { title: "git add & staging area", xp: 30 },
                { title: "Committing changes: git commit", xp: 40 },
                { title: "Ignoring files with .gitignore", xp: 25 },
                { title: "View history with git log", xp: 30 }
            ]
        }
    ];

    const freeTopics = modules.length * 2;
    const progress = Math.round((completedTopics.length / freeTopics) * 100) || 0;

    return (
        <div className="min-h-screen bg-black text-white font-pixel">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                    src="/assets/course-banner.gif"
                    alt="Git Course Banner"
                    fill
                    className="object-cover pixelated"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                                Become an Expert in Git & GitHub in 4 Hours
                            </h1>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-yellow-400 text-black font-bold text-lg border-b-4 border-r-4 border-yellow-600 uppercase"
                            >
                                Start Hacking Git →
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Curriculum - Left Side */}
                    <div className="lg:col-span-2">
                        {modules.map((module, moduleIndex) => {
                            const isExpanded = expandedModule === moduleIndex;
                            const startingIndex = modules
                                .slice(0, moduleIndex)
                                .reduce((acc, m) => acc + m.topics.length, 0);

                            return (
                                <motion.div
                                    key={moduleIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: moduleIndex * 0.1 }}
                                    className="mb-4"
                                >
                                    {/* Module Header */}
                                    <button
                                        onClick={() => setExpandedModule(isExpanded ? null : moduleIndex)}
                                        className="w-full flex items-center justify-between p-6 bg-black border-2 border-gray-800 hover:border-gray-700 transition-colors group text-left"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-xl font-mono border-2 border-gray-800 group-hover:border-gray-600 transition-colors">
                                                {moduleIndex + 1}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                                {module.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {moduleIndex > 0 && (
                                                <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm">Pro</span>
                                            )}
                                            <ChevronDown
                                                className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                            />
                                        </div>
                                    </button>

                                    {/* Module Topics */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-gray-900/50 border-x-2 border-b-2 border-gray-800 p-4 space-y-2">
                                                    {module.topics.map((topic, topicIndex) => {
                                                        const continuousIndex = startingIndex + topicIndex + 201; // Offset for Git topics to avoid overlap with SQL
                                                        const isCompleted = completedTopics.includes(continuousIndex);
                                                        const isFree = true; // For now all starting git topics are free

                                                        return (
                                                            <motion.div
                                                                key={topicIndex}
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => {
                                                                    if (isFree) {
                                                                        router.push(`/courses/git/${continuousIndex}`);
                                                                    }
                                                                }}
                                                                className={`flex items-center justify-between p-4 rounded-lg ${isCompleted ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-900 border border-gray-800'
                                                                    } ${isFree ? 'hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'} transition-all group`}
                                                            >
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <span className="text-white font-bold font-mono text-sm min-w-[8rem]">
                                                                        Lesson {topicIndex + 1}
                                                                    </span>
                                                                    <span className={`${isCompleted ? 'text-green-400 line-through' : 'text-white'} font-bold text-lg`}>
                                                                        {topic.title}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-3">
                                                                    <div className={`px-4 py-1 rounded bg-yellow-400 text-black text-xs font-bold font-mono border border-yellow-500 ${isFree ? 'group-hover:bg-yellow-500' : ''}`}>
                                                                        {topic.xp} xp
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 border-4 border-gray-800 p-6 sticky top-4">
                            <h3 className="text-xl font-bold mb-4 text-white">GIT MASTERY</h3>
                            <div className="mb-6 h-4 bg-gray-800 border-2 border-gray-700">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-yellow-400"
                                />
                            </div>
                            <p className="text-sm text-zinc-400 mb-6 uppercase tracking-widest font-mono">
                                Status: INITIALIZING...
                            </p>
                            <button className="w-full py-4 bg-yellow-400 text-black font-bold border-b-4 border-r-4 border-yellow-600 hover:scale-[1.02] transition-transform">
                                VIEW PROGRESS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
