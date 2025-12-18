"use client";

import { motion } from "framer-motion";
import { IconCode, IconDeviceLaptop, IconUsers, IconCertificate } from "@tabler/icons-react";

const features = [
    {
        title: "Interactive Learning",
        description: "Learn by doing with our interactive coding environments and real-time feedback.",
        icon: <IconCode className="w-8 h-8 text-orange-500" />,
    },
    {
        title: "Real-world Projects",
        description: "Build a portfolio of professional-grade projects to showcase to employers.",
        icon: <IconDeviceLaptop className="w-8 h-8 text-blue-500" />,
    },
    {
        title: "Expert Mentorship",
        description: "Get guidance from industry veterans who have worked at top tech companies.",
        icon: <IconUsers className="w-8 h-8 text-green-500" />,
    },
    {
        title: "Recognized Certificates",
        description: "Earn certificates upon completion to validate your skills and boost your resume.",
        icon: <IconCertificate className="w-8 h-8 text-purple-500" />,
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-gray-900/50 font-pixel">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        Why Choose <span className="text-yellow-500">Level Up</span>?
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto font-mono">
                        We provide everything you need to go from beginner to professional developer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 border-4 border-gray-700 rounded-none p-6 hover:bg-gray-700 transition-colors group shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
                        >
                            <div className="w-14 h-14 bg-black border-2 border-gray-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/60 leading-relaxed font-mono text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
