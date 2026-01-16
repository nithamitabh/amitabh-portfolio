"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, Download, MapPin, ArrowDown, Eye, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RESUME_URL = "https://drive.google.com/drive/folders/1ofic2EMVIlIAjNIC_hPq2LkJGwh1FrrX?usp=drive_link";

/**
 * Hero section with Warm Wooden Theme
 * Features parallax background, amber accents, wood texture
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#projects");
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Warm Wooden Background - Theme-aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--wood-bg)] via-[var(--wood-card)] to-[var(--wood-bg)]" />
      
      {/* Ambient warm glow */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-[120px] bg-[var(--amber-accent)]/40"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-25 blur-[100px] bg-[var(--amber-light)]/30"
      />

      {/* Subtle wood grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--wood-grain-opacity)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        style={{ opacity }}
        className="container relative z-10 px-4 md:px-6 py-20 md:py-32"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_450px] items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--amber-accent)]/20 bg-[var(--wood-card)]/50 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[var(--amber-accent)]" />
                <span className="text-[var(--wood-text)]">Patna, India • Currently in Hamirpur 🇮🇳</span>
              </span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-[var(--wood-text)]">Hi, I&apos;m</span>
                  <span className="block mt-1 gradient-text-warm">
                    Amitabh Kumar
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg md:text-xl text-[var(--wood-muted)] font-medium"
              >
                Full-Stack Developer & Wireless Communication Researcher
                <span className="block text-sm md:text-base mt-1 text-[var(--wood-muted)]/70">
                  NIT Hamirpur • Dual Degree (B.Tech + M.Tech)
                </span>
              </motion.p>
            </div>

            {/* Description Cards with amber accents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[var(--amber-accent)]" />
                <p className="text-sm md:text-base text-[var(--wood-muted)]">
                  <span className="text-[var(--wood-text)] font-medium">Full Stack Development</span> — Next.js, React, Node.js, TypeScript
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[var(--amber-light)]" />
                <p className="text-sm md:text-base text-[var(--wood-muted)]">
                  <span className="text-[var(--wood-text)] font-medium">Research</span> — LLMs × Wireless Systems (6G CSI Feedback)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[var(--wood-muted)]" />
                <p className="text-sm md:text-base text-[var(--wood-muted)]">
                  <span className="text-[var(--wood-text)] font-medium">Focus</span> — Clean UI, Scalable Systems, Open Source
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons - Warm Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Resume Button */}
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold overflow-hidden bg-gradient-to-r from-[var(--amber-accent)] via-[var(--amber-light)] to-[var(--amber-accent)] text-[var(--wood-bg)] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </span>
                <Download className="h-4 w-4 relative z-10 transition-transform group-hover:-translate-y-0.5" />
                <span className="relative z-10">Download Resume</span>
              </motion.a>

              {/* See My Work Button - NEW */}
              <motion.a
                href="#projects"
                onClick={handleScrollToProjects}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border border-[var(--amber-accent)]/50 text-[var(--amber-accent)] hover:bg-[var(--amber-accent)]/10 hover:border-[var(--amber-accent)] hover:shadow-lg transition-all duration-300"
              >
                <Eye className="h-4 w-4" />
                See My Work
                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              {/* GitHub Button */}
              <motion.a 
                href="https://github.com/nithamitabh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium bg-[var(--wood-card)]/50 border border-[var(--wood-border)]/30 text-[var(--wood-text)] hover:bg-[var(--wood-card)] hover:border-[var(--wood-border)] transition-all duration-300"
              >
                <Github className="h-4 w-4" />
                GitHub
              </motion.a>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-4 pt-4 text-sm"
            >
              <Link
                href="/#experience"
                className="inline-flex items-center gap-1.5 text-[var(--wood-muted)] hover:text-[var(--amber-accent)] transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                <span>View Experience</span>
              </Link>
              <span className="text-[var(--wood-border)]">•</span>
              <Link
                href="mailto:amitabhkumarstud@gmail.com"
                className="inline-flex items-center gap-1.5 text-[var(--wood-muted)] hover:text-[var(--amber-accent)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Profile Photo with warm glow */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Warm amber glow ring */}
                <div className="absolute -inset-4 rounded-full opacity-30 blur-xl animate-pulse-warm bg-[var(--amber-accent)]/50" />
                
                {/* Rotating gold border */}
                <motion.div 
                  className="absolute -inset-1 rounded-full opacity-75"
                  style={{ 
                    background: "conic-gradient(from 0deg, var(--amber-accent), var(--amber-light), var(--amber-accent))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Profile container */}
                <div className="relative aspect-square w-64 sm:w-72 md:w-80 lg:w-96 overflow-hidden rounded-full border-4 border-[var(--wood-card)] bg-[var(--wood-card)]">
                  <Image
                    src="/profile.jpeg"
                    alt="Amitabh Kumar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Status badge - warm theme */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-2 -right-2 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--amber-accent)]/20 border border-[var(--amber-accent)]/30 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber-accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--amber-accent)]" />
                  </span>
                  <span className="text-xs font-medium text-[var(--amber-accent)]">Open to work</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[var(--wood-muted)]"
        >
          <span className="text-xs">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
