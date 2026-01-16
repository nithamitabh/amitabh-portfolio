import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import CurrentActivity from "@/components/current-activity"
import LeetCode from "@/components/leetcode"
import TechTimeline from "@/components/tech-timeline"
import Achievements from "@/components/achievements"
import BlogPreview from "@/components/blog-preview"
import Contact from "@/components/contact"

/**
 * Home page component that renders all sections of the portfolio
 * Each section has a unique ID for smooth scrolling navigation
 * Features premium UI with animations and modern design
 */
export default function Home() {
  return (
    <div className="relative">
      {/* Global background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))]" />
      
      {/* Main content */}
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="leetcode">
          <LeetCode />
        </section>

        <section id="timeline">
          <TechTimeline />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="current">
          <CurrentActivity />
        </section>

        <section id="achievements">
          <Achievements />
        </section>

        <section id="blog">
          <BlogPreview />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  )
}
