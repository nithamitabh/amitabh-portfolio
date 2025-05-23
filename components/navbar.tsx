"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/**
 * Navigation items with proper section IDs for smooth scrolling
 * Each item corresponds to a section on the homepage
 */
const navItems = [
  { name: "Home", path: "/#home" },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/#projects" },
  { name: "Experience", path: "/#experience" },
  { name: "Achievements", path: "/#achievements" },
  { name: "Contact", path: "/#contact" },
  { name: "Blog", path: "/blog" }, // Added blog navigation item
];

/**
 * Navbar component with responsive design and smooth scrolling
 * Features:
 * - Desktop and mobile navigation
 * - Theme toggle
 * - Transparent to solid background on scroll
 * - Resume download link
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    // Only handle anchor links on the same page
    if (path.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = path.replace("/#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Smooth scroll to the target element
        targetElement.scrollIntoView({ behavior: "smooth" });

        // Update URL without reloading the page
        window.history.pushState(null, "", path);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Amitabh Kumar
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ||
                    (pathname === "/" &&
                      item.path.startsWith("/#") &&
                      pathname + item.path.substring(1) === item.path)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://drive.google.com/drive/folders/1ofic2EMVIlIAjNIC_hPq2LkJGwh1FrrX?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                Resume
              </Button>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.path
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="https://drive.google.com/drive/folders/1ofic2EMVIlIAjNIC_hPq2LkJGwh1FrrX?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Resume
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
