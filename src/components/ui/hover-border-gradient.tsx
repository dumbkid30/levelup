"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverBorderGradientProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  [key: string]: any;
}

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Component = "button",
  duration = 1,
  clockwise = true,
  ...otherProps
}: HoverBorderGradientProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("top");

  const radialGradientSize = hovered ? 400 : 0;

  const gradientDirection = clockwise ? "clockwise" : "counterclockwise";

  return (
    <Component
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-shrink-0 overflow-hidden",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className={cn(
          "w-auto text-white dark:text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-shrink-0 rounded-[inherit] absolute inset-0 opacity-0 transition duration-500",
          hovered && "opacity-100"
        )}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, #f97316 60deg, #fb923c 120deg, #fdba74 180deg, #fed7aa 240deg, #f97316 300deg, transparent 360deg)`,
          animation: hovered ? `spin ${duration}s linear infinite ${gradientDirection === 'clockwise' ? 'normal' : 'reverse'}` : undefined,
        }}
      />
      <div className={cn("bg-black absolute z-1 flex-shrink-0 rounded-[inherit] inset-[2px]")} />
    </Component>
  );
};