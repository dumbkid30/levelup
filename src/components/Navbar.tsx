"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Courses", href: "/courses" },
    { name: "Prepare", href: "/prepare" },
    { name: "Hackathons", href: "/hackathons" },
    { name: "Jobs", href: "/jobs" },
    { name: "Mentors", href: "/mentors" },
    { name: "Ask", href: "/ask" },
    { name: "Study Abroad", href: "/study-abroad" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 font-pixel">
      <div className="w-full px-3 md:px-5 h-14 md:h-18 flex items-center justify-between gap-4 max-w-6xl mx-auto py-2">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-26 h-8 md:w-36 md:h-10">
            <Image
              src="/assets/logo/logo.png"
              alt="LevelUp Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 112px, 176px"
              priority
            />
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/85 hover:text-white font-bold text-sm uppercase tracking-[0.12em] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs md:text-sm border-b-4 border-r-4 border-yellow-600 active:border-0 active:translate-y-1 transition-all uppercase tracking-[0.14em] hover:scale-[1.03]"
          >
            Signup
          </Link>
          <button
            className="md:hidden p-2 rounded border border-gray-800 text-white hover:border-amber-400/50 transition"
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white font-bold uppercase tracking-[0.14em] py-2 border-b border-white/5"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
