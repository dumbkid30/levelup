"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TooltipItem = {
  id: number | string;
  name: string;
  designation: string;
  image: string;
};

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export function AnimatedTooltip({ items, className }: AnimatedTooltipProps) {
  const [activeId, setActiveId] = useState<TooltipItem["id"] | null>(null);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              className={cn(
                "h-8 w-8 rounded-full border overflow-hidden bg-white/10",
                isActive ? "border-cyan-200/70 shadow-[0_0_0_2px_rgba(34,211,238,0.22)]" : "border-white/20",
              )}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-black/85 px-3 py-1.5 text-[11px] text-white shadow-lg backdrop-blur-sm"
              >
                <div className="font-semibold text-white">{item.name}</div>
                <div className="text-white/60">{item.designation}</div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
