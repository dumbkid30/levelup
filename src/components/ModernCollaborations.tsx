"use client";

import { motion } from "framer-motion";

export default function ModernCollaborations() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <span className="text-orange-400 text-sm font-medium">Our Collaborations</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6">
            We don't just teach.{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              We connect you
            </span>{" "}
            with the best in the industry.
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our partnerships with leading companies and universities ensure you get real-world experience and opportunities.
          </p>
        </motion.div>

        {/* Partner logos grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <div className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/25">
                <div className="w-16 h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/70 text-xs font-medium group-hover:text-orange-400 transition-colors">
                    LOGO
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: "🏆",
              title: "Industry Recognition",
              description: "Awarded Best Career Development Platform 2024"
            },
            {
              icon: "🤝",
              title: "Global Network",
              description: "Partnerships with 500+ companies worldwide"
            },
            {
              icon: "⭐",
              title: "Success Rate",
              description: "95% job placement rate within 6 months"
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {achievement.title}
              </h3>
              <p className="text-white/60 text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}