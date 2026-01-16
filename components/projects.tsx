"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, ChevronRight, ChevronLeft, Layers, Lightbulb, User, Code2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"

/**
 * Premium Project Card with warm wooden theme
 * Features: 3D tilt, wood grain, amber glow, enhanced info
 */
function ProjectCard({ 
  project, 
  index, 
  featured = false 
}: { 
  project: typeof projects[0]
  index: number
  featured?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <div className={cn(
        "relative h-full rounded-2xl overflow-hidden transition-all duration-500",
        "bg-gradient-to-br from-wood-800/80 via-wood-700/60 to-wood-800/80",
        "border border-amber-gold/10",
        "shadow-wood",
        isHovered && "border-amber-gold/30 shadow-amber-glow-lg"
      )}>
        {/* Wood grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Amber beam effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(214, 163, 84, 0.15) 0%, transparent 60%)",
          }}
        />

        {/* Project Image */}
        <div className={cn(
          "relative overflow-hidden",
          featured ? "h-72 md:h-80" : "h-48"
        )}>
          <div className="absolute inset-0 bg-gradient-to-t from-cabin-darker via-transparent to-transparent z-10" />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered && "scale-110"
            )}
          />
          
          {/* Hover overlay with action buttons */}
          <motion.div 
            className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-cabin-darker/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-wood-800/80 border border-amber-gold/30 text-amber-gold hover:bg-amber-gold/20 hover:border-amber-gold transition-all"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-gold text-cabin-darker hover:bg-amber-light transition-all"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-gold text-cabin-darker text-xs font-bold">
              <Layers className="h-3 w-3" />
              Featured Project
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          "relative z-10 space-y-4",
          featured ? "p-8" : "p-6"
        )}>
          {/* Title */}
          <h3 className={cn(
            "font-bold text-wood-100 group-hover:text-amber-gold transition-colors",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={cn(
            "text-wood-400 leading-relaxed",
            featured ? "text-base" : "text-sm line-clamp-2"
          )}>
            {project.description}
          </p>

          {/* Enhanced info for featured */}
          {featured && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-amber-gold/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-gold/10">
                  <Lightbulb className="h-4 w-4 text-amber-gold" />
                </div>
                <div>
                  <p className="text-xs text-wood-500 uppercase tracking-wider">Problem</p>
                  <p className="text-sm text-wood-200">Solving real-world challenges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-gold/10">
                  <User className="h-4 w-4 text-amber-gold" />
                </div>
                <div>
                  <p className="text-xs text-wood-500 uppercase tracking-wider">Role</p>
                  <p className="text-sm text-wood-200">Full-Stack Developer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-gold/10">
                  <Code2 className="h-4 w-4 text-amber-gold" />
                </div>
                <div>
                  <p className="text-xs text-wood-500 uppercase tracking-wider">Stack</p>
                  <p className="text-sm text-wood-200">{project.technologies.slice(0, 3).join(", ")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-gold/10 text-amber-gold border border-amber-gold/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (featured ? 6 : 4) && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-wood-700/50 text-wood-400 border border-wood-600/30">
                +{project.technologies.length - (featured ? 6 : 4)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-gold hover:text-amber-light transition-colors group/link"
            >
              View Details
              <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-wood-400 hover:text-wood-200 transition-colors"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Projects section - DOMINANT with warm wooden theme + SLIDER
 * Features: Full-width background, slider/carousel, amber beams
 */
export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = projects.length - 1
      if (next >= projects.length) next = 0
      return next
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-play (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const currentProject = projects[currentIndex]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Full-width wooden gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#15100d] via-[#1c1612] to-[#15100d]" />
      
      {/* Ambient amber beams */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-20 blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(214, 163, 84, 0.4) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(199, 163, 106, 0.3) 0%, transparent 70%)" }}
      />

      {/* Wood texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d6a354]/20 bg-[#4b3621]/50 backdrop-blur-sm text-sm text-[#d6a354]">
            <Layers className="h-3 w-3" />
            Featured Work
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-[#f2e9d8]">My </span>
            <span className="bg-gradient-to-r from-[#d6a354] via-[#e2c394] to-[#d6a354] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="max-w-[700px] text-[#a88455] md:text-lg">
            A collection of projects showcasing my skills in full-stack development, IoT, and AI
          </p>
        </motion.div>

        {/* Slider Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1c1612]/80 border border-[#d6a354]/30 text-[#d6a354] hover:bg-[#d6a354]/20 hover:border-[#d6a354] transition-all backdrop-blur-sm"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#1c1612]/80 border border-[#d6a354]/30 text-[#d6a354] hover:bg-[#d6a354]/20 hover:border-[#d6a354] transition-all backdrop-blur-sm"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slider */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
              >
                {/* Large Project Card */}
                <div className="bg-gradient-to-br from-[#1c1612] via-[#201a15] to-[#1c1612] rounded-2xl border border-[#d6a354]/10 overflow-hidden shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-[500px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c1612] z-10 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1612] to-transparent z-10 md:hidden" />
                      <Image
                        src={currentProject.image || "/placeholder.svg"}
                        alt={currentProject.title}
                        fill
                        className="object-cover"
                      />
                      {/* Project number badge */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#d6a354] text-[#15100d] text-sm font-bold">
                        {String(currentIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-10 flex flex-col justify-center space-y-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#f2e9d8] mb-4">
                          {currentProject.title}
                        </h3>
                        <p className="text-[#a88455] text-lg leading-relaxed">
                          {currentProject.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {currentProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-[#d6a354]/10 text-[#d6a354] border border-[#d6a354]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                          href={`/projects/${currentProject.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d6a354] text-[#15100d] font-semibold hover:bg-[#e2c394] transition-all shadow-lg shadow-[#d6a354]/20"
                        >
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                        {currentProject.github && (
                          <a
                            href={currentProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#d6a354]/30 text-[#d6a354] hover:bg-[#d6a354]/10 transition-all"
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </a>
                        )}
                        {currentProject.liveUrl && (
                          <a
                            href={currentProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#d6a354]/30 text-[#d6a354] hover:bg-[#d6a354]/10 transition-all"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-[#d6a354] w-8"
                    : "bg-[#4b3621] hover:bg-[#5c4531]"
                )}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Project Thumbnails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-20 rounded-xl overflow-hidden transition-all duration-300 border-2",
                index === currentIndex
                  ? "border-[#d6a354] ring-2 ring-[#d6a354]/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#15100d]/40" />
              <div className="absolute bottom-1 left-1 right-1 text-xs text-white font-medium truncate">
                {project.title}
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
