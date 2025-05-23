import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Footer component with social links and copyright information
 * Features:
 * - Responsive layout
 * - Social media links
 * - Copyright information
 *
 * Extension points:
 * - Add more social media links
 * - Add newsletter subscription
 * - Add sitemap links
 *
 * @returns Footer component
 */
export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="font-bold text-lg">
              Amitabh Kumar
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Software Developer & Open-Source Contributor
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/nithamitabh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/amitabh-kumar-392671231"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:amitabhkumarstud@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Amitabh Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
