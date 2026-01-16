import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Warm Wooden Theme Colors
        wood: {
          50: "#faf7f2",
          100: "#f2e9d8",
          200: "#e8dfcd",
          300: "#d6c4a8",
          400: "#c7a36a",
          500: "#a88455",
          600: "#8b6914",
          700: "#5c4531",
          800: "#4b3621",
          900: "#201a15",
          950: "#15100d",
        },
        amber: {
          gold: "#d6a354",
          light: "#e2c394",
          glow: "#d8b372",
        },
        cabin: {
          dark: "#1c1612",
          darker: "#15100d",
          medium: "#201a15",
          warm: "#2a211a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "wood": "0 4px 20px rgba(75, 54, 33, 0.3)",
        "wood-lg": "0 8px 40px rgba(75, 54, 33, 0.4)",
        "amber-glow": "0 0 30px rgba(214, 163, 84, 0.3)",
        "amber-glow-lg": "0 0 50px rgba(214, 163, 84, 0.4)",
        "warm": "0 4px 30px rgba(226, 195, 148, 0.15)",
        "warm-lg": "0 8px 50px rgba(226, 195, 148, 0.25)",
      },
      backgroundImage: {
        "wood-gradient": "linear-gradient(135deg, #15100d 0%, #1c1612 50%, #201a15 100%)",
        "wood-gradient-light": "linear-gradient(135deg, #f7f2ea 0%, #f0e6d6 100%)",
        "amber-gradient": "linear-gradient(135deg, #d6a354 0%, #c7a36a 50%, #a88455 100%)",
        "warm-radial": "radial-gradient(ellipse at center, rgba(214, 163, 84, 0.1) 0%, transparent 70%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shimmer-gold": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", boxShadow: "0 0 20px rgba(214, 163, 84, 0.2)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(214, 163, 84, 0.4)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-gold": "shimmer-gold 2.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
