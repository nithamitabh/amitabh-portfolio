"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  href?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  href,
  onClick,
}: ShimmerButtonProps) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white transition-all duration-300",
        "[background:var(--bg)] [border-radius:var(--radius)]",
        "hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(99,102,241,0.3)]",
        className
      )}
      style={
        {
          "--bg": background,
          "--radius": borderRadius,
        } as React.CSSProperties
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 overflow-hidden [border-radius:var(--radius)]"
        style={{ "--radius": borderRadius } as React.CSSProperties}
      >
        <div
          className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d6a354_0%,#e2c394_50%,#d6a354_100%)]"
          style={{
            animationDuration: shimmerDuration,
          }}
        />
      </div>
      
      {/* Glow effect - warm amber */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[#d6a354]/20 via-[#e2c394]/20 to-[#d6a354]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Inner background - warm wood tones */}
      <div
        className="absolute inset-[1px] rounded-[inherit] bg-gradient-to-br from-[#2d231e] to-[#1c1612]"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 font-medium">
        {children}
      </span>
    </Component>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function GlowButton({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  onClick,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-[#d6a354] to-[#e2c394] text-[#15100d] shadow-lg shadow-[#d6a354]/25 hover:shadow-[#d6a354]/40",
    secondary: "bg-gradient-to-r from-[#2d231e] to-[#1c1612] text-[#f2e9d8] border border-[#4b3621]",
    outline: "bg-transparent border border-[#d6a354]/50 text-[#d6a354] hover:bg-[#d6a354]/10",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        "hover:scale-105",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}
