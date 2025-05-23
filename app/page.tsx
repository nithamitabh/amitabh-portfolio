import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"

/**
 * Home page component that renders all sections of the portfolio
 * Each section has a unique ID for smooth scrolling navigation
 */
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main sections with IDs for navigation */}
      <section id="home">
        <Hero />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}
