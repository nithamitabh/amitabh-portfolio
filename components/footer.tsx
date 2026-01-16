import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Download, Sparkles, Heart } from "lucide-react";

const RESUME_URL = "https://drive.google.com/drive/folders/1ofic2EMVIlIAjNIC_hPq2LkJGwh1FrrX?usp=drive_link";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/nithamitabh",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/amitabh-kumar-392671231",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nithamitabh",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:amitabhkumarstud@gmail.com",
    icon: Mail,
  },
];

const quickLinks = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Blog", href: "/blog" },
];

/**
 * Footer with warm wooden theme - theme-aware
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--wood-border)]/30 bg-[var(--wood-card)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--amber-accent)]/5 to-transparent" />
      
      {/* Subtle wood pattern */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: 'var(--wood-grain-opacity)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="container relative px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-bold text-2xl bg-gradient-to-r from-[var(--amber-accent)] via-[var(--amber-light)] to-[var(--amber-accent)] bg-clip-text text-transparent">
                Amitabh Kumar
              </span>
            </Link>
            <p className="text-[var(--wood-muted)] max-w-md">
              Full-Stack Developer & Wireless Communication Researcher based in India.
              Building scalable applications and exploring the intersection of AI and telecommunications.
            </p>

            {/* Resume Button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-gradient-to-r from-[var(--amber-accent)] to-[var(--amber-light)] text-[var(--wood-bg)] hover:shadow-lg hover:shadow-[var(--amber-accent)]/25 transition-all hover:scale-105"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
              <Sparkles className="h-3 w-3 opacity-70" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--wood-text)]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--wood-muted)] hover:text-[var(--amber-accent)] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--wood-text)]">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--wood-border)]/30 border border-[var(--wood-border)]/50 text-[var(--wood-muted)] hover:text-[var(--amber-accent)] hover:bg-[var(--amber-accent)]/10 hover:border-[var(--amber-accent)]/30 transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-[var(--wood-muted)]">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--wood-border)]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--wood-muted)] flex items-center gap-1">
              © {new Date().getFullYear()} Amitabh Kumar. Built with
              <Heart className="h-3 w-3 text-[var(--amber-accent)] fill-[var(--amber-accent)] inline mx-1" />
              using Next.js & Tailwind
            </p>
            <p className="text-sm text-[var(--wood-muted)]">
              Patna, India • NIT Hamirpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
