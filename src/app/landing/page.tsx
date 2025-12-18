
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  BookOpen,
  TerminalSquare,
  Trophy,
  Briefcase,
  GraduationCap,
  Users,
  ArrowRight,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SparklesCore } from "@/components/ui/sparkles-core";
import { EncryptedText } from "@/components/ui/encrypted-text";

const services = [
  {
    id: "courses",
    title: "Courses",
    punchline: "Production-grade skills, not tutorial fluff.",
    description:
      "Build backend and frontend systems the way real teams do—Node.js, TypeScript, Go, SQL, React—through structured, hands-on courses.",
    bullets: [
      "Backend-first JavaScript & TypeScript",
      "Auth systems with Go + JWT",
      "SQL for real apps and data workflows"
    ],
    ctaText: "Explore Courses",
    href: "/courses",
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  },
  {
    id: "prepare",
    title: "Prepare",
    punchline: "Practice like it’s the real interview.",
    description:
      "Simulate real technical interviews in an in-browser workspace—no setup, no guesswork.",
    bullets: [
      "Interview-style coding workspace",
      "Instant test feedback",
      "Customizable layout + theming"
    ],
    ctaText: "Start Interview Prep",
    href: "/prepare",
    icon: <TerminalSquare className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  },
  {
    id: "hackathons",
    title: "Hackathons",
    punchline: "Build proof, not just projects.",
    description:
      "Compete in global hackathons, fellowships, and open-source programs that hiring managers actually respect.",
    bullets: [
      "GSoC, MLH, ETHIndia, Kaggle",
      "Cash prizes, stipends, mentorship",
      "Live events + monthly sprints"
    ],
    ctaText: "Explore Live Hackathons",
    href: "/hackathons",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  },
  {
    id: "jobs",
    title: "Jobs",
    punchline: "Jobs that are actually still open.",
    description:
      "Fresh engineering roles (Node.js, React, SDE-2) pulled in near real-time—so you’re not applying to dead listings.",
    bullets: [
      "Minutes-old listings",
      "Role-focused: frontend, backend, SDE",
      "Less noise, more signal"
    ],
    ctaText: "Browse Fresh Jobs",
    href: "/jobs",
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  },
  {
    id: "scholarships",
    title: "Scholarships",
    punchline: "Education without the financial chokehold.",
    description:
      "Fully and partially funded scholarships to help you study abroad or upskill—without crushing debt.",
    bullets: [
      "Global + regional programs",
      "Merit-based + need-based",
      "Clear requirements + timelines"
    ],
    ctaText: "Explore Scholarships",
    href: "/study-abroad",
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  },
  {
    id: "mentorship",
    title: "Mentorship",
    punchline: "Guidance from people who’ve done it.",
    description:
      "Get matched with mentors based on the role, company, and career path you’re targeting.",
    bullets: [
      "Role-specific guidance",
      "Company-aware advice",
      "Actionable roadmap sessions"
    ],
    ctaText: "Find a Mentor",
    href: "/mentorship",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
  }
];

type Service = (typeof services)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="relative flex flex-col gap-3 rounded-2xl border border-amber-400/20 bg-black/60 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] hover:border-amber-300/50 transition-colors"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative flex items-center justify-between">
        <div className="p-3 rounded-lg border border-white/10 bg-black/50">
          {service.icon}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-200/70">
          {`Pillar ${index + 1}/6`}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl font-bold uppercase tracking-wide">{service.title}</h3>
        <p className="text-amber-200 text-sm font-mono">{service.punchline}</p>
        <p className="text-sm text-zinc-300 font-sans leading-relaxed mt-1">
          {service.description}
        </p>
      </div>

      <ul className="mt-2 space-y-2">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-zinc-300 font-sans">
            <Check className="w-4 h-4 text-amber-300 mt-[2px]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3">
        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-100 hover:text-amber-200 transition-colors"
        >
          {service.ctaText}
          <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} className="inline-flex">
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white font-pixel flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-black" />
          <div className="absolute -left-28 top-10 w-96 h-96 bg-amber-400/15 blur-[120px]" />
          <div className="absolute right-[-120px] bottom-[-80px] w-[520px] h-[520px] bg-amber-500/8 blur-[140px]" />
          <div className="absolute inset-0 opacity-70">
            <SparklesCore
              id="landing-sparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={80}
              particleColor="#fbbf24"
              speed={0.35}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Hero */}
          <div className="text-center mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-400/30 text-xs md:text-sm text-amber-100 mb-6 font-mono uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(251,191,36,0.08)]"
            >
              <Cpu className="w-4 h-4 text-amber-300" />
              <EncryptedText
                text="Built for Engineers Navigating a Tough Job Market"
                encryptedClassName="text-amber-200/50"
                revealedClassName="text-amber-100"
                revealDelayMs={35}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 glitch-text"
            >
              Get Ahead in a Market That Rewards the Prepared
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 text-base md:text-lg max-w-3xl mx-auto font-sans leading-relaxed"
            >
              Curated learning and interview preparation for engineers who want a real advantage in today’s job market.
            </motion.p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-400 text-black font-bold text-sm md:text-base border-b-4 border-r-4 border-amber-600 active:border-0 active:translate-y-1 transition-all uppercase tracking-widest shadow-[0_10px_40px_rgba(251,191,36,0.3)]"
              >
                Explore Opportunities
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-3 border border-white/15 text-sm md:text-base font-bold uppercase tracking-widest bg-white/5 hover:border-amber-300/60 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Service Hub */}
          <section
            id="service-hub"
            aria-labelledby="service-hub-title"
            className="bg-gradient-to-br from-white/5 via-white/0 to-white/5 border border-amber-400/25 rounded-3xl p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h2 id="service-hub-title" className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                  Everything You Need to Get Ahead—In One Place
                </h2>
                <p className="text-zinc-300 font-sans mt-2">
                  Built for engineers navigating a brutally competitive market.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Pricing Teaser */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-black via-zinc-950 to-black border border-amber-400/20 rounded-3xl p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-200/80">Pricing</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                  Plans built for engineers in a tough market
                </h2>
                <p className="text-zinc-300 font-sans mt-2 max-w-2xl">
                  Choose the pace that fits you—monthly, quarterly, or annual—all with premium interview prep and learning paths.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-400 text-black font-bold text-xs md:text-sm border-b-4 border-r-4 border-amber-600 active:border-0 active:translate-y-1 transition-all uppercase tracking-[0.18em] shadow-[0_10px_30px_rgba(251,191,36,0.2)]"
              >
                View Pricing
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  title: "Monthly",
                  price: "₹1,700",
                  cadence: "/month",
                  note: "Billed monthly",
                  href: "/jobs"
                },
                {
                  title: "Quarterly",
                  price: "₹1,300",
                  cadence: "/month",
                  note: "Billed quarterly (₹3,700)",
                  href: "/prepare"
                },
                {
                  title: "Annual",
                  price: "₹430",
                  cadence: "/month",
                  note: "Billed yearly (₹5,100)",
                  href: "/courses",
                  badge: "Recommended"
                }
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`relative rounded-2xl border bg-black/60 p-4 md:p-5 ${
                    plan.badge ? "border-amber-400/40" : "border-white/10"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 right-3 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="text-sm text-zinc-400 font-bold uppercase tracking-[0.2em]">
                    {plan.title}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-zinc-400 text-sm">{plan.cadence}</span>
                  </div>
                  <div className="text-zinc-500 text-sm mt-1">{plan.note}</div>
                  <Link
                    href={plan.href}
                    className="mt-4 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-amber-400/40 text-amber-100 font-bold uppercase tracking-[0.16em] hover:bg-amber-400 hover:text-black transition-colors text-xs"
                  >
                    Buy now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
