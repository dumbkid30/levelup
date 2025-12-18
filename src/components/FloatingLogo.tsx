"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingLogo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-6 left-6 z-50"
    >
      <motion.div
        className="flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
        whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-xl font-bold text-white">
          Level<span className="text-orange-500">Up</span>
        </div>
        <motion.div
          className="ml-2 w-2 h-2 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}