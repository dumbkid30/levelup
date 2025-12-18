"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 font-pixel">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            <Image
              src="/assets/logo/logo4.png"
              alt="LevelUp Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { name: "Courses", href: "/courses" },
            { name: "Prepare", href: "/prepare" },
            { name: "Hackathons", href: "/hackathons" },
            { name: "Jobs", href: "/jobs" },
            { name: "Mentors", href: "/mentors" },
            { name: "Study Abroad", href: "/study-abroad" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/85 hover:text-white font-bold text-sm uppercase tracking-[0.12em] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-yellow-400 text-black font-bold text-xs md:text-sm border-b-4 border-r-4 border-yellow-600 active:border-0 active:translate-y-1 transition-all uppercase tracking-[0.14em]"
        >
          Signup
        </motion.button>
      </div>
    </nav>
  );
}
