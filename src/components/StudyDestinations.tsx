"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GradientButton from "@/components/GradientButton";

export default function StudyDestinations() {
  const destinations = [
    {
      name: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "World-renowned universities and rich academic heritage"
    },
    {
      name: "United States of America",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Innovation hub with top-tier education system"
    },
    {
      name: "Australia",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "High quality education with work opportunities"
    },
    {
      name: "Germany",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Excellence in engineering and research programs"
    }
  ];

  // const universities = [
  //   { name: "MIT", logo: "https://upload.wikimedia.org/wikipedia/en/4/44/MIT_Seal.svg" },
  //   { name: "University of Leeds", logo: "https://upload.wikimedia.org/wikipedia/en/d/d2/University_of_Leeds_logo.svg" },
  //   { name: "University of Queensland", logo: "https://upload.wikimedia.org/wikipedia/en/1/14/University_of_Queensland_Logo.svg" },
  // ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Left side content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Main heading with text generate effect */}
            <div className="mb-8">
              <TextGenerateEffect
                words="Find Your Perfect Study Destination"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                filter={true}
                duration={0.5}
              />

              <TextGenerateEffect
                words="Explore top study-abroad destinations across the globe, from the USA, UK, and Australia, to New Zealand, Europe, Dubai, and many more. Discover world-class universities, vibrant cultures, and endless opportunities that await you in your journey to academic excellence."
                className="text-white/70 text-lg leading-relaxed mb-8"
                filter={true}
                duration={0.3}
              />

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <GradientButton variant="primary" size="lg">
                  Explore More
                </GradientButton>
                <GradientButton variant="outline" size="lg">
                  Quick Apply
                </GradientButton>
              </motion.div>
            </div>

          </div>

          {/* Right side - Country cards */}
          <div className="grid grid-cols-2 gap-6">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                      {destination.name}
                    </h4>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.description}
                    </p>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 border-2 border-orange-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}