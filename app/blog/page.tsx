"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Calendar, Clock, BookOpen, ArrowLeft } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"
import type React from "react"

// Warm gradient text
function WarmGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-400 via-golden-400 to-orange-400 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

// Blog card with wooden styling and tilt
function BlogCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 35 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 35 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])
  
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
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative rounded-2xl bg-[var(--wood-card)] border border-[var(--wood-border)] backdrop-blur-xl overflow-hidden shadow-lg dark:shadow-[var(--amber-accent)]/5 ${className}`}
    >
      {/* Wood texture */}
      <div 
        className="absolute inset-0 opacity-[var(--wood-grain-opacity)] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Shimmer on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--amber-accent)]/40 to-transparent" />
      
      <div className="relative">{children}</div>
    </motion.div>
  )
}

/**
 * Blog page with warm wooden theme
 */
export default function BlogPage() {
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div className="min-h-screen relative bg-[var(--wood-bg)]">
      {/* Warm background - theme-aware */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[var(--wood-bg)] via-[var(--wood-card)] to-[var(--wood-bg)]" />
      
      {/* Warm ambient glows */}
      <div className="fixed top-40 right-20 w-80 h-80 bg-[var(--amber-accent)]/10 rounded-full blur-3xl" />
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-[var(--amber-light)]/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--wood-muted)] hover:text-[var(--amber-accent)] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-5 text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-4 rounded-2xl bg-gradient-to-br from-[var(--amber-accent)]/20 to-[var(--amber-light)]/20 backdrop-blur-xl border border-[var(--amber-accent)]/30 mb-4"
          >
            <BookOpen className="w-8 h-8 text-[var(--amber-accent)]" />
          </motion.div>
            
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-[var(--wood-text)]">
            <WarmGradientText>Blog</WarmGradientText>
          </h1>
          <p className="max-w-[700px] text-[var(--wood-muted)] text-lg md:text-xl leading-relaxed">
            Thoughts, insights, and updates on the latest technologies
          </p>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <BlogCard className="h-full">
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=300&width=500"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood-card)]/90 to-transparent" />
                    
                    {/* Category badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge
                          key={category}
                          className="bg-[var(--amber-accent)]/20 backdrop-blur-md text-[var(--amber-accent)] border-[var(--amber-accent)]/30 text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-[var(--wood-muted)]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {estimateReadTime(post.content)} min read
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-[var(--wood-text)] group-hover:text-[var(--amber-accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-[var(--wood-muted)] text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--amber-accent)] font-medium text-sm pt-2">
                      <span>Read more</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </BlogCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
