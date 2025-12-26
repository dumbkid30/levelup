"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles-core";
import { Users, Star, ArrowRight } from "lucide-react";


const categories = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "sde", label: "SDE" },
  { id: "study-abroad", label: "Study Abroad" },
  { id: "startup", label: "Startup Mentor" },
  { id: "devops", label: "DevOps" },
  { id: "pm", label: "PM" }
] as const;

const mentors = [
  {
    name: "Aisha Khan",
    role: "Backend Mentor",
    category: "backend",
    image: "/mentor/pexels-hamed-gharaee-1120343-2117283.jpg",
    blurb: "Backend engineer at FinBridge; builds payment rails in Node.js/Go and coaches on scaling APIs.",
    tags: ["Node.js", "Go", "Postgres"]
  },
  {
    name: "Zain Malik",
    role: "Frontend Mentor",
    category: "frontend",
    image: "/mentor/pexels-italo-melo-881954-2379005.jpg",
    blurb: "Frontend lead at Craftly; React/Next.js specialist focused on DX, accessibility, and Lighthouse wins.",
    tags: ["React", "Next.js", "Design Systems"]
  },
  {
    name: "Kunal Sharma",
    role: "SDE-2 Mentor",
    category: "sde",
    image: "/mentor/pexels-david-garrison-1128051-2128807.jpg",
    blurb: "SDE-2 at CloudTrail; system design and interview prep coach for mid-level roles.",
    tags: ["System Design", "DSA", "Interviews"]
  },
  {
    name: "Sara Thomas",
    role: "Study Abroad Mentor",
    category: "study-abroad",
    image: "/mentor/pexels-george-desipris-818261.jpg",
    blurb: "Helps craft applications for CS masters with scholarships and clear timelines.",
    tags: ["Scholarships", "SOPs", "CV Review"]
  },
  {
    name: "Dev Patel",
    role: "Startup Mentor",
    category: "startup",
    image: "/mentor/pexels-danxavier-1212984.jpg",
    blurb: "YC alum guiding MVP, GTM, and early fundraising.",
    tags: ["MVP", "GTM", "Fundraising"]
  },
  {
    name: "Ananya Rao",
    role: "Backend Mentor",
    category: "backend",
    image: "/mentor/pexels-david-garrison-1128051-2128819.jpg",
    blurb: "Ex-Remitly; teaches auth, payments, and observability with real production patterns.",
    tags: ["Auth", "Payments", "Observability"]
  },
  {
    name: "Manish Verma",
    role: "Frontend Mentor",
    category: "frontend",
    image: "/mentor/pexels-kwnos-iv-250460536-30567465.jpg",
    blurb: "Frontend master at SaaSly; SSR/ISR tuning and performance-first design systems.",
    tags: ["Performance", "SSR/ISR", "Accessibility"]
  },
  {
    name: "Ishita Sen",
    role: "SDE Mentor",
    category: "sde",
    image: "/mentor/pexels-italo-melo-881954-2379005.jpg",
    blurb: "Interview coach at Prodify; behavioral + coding drills tailored to mid-level roles.",
    tags: ["Behavioral", "Coding Rounds", "Mock Loops"]
  },
  {
    name: "Yusuf Ahmed",
    role: "DevOps Mentor",
    category: "devops",
    image: "/mentor/pexels-george-desipris-818261.jpg",
    blurb: "Platform engineer at CloudStride; CI/CD, infra-as-code, and Kubernetes for high-uptime teams.",
    tags: ["CI/CD", "Kubernetes", "Terraform"]
  },
  {
    name: "Fatima Noor",
    role: "PM Mentor",
    category: "pm",
    image: "/mentor/pexels-david-garrison-1128051-2128807.jpg",
    blurb: "Product manager at ShopLine; roadmap crafting, stakeholder alignment, and launch playbooks.",
    tags: ["Roadmaps", "Stakeholders", "Go-to-Market"]
  }
] as const;

type CategoryId = (typeof categories)[number]["id"];

export default function MentorsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filtered = activeCategory === "all"
    ? mentors
    : mentors.filter((m) => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white font-pixel flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-16 w-80 h-80 bg-amber-400/10 blur-[120px]" />
          <div className="absolute right-[-140px] bottom-[-80px] w-[520px] h-[520px] bg-amber-500/12 blur-[150px]" />
          <div className="absolute inset-0 opacity-70">
            <SparklesCore
              id="mentors-sparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={60}
              particleColor="#fbbf24"
              speed={0.35}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-400/30 text-xs md:text-sm text-amber-100 font-mono uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(251,191,36,0.08)]">
              Mentors
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Find a Mentor Who Matches Your Track
            </h1>
            <p className="mt-3 text-zinc-300 text-base md:text-lg max-w-3xl mx-auto font-sans leading-relaxed">
              Backend, frontend, SDE, study abroad, or startup — get guidance from people who’ve shipped, scaled, and secured offers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-[0.14em] transition-colors ${isActive
                    ? "bg-amber-400 text-black border-amber-500 shadow-[0_10px_30px_rgba(251,191,36,0.25)]"
                    : "border-amber-400/30 text-amber-100 hover:border-amber-300/60"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((mentor, idx) => (
                <motion.div
                  key={`${mentor.name}-${mentor.category}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group rounded-2xl border border-amber-400/20 bg-black/60 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:border-amber-300/50 hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-white/5 via-white/0 to-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    {mentor.image ? (
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-amber-200/70">
                        <Users className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{mentor.name}</h3>
                        <p className="text-amber-200 text-sm font-mono">{mentor.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-300 text-xs font-bold uppercase tracking-[0.14em]">
                        <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                        Mentor
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">{mentor.blurb}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mentor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full border border-amber-400/30 text-[11px] text-amber-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-3">
                      <Link
                        href="/prepare"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-100 hover:text-amber-200 transition-colors"
                      >
                        Book a session
                        <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} className="inline-flex">
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
