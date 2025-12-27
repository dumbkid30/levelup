"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-pixel">
      {/* Full-screen GIF background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.gif"
          alt="Lofi Coding Scene"
          fill
          className="object-cover pixelated"
          priority
          unoptimized // Required for GIFs
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Title matching LevelUp */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white block">Start Your</span>
            <span className="text-yellow-400 block">Coding Adventure</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-xl md:text-2xl mb-12">
            Beginner friendly coding courses and projects
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-yellow-400 text-black font-bold text-xl uppercase tracking-wider rounded-md hover:bg-yellow-500 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}