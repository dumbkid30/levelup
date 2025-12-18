"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { coursesBackend } from "@/lib/data";

export default function CourseListBackend() {
    return (
        <section className="py-20 bg-gray-950 font-pixel">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        Backend & Data Courses
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-mono">
                        Master server-side development and data engineering with industry-standard tools!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {coursesBackend.map((course, index) => {
                        const isSQLCourse = course.title === "SQL for Web and Data Engineering";
                        const CardContent = (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-gray-900 rounded-xl overflow-hidden border-4 border-gray-800 hover:border-yellow-500 transition-colors group shadow-[8px_8px_0_rgba(0,0,0,0.5)] cursor-pointer"
                            >
                                {/* Course Image */}
                                <div className="relative h-56 w-full border-b-4 border-gray-800">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover pixelated"
                                        unoptimized // Required for GIFs
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-6 font-mono leading-relaxed h-20">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="px-3 py-1 bg-gray-800 rounded text-xs text-white/80 font-mono border border-gray-700">
                                            📊 {course.level}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );

                        return isSQLCourse ? (
                            <Link key={index} href="/courses/sql">
                                {CardContent}
                            </Link>
                        ) : (
                            CardContent
                        );
                    })}
                </div>

                <div className="text-center mt-16">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95, y: 2 }}
                        className="px-8 py-4 bg-yellow-400 text-black font-bold text-xl border-b-8 border-r-8 border-yellow-600 active:border-0 active:translate-y-2 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                    >
                        Explore More Courses
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
