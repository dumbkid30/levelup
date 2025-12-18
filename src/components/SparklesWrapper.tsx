"use client";

import { SparklesCore } from "@/components/ui/sparkles-core";

interface SparklesWrapperProps {
  children: React.ReactNode;
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
}

export default function SparklesWrapper({
  children,
  className = "",
  particleColor = "#ffffff",
  particleDensity = 50,
  speed = 0.3,
}: SparklesWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={particleDensity}
          particleColor={particleColor}
          speed={speed}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}