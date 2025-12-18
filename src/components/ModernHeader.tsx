"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-2xl font-bold text-white">
              Level<span className="text-orange-500">Up</span>
            </div>
            <motion.div
              className="ml-2 w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-white/90 hover:text-white transition-colors py-2">
                Career Launchpad
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4">
                  <p className="text-white/70 text-sm">Transform your career with expert guidance</p>
                </div>
              </div>
            </div>

            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Professional Courses
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Healthcare Jobs
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Study Abroad
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10"
            >
              Log In
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4 border-t border-white/10 mt-4">
            <a href="#" className="block text-white/90 hover:text-white transition-colors py-2">
              Career Launchpad
            </a>
            <a href="#" className="block text-white/90 hover:text-white transition-colors py-2">
              Professional Courses
            </a>
            <a href="#" className="block text-white/90 hover:text-white transition-colors py-2">
              Healthcare Jobs
            </a>
            <a href="#" className="block text-white/90 hover:text-white transition-colors py-2">
              Study Abroad
            </a>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 justify-start">
                Log In
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Sign Up
              </Button>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}