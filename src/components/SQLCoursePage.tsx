"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProgress } from "@/context/UserProgressContext";

export default function SQLCoursePage() {
    const router = useRouter();
    const { completedTopics, xp } = useUserProgress();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    const modules = [
        {
            title: "Understanding DBMS and MySQL",
            topics: [
                { title: "Introduction to Databases", xp: 20 },
                { title: "File Systems", xp: 25 },
                { title: "What is a Database", xp: 30 },
                { title: "DBMS", xp: 20 },
                { title: "What is SQL", xp: 25 },
                { title: "Features with DBMS", xp: 30 },
                { title: "RDBMS", xp: 20 },
                { title: "Installing MySQL REPL", xp: 25 },
                { title: "Declarative vs Imperative Programming Language", xp: 30 },
                { title: "Create Database, Create Table", xp: 20 },
                { title: "Basic Operations in MySQL", xp: 25 },
                { title: "String Queries", xp: 30 },
                { title: "Sorting Data in MySQL", xp: 20 },
                { title: "Pagination", xp: 25 },
                { title: "More Handy Queries", xp: 30 },
                { title: "Basics of Joins", xp: 20 },
                { title: "Type of Joins", xp: 25 },
                { title: "Multi Table Join", xp: 30 },
                { title: "Exploring MySQL Bench", xp: 20 },
                { title: "Alter Table", xp: 25 },
                { title: "Distinct Query", xp: 30 },
                { title: "Aggregation Queries", xp: 20 },
                { title: "Group By Having", xp: 25 },
                { title: "Problem Solving", xp: 50 }
            ]
        },
        {
            title: "Designing DB with RDBMS",
            topics: [
                { title: "Introduction to Normalisation", xp: 20 },
                { title: "Database Schema", xp: 25 },
                { title: "Functional Dependency", xp: 30 },
                { title: "Axioms", xp: 20 },
                { title: "Keys", xp: 25 },
                { title: "Problem Solving", xp: 50 },
                { title: "DB Design Assignment", xp: 100 }
            ]
        }
    ];

    const totalTopics = modules.reduce((acc, module) => acc + module.topics.length, 0);
    const freeTopics = modules.length * 2; // 2 free topics per module
    const progress = Math.round((completedTopics.length / freeTopics) * 100);

    return (
        <div className="min-h-screen bg-black text-white font-pixel">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                    src="/Assets/Assets/public/course-banner.gif"
                    alt="SQL Course Banner"
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
                                Master SQL for Web and Data Engineering
                            </h1>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-yellow-400 text-black font-bold text-lg border-b-4 border-r-4 border-yellow-600 uppercase"
                            >
                                Continue Learning →
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
                            // Calculate starting index for this module based on previous modules' lengths
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
                                            {/* Show Pro badge if module index is > 0 (assuming first module is free-ish or just following pattern) */}
                                            {moduleIndex > 0 && (
                                                <span className="text-yellow-500 font-bold uppercase tracking-wider text-sm">Pro</span>
                                            )}
                                            <ChevronDown
                                                className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                            />
                                        </div>
                                    </button>

                                    {/* Module Topics (Accordion Content) */}
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
                                                        const globalIndex = moduleIndex * 100 + topicIndex;
                                                        const continuousIndex = startingIndex + topicIndex + 1;
                                                        const isCompleted = completedTopics.includes(continuousIndex);
                                                        const isFree = topicIndex < 2; // First 2 topics are free

                                                        let label = "Lesson";
                                                        if (topic.title.toLowerCase().includes("problem solving")) {
                                                            label = "Exercise";
                                                        } else if (topic.title.toLowerCase().includes("assignment")) {
                                                            label = "Assignment";
                                                        }

                                                        return (
                                                            <motion.div
                                                                key={topicIndex}
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => {
                                                                    if (isFree) {
                                                                        router.push(`/courses/sql/${continuousIndex}`);
                                                                    }
                                                                }}
                                                                className={`flex items-center justify-between p-4 rounded-lg ${isCompleted ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-900 border border-gray-800'
                                                                    } ${isFree ? 'hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'} transition-all group`}
                                                            >
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <span className="text-white font-bold font-mono text-sm min-w-[8rem]">
                                                                        {label} {continuousIndex}
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

                    {/* Sidebar - Right Side */}
                    <div className="lg:col-span-1">
                        {/* Course Progress */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900 border-4 border-gray-800 p-6 mb-6 sticky top-4"
                        >
                            <h3 className="text-xl font-bold mb-4 text-white">Course Progress</h3>

                            {/* Exercises */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl">📚</span>
                                    <div>
                                        <p className="text-white font-bold">Exercises</p>
                                        <p className="text-yellow-400 text-2xl">{completedTopics.length}/{freeTopics}</p>
                                    </div>
                                </div>
                            </div>

                            {/* XP Earned */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl">⭐</span>
                                    <div>
                                        <p className="text-white font-bold">XP Earned</p>
                                        <p className="text-yellow-400 text-2xl">{xp}/780</p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-white/60 text-sm">Progress</span>
                                    <span className="text-white font-bold">{progress}%</span>
                                </div>
                                <div className="h-4 bg-gray-800 border-2 border-gray-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Upgrade to Pro */}
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-center border-4 border-yellow-600">
                                <span className="text-4xl mb-2 block">👑</span>
                                <h4 className="text-black font-bold text-lg mb-2">Upgrade to Pro</h4>
                                <p className="text-black/80 text-sm mb-4">
                                    Unlock premium content!
                                </p>
                                <button className="w-full px-4 py-2 bg-black text-yellow-400 font-bold border-2 border-black hover:bg-gray-900 transition-colors">
                                    Upgrade
                                </button>
                            </div>

                            {/* Need Help */}
                            <div className="mt-6 p-4 bg-gray-800 border-2 border-gray-700">
                                <h4 className="text-white font-bold mb-2">Need Help?</h4>
                                <p className="text-white/60 text-sm mb-3">
                                    Ask question in our community!
                                </p>
                                <button className="w-full px-4 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors">
                                    Go To Community
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
