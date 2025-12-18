"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextFlipProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const TextFlip = ({
  words,
  duration = 3000,
  className,
}: TextFlipProps) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        return nextIndex;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        initial={{
          opacity: 0,
          y: 40,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: -40,
          filter: "blur(4px)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className={cn("inline-block", className)}
      >
        {currentWord}
      </motion.div>
    </AnimatePresence>
  );
};