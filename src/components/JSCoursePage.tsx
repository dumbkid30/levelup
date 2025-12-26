"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProgress } from "@/context/UserProgressContext";

export default function JSCoursePage() {
    const router = useRouter();
    const { completedTopics, xp } = useUserProgress();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    const modules = [
        {
            title: "JavaScript Fundamentals",
            topics: [
                { title: "Basic of JavaScript", xp: 20 },
                { title: "Loops Functions in Javascript", xp: 25 },
                { title: "Introduction to Arrays and Objects", xp: 30 },
                { title: "Coercion in JS", xp: 20 },
                { title: "Scopes in JS", xp: 25 },
                { title: "Discussion on Higer Order Functions and Callbacks", xp: 30 },
                { title: "Promises in JS", xp: 35 },
                { title: "Closures", xp: 40 },
                { title: "Iterators and Generators", xp: 45 },
                { title: "Async Await", xp: 50 }
            ]
        }
    ];

    const totalTopics = modules.reduce((acc, module) => acc + module.topics.length, 0);
    const freeTopics = modules.length * 2; // Assuming first 2 are free
    const progress = Math.round((completedTopics.length / totalTopics) * 100);

    return (
        <div className="min-h-screen bg-black text-white font-pixel">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                    src="/Assets/Assets/public/course-banner.gif"
                    alt="JS Course Banner"
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
                                Master JavaScript for Backend
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
                                                        const continuousIndex = startingIndex + topicIndex + 1;
                                                        // Using a separate ID range for JS course (e.g., starting from 1000 or using a string prefix if LessonView supports it, but keeping integer for now and assuming no overlap or handled by DB)
                                                        // For now, let's use a simple index offset to simulate unique IDs if needed, or just standard index.
                                                        // Assuming user progress tracks IDs uniquely. Let's use 200 series for JS.
                                                        const lessonId = 200 + continuousIndex;
                                                        const isCompleted = completedTopics.includes(lessonId);
                                                        const isFree = topicIndex < 2; // First 2 topics are free

                                                        return (
                                                            <motion.div
                                                                key={topicIndex}
                                                                whileHover={{ x: 4 }}
                                                                onClick={() => {
                                                                    // For now linking to same placeholder or new route
                                                                    // router.push(`/courses/javascript-backend/${lessonId}`);
                                                                    // User said "i will add content ... i will add content to each topic"
                                                                    // So we just create the list for now.
                                                                    if (isFree) {
                                                                        router.push(`/courses/javascript-backend/${lessonId}`);
                                                                    }
                                                                }}
                                                                className={`flex items-center justify-between p-4 rounded-lg ${isCompleted ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-900 border border-gray-800'
                                                                    } ${isFree ? 'hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'} transition-all group`}
                                                            >
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <span className="text-white font-bold font-mono text-sm min-w-[8rem]">
                                                                        Topic {continuousIndex}
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
                                        <p className="text-white font-bold">Topics</p>
                                        <p className="text-yellow-400 text-2xl">{completedTopics.filter(id => id > 200 && id < 300).length}/{totalTopics}</p>
                                    </div>
                                </div>
                            </div>

                            {/* XP Earned */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-3xl">⭐</span>
                                    <div>
                                        <p className="text-white font-bold">XP Earned</p>
                                        {/* Placeholder logic for total XP calculation for this course */}
                                        <p className="text-yellow-400 text-2xl">{xp}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-white/60 text-sm">Progress</span>
                                    <span className="text-white font-bold">{Math.round((completedTopics.filter(id => id > 200 && id < 300).length / totalTopics) * 100)}%</span>
                                </div>
                                <div className="h-4 bg-gray-800 border-2 border-gray-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.round((completedTopics.filter(id => id > 200 && id < 300).length / totalTopics) * 100)}%` }}
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
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
