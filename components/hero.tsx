"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Hero section component for the landing page
 * Features:
 * - Animated introduction with staggered animations
 * - Contact and GitHub links
 * - Professional photo
 * - Scroll indicator
 *
 * @returns Hero section with animations and call-to-action buttons
 */
export default function Hero() {
  // Function to handle smooth scrolling to projects section
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#projects");
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Hi, I&apos;m Amitabh Kumar
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Software Developer, Open-Source Contributor, and Dual-Degree
                Student at NIT Hamirpur
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <a href="mailto:harsh36j@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/nithamitabh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
            <Link
              href="#projects"
              onClick={handleScrollToProjects}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-8"
            >
              Scroll to see my work <ArrowDown className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border-4 border-background bg-muted">
              <Image
                src="/profile.jpeg"
                alt="Amitabh Kumar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
