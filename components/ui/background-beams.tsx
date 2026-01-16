"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Gradient orbs */}
      <div
        className="absolute h-[600px] w-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(214, 163, 84, 0.8) 0%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />
      
      {/* Static gradient orbs for background - warm amber tones */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#d6a354]/20 to-[#e2c394]/20 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-[#c9a87c]/10 to-[#d6a354]/10 blur-[100px]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#15100d] via-[#1c1612] to-[#15100d]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d6a354]/50 to-transparent" />
    </div>
  );
}
