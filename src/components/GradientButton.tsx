"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  ...otherProps
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700",
    secondary: "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800",
    outline: "bg-transparent border border-orange-500/30 text-white hover:bg-orange-500/10",
  };

  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      className={cn(
        "flex items-center justify-center font-semibold transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </HoverBorderGradient>
  );
}