"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FadeUp, GradientText, StaggerContainer } from "@/components/ui/animated-section"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

/**
 * Premium Blog Preview Section with glassmorphic cards
 * Shows 3 latest blog posts on the main page
 */
export default function BlogPreview() {
  // Take only the first 3 posts for preview
  const previewPosts = blogPosts.slice(0, 3)

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-950/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container px-4 md:px-6 relative z-10">
        <FadeUp>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-white/10 mb-4"
            >
              <BookOpen className="w-8 h-8 text-emerald-400" />
            </motion.div>
            
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Latest <GradientText>Articles</GradientText>
            </h2>
            <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
              Thoughts, insights, and updates on the latest technologies
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <GlassCard className="h-full overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=300&width=500"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge
                          key={category}
                          className="bg-white/10 backdrop-blur-md text-white border-white/20 text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                    <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm pt-2">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* View All Button */}
        <FadeUp>
          <div className="flex justify-center mt-12">
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-4 rounded-full font-semibold
                  bg-gradient-to-r from-emerald-500/20 to-teal-500/20
                  backdrop-blur-xl border border-white/10
                  hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20
                  transition-all duration-300
                  flex items-center gap-2
                "
              >
                <BookOpen className="w-5 h-5" />
                View All Articles
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
