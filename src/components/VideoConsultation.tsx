"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GradientButton from "@/components/GradientButton";

export default function VideoConsultation() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-orange-500 text-sm font-medium"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              NOT SURE? LET'S TALK.
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Still not sure if this{" "}
              <span className="text-orange-500">course is right</span> for you?
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-white/80 text-lg leading-relaxed">
                <span className="font-semibold text-white">Book a free 15-min call</span> — we'll chat about your
                goals and see if it's the right fit. No pressure, just honest advice.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Consultant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <GradientButton variant="primary" size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                  Book a Free Call
                </GradientButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Video Call Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Video Call Window */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Top Bar */}
              <div className="bg-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white/60 text-sm">meet.google.com</div>
                <div className="w-6 h-6"></div>
              </div>

              {/* Video Content */}
              <div className="relative aspect-video bg-gray-900">
                {/* Main Video - Consultant */}
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Iqram - Consultant"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Name tag */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <p className="text-white font-medium">Iqram</p>
                  </div>

                  {/* Small user video in corner */}
                  <div className="absolute bottom-4 right-4 w-24 h-16 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20">
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">👤</span>
                      </div>
                    </div>
                  </div>

                  {/* Speaking indicator */}
                  <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-xs font-medium">Speaking</span>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Controls Bar */}
              <div className="bg-gray-800 px-6 py-4 flex items-center justify-center gap-4">
                <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">🎤</span>
                </button>
                <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">📹</span>
                </button>
                <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">📞</span>
                </button>
                <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">💬</span>
                </button>
              </div>
            </div>

            {/* Floating elements around video */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}