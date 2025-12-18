"use client";

import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function StudentTestimonials() {
  const testimonials = [
    {
      name: "Siddharth M",
      role: "Machine Learning Graduate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "The ML program covered model building, tuning, and deployment. I used it to land an ML engineer role."
    },
    {
      name: "Ritika D",
      role: "Data Science Graduate",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "From data wrangling to predictive models, the course covered it all. I'm now a data scientist making real impact."
    },
    {
      name: "Megha T",
      role: "Automation Graduate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "Launched's AI Automation program helped streamline workflows and boost efficiency in automation projects at my company."
    },
    {
      name: "Kiran A",
      role: "Data Analyst Graduate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "With expert guidance, I quickly secured an SDR position. The program gave me the tools to thrive in sales."
    },
    {
      name: "Arjun P",
      role: "Data Analysis Graduate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "The data analysis course sharpened my skills in SQL, Python, and insights. I landed a data analyst role right after."
    },
    {
      name: "Anusha R",
      role: "Product Management Graduate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      testimonial: "Launched's Product Management program gave me real-world product skills. I now lead product teams confidently as a PM."
    }
  ];

  return (
    <section className="py-20 bg-black font-pixel">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-5xl mx-auto leading-tight drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              Loved by thousands of students
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 border-4 border-gray-800 p-6 hover:border-yellow-500 transition-all duration-300 group shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 object-cover border-2 border-white/20 pixelated"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm font-mono">{testimonial.role}</p>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="relative">
                <div className="text-6xl text-white/10 absolute -top-2 -left-2 font-serif">"</div>
                <p className="text-white/80 text-sm leading-relaxed relative z-10 pl-6 font-mono">
                  {testimonial.testimonial}
                </p>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-yellow-400 text-sm"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg mb-6 font-mono">
            Join thousands of successful graduates who transformed their careers
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-none border-b-8 border-r-8 border-yellow-600 hover:shadow-xl transition-all duration-300 uppercase tracking-widest"
          >
            Start Your Journey Today
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}