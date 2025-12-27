"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GradientButton from "@/components/GradientButton";
import { CometCard } from "@/components/ui/comet-card";

export default function ProfessionalCourses() {
  const courses = [
    {
      title: "Backend Development",
      rating: 4.6,
      reviews: 957,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Master server-side development with our comprehensive Backend Development program...",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      trending: false
    },
    {
      title: "Frontend Development",
      rating: 4.8,
      reviews: 785,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Step into the role of a Frontend Developer and learn to create stunning user interfaces...",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500",
      trending: true
    },
    {
      title: "Art of Building AI Products",
      rating: 4.8,
      reviews: 957,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Master the art of building AI-powered products with our comprehensive AI development program...",
      bgColor: "bg-gradient-to-br from-blue-500 to-purple-600",
      trending: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-orange-500 text-lg font-medium mb-4"
          >
            Professional Courses
          </motion.p>

          <TextGenerateEffect
            words="Master SaaS, AI, and Automation — Skills That Power Today's Industries"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto"
            filter={true}
            duration={0.5}
          />
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CometCard className="w-full">
                <div className="w-full cursor-pointer flex flex-col rounded-2xl border-0 bg-[#1F2121] p-3 saturate-100">
                  <div className="mx-2 flex-1">
                    <div className="relative mt-2 aspect-[3/4] w-full">
                      <Image
                        loading="lazy"
                        className="absolute inset-0 h-full w-full rounded-xl object-cover contrast-100"
                        alt={course.title}
                        src={course.image}
                        width={400}
                        height={533}
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 15px 0px",
                        }}
                      />

                      {/* Trending Badge */}
                      {course.trending && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
                          ⭐ Trending 2025
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl" />

                      {/* Course Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1">
                          {course.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="mt-3 p-4 bg-[#2A2A2A] rounded-xl">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-white font-bold text-lg">{course.rating}</span>
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm">({course.reviews})</span>
                    </div>

                    {/* Course Name */}
                    <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                      {course.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <GradientButton variant="primary" size="sm" className="flex-1 text-xs">
                        Register Now
                      </GradientButton>
                      <GradientButton variant="outline" size="sm" className="flex-1 text-xs">
                        View Course
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </CometCard>
            </motion.div>
          ))}
        </div>

        {/* Explore All Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GradientButton variant="primary" size="lg">
            Explore All Courses
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}