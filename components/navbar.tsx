"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Download, X, Briefcase, FolderOpen, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_URL = "https://drive.google.com/drive/folders/1ofic2EMVIlIAjNIC_hPq2LkJGwh1FrrX?usp=drive_link";

/**
 * Navigation items with Experience highlighted
 */
const navItems = [
  { name: "Home", path: "/#home" },
  { name: "Experience", path: "/#experience", highlight: true },
  { name: "Projects", path: "/#projects", highlight: true },
  { name: "Skills", path: "/#skills" },
  { name: "LeetCode", path: "/#leetcode" },
  { name: "Contact", path: "/#contact" },
  { name: "Blog", path: "/blog" },
];

/**
 * Warm themed Resume Button with golden shimmer
 */
function ResumeButton({ className, size = "default" }: { className?: string; size?: "sm" | "default" }) {
  return (
    <motion.a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-all duration-300",
        "bg-gradient-to-r from-amber-gold via-amber-light to-amber-gold",
        "text-cabin-darker",
        "hover:shadow-amber-glow hover:scale-105",
        size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Golden shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:animate-shimmer-gold group-hover:opacity-100" />
      </div>
      
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      <span>Resume</span>
    </motion.a>
  );
}

/**
 * Floating Navbar with warm wooden glass effect
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll event
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      
      // Update active section based on scroll position
      const sections = ["home", "experience", "projects", "skills", "leetcode", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (typeof window === 'undefined') return;
    
    if (path.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = path.replace("/#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", path);
        setActiveSection(targetId);
      }
    }
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return activeSection === path.replace("/#", "");
    }
    return pathname === path;
  };

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-20" />
      
      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto",
          "w-[95%] max-w-5xl",
          "transition-all duration-500"
        )}
      >
        <nav
          className={cn(
            "relative rounded-2xl px-4 py-3",
            "backdrop-blur-xl",
            // Theme-aware wooden glass effect
            "bg-[var(--wood-card)]/95",
            "border border-[var(--amber-accent)]/20",
            "shadow-lg",
            // Subtle amber glow when scrolled
            isScrolled && "shadow-xl"
          )}
        >
          {/* Wood grain texture overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.span
                className="font-bold text-xl gradient-text-warm"
                whileHover={{ scale: 1.05 }}
              >
                AK
              </motion.span>
              <span className="hidden sm:inline text-[var(--wood-text)] font-medium">
                Amitabh Kumar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl",
                    "hover:text-[var(--amber-accent)]",
                    isActive(item.path)
                      ? "text-[var(--amber-accent)]"
                      : "text-[var(--wood-text)]",
                    item.highlight && "font-semibold"
                  )}
                >
                  {item.name}
                  
                  {/* Golden underline for active/hover */}
                  <AnimatePresence>
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[var(--amber-accent)] to-transparent"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
              
              <div className="ml-3 flex items-center gap-2 pl-3 border-l border-[var(--amber-accent)]/20">
                <ResumeButton size="sm" />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative text-[var(--wood-text)] hover:text-[var(--amber-accent)] hover:bg-[var(--amber-accent)]/10"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className={cn(
                    "w-80 border-l border-[var(--amber-accent)]/20",
                    "bg-[var(--wood-card)]",
                    "backdrop-blur-xl"
                  )}
                >
                  {/* Wood grain overlay for mobile menu */}
                  <div 
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  <div className="relative flex flex-col gap-6 mt-8">
                    {/* Mobile Logo */}
                    <Link href="/" className="font-bold text-xl gradient-text-warm">
                      Amitabh Kumar
                    </Link>

                    {/* Mobile Nav Links */}
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.path}
                            onClick={(e) => handleNavClick(e, item.path)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-xl",
                              "hover:bg-[var(--amber-accent)]/10 hover:text-[var(--amber-accent)]",
                              isActive(item.path)
                                ? "text-[var(--amber-accent)] bg-[var(--amber-accent)]/10 border-l-2 border-[var(--amber-accent)]"
                                : "text-[var(--wood-text)]",
                            )}
                          >
                            {item.highlight && (
                              <span className="w-2 h-2 rounded-full bg-[var(--amber-accent)] animate-pulse" />
                            )}
                            {item.name}
                            <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    {/* Quick Links */}
                    <div className="pt-4 border-t border-[var(--amber-accent)]/20">
                      <p className="px-4 text-xs text-[var(--wood-muted)] uppercase tracking-wider mb-3">Quick Links</p>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/#experience"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--wood-text)] hover:text-[var(--amber-accent)] transition-colors"
                        >
                          <Briefcase className="h-4 w-4" />
                          Experience
                        </Link>
                        <Link
                          href="/#projects"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--wood-text)] hover:text-[var(--amber-accent)] transition-colors"
                        >
                          <FolderOpen className="h-4 w-4" />
                          Projects
                        </Link>
                      </div>
                    </div>

                    {/* Mobile Resume Button */}
                    <ResumeButton className="w-full justify-center mt-4" />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
        
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full bg-[var(--wood-border)]/50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--amber-accent)] via-[var(--amber-light)] to-[var(--amber-accent)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </motion.div>
      </motion.header>
    </>
  );
}
