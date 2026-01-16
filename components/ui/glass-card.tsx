"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableGlow?: boolean;
  glowColor?: string;
}

export function GlassCard({
  children,
  className,
  enableTilt = true,
  enableGlow = true,
  glowColor = "rgba(214, 163, 84, 0.15)",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !enableTilt) return;

      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    },
    [enableTilt, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovering(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl border border-[#d6a354]/10 bg-gradient-to-br from-[#1c1612]/90 to-[#201a15]/80 backdrop-blur-xl",
        "transition-shadow duration-300",
        hovering && enableGlow && "shadow-[0_0_30px_rgba(214,163,84,0.15)]",
        className
      )}
    >
      {/* Glow effect on hover */}
      {enableGlow && (
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
            opacity: hovering ? 1 : 0,
          }}
        />
      )}
      
      {/* Border glow - amber instead of indigo */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d6a354]/0 via-[#d6a354]/10 to-[#d6a354]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
