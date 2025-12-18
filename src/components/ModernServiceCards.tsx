"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles-core";
import GradientButton from "@/components/GradientButton";

import { services } from "@/lib/data";

export default function ModernServiceCards() {

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your <span className="text-orange-500">Future</span>
          </h2>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Choose your path to success with our comprehensive programs designed to elevate your career.
          </p>
        </motion.div>

        {/* Sparkles Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-20 w-full mb-16 overflow-hidden"
        >
          <SparklesCore
            id="service-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={120}
            particleColor="#f97316"
            speed={0.4}
            className="w-full h-full"
          />
          {/* Gradient mask for sparkles */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent pointer-events-none" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: service.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-white/60 text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 border border-orange-500/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <GradientButton
              variant="primary"
              size="lg"
              className="shadow-xl hover:shadow-2xl"
            >
              Explore All Programs
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}