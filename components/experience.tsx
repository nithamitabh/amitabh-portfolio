"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Briefcase, Calendar, MapPin, TrendingUp, Award, Users, Zap } from "lucide-react"
import { experiences } from "@/lib/data"

/**
 * Experience section component with warm wooden timeline
 * Features:
 * - Vertical timeline with warm gold connecting line (#d8b372)
 * - Wooden glass cards with warm amber accents
 * - Quantified achievements with icons
 * - Hover scale + glow effects
 * - Dominant visual presence
 */

// Warm animated text component
function WarmGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#d6a354] via-[#e2c394] to-[#d8b372] bg-clip-text text-transparent">
      {children}
    </span>
  )
}

// Experience card with wooden styling and tilt effect
function ExperienceCard({ 
  experience, 
  index, 
  isLeft 
}: { 
  experience: typeof experiences[0]
  index: number 
  isLeft: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 35 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 35 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  // Icons for achievements - rotate through them
  const achievementIcons = [TrendingUp, Award, Users, Zap]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row gap-4 md:gap-10 ${
        isLeft ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot with glow */}
      <div className="absolute left-0 md:left-1/2 top-8 transform -translate-x-1/2 z-10">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#d6a354] to-[#e2c394] blur-md opacity-60" />
          {/* Main dot */}
          <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#d6a354] via-[#e2c394] to-[#d8b372] ring-4 ring-[#1c1612] shadow-lg shadow-[#d6a354]/30" />
          {/* Inner shine */}
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/40" />
        </motion.div>
      </div>
      
      {/* Mobile timeline dot */}
      <div className="absolute left-0 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-[#d6a354] to-[#e2c394] transform -translate-x-1/2 ring-3 ring-[#1c1612] md:hidden shadow-lg shadow-[#d6a354]/40" />
      
      {/* Content */}
      <div className={`md:w-1/2 pl-8 md:pl-0 ${
        isLeft ? "md:pr-14 md:text-right" : "md:pl-14"
      }`}>
        <motion.div
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d"
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#2d231e]/90 via-[#1c1612]/80 to-[#4b3621]/70 border border-[#5c4531]/30 backdrop-blur-xl overflow-hidden cursor-pointer"
        >
          {/* Wood texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          
          {/* Warm glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d6a354]/0 via-[#e2c394]/0 to-[#d8b372]/0 group-hover:from-[#d6a354]/10 group-hover:via-[#e2c394]/5 group-hover:to-[#d8b372]/10 transition-all duration-500" />
          
          {/* Shimmer line on top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e2c394]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative space-y-4">
            {/* Header */}
            <div className={`flex flex-col ${
              isLeft ? "md:items-end" : "md:items-start"
            }`}>
              {/* Period badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#d6a354]/15 to-[#e2c394]/15 text-[#d6a354] border border-[#d6a354]/25 mb-3 shadow-sm shadow-[#d6a354]/10">
                <Calendar className="h-3 w-3" />
                {experience.period}
              </span>
              
              {/* Role title with gradient */}
              <h3 className="text-xl md:text-2xl font-bold text-[#f2e9d8] group-hover:text-[#d6a354] transition-colors duration-300">
                {experience.role}
              </h3>
              
              {/* Company */}
              <p className="text-[#a88455] flex items-center gap-2 mt-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5 text-[#e2c394]" />
                <span className="font-medium">{experience.company}</span>
              </p>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#5c4531]/50 via-[#e2c394]/30 to-[#5c4531]/50" />
            
            {/* Responsibilities as achievements */}
            <ul className={`space-y-3 text-sm ${
              isLeft ? "md:text-right" : ""
            }`}>
              {experience.responsibilities.map((responsibility, idx) => {
                const IconComponent = achievementIcons[idx % achievementIcons.length]
                return (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className={`flex items-start gap-3 ${
                      isLeft ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#d6a354]/20 to-[#e2c394]/10 flex items-center justify-center mt-0.5 border border-[#d6a354]/20">
                      <IconComponent className="w-3 h-3 text-[#d6a354]" />
                    </span>
                    <span className="text-[#c9a87c] leading-relaxed group-hover:text-[#e2c394] transition-colors">
                      {responsibility}
                    </span>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      </div>
      
      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Warm background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#15100d] via-[#1c1612] to-[#15100d]" />
      
      {/* Warm ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#d6a354]/8 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#e2c394]/6 rounded-full blur-[150px]" />
      
      {/* Subtle wood grain pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6a354' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container relative px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-5 text-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d6a354]/30 bg-[#d6a354]/10 backdrop-blur-sm"
          >
            <Briefcase className="h-4 w-4 text-[#d6a354]" />
            <span className="text-sm font-medium text-[#d6a354]">Career Journey</span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#f2e9d8]">
            Work <WarmGradientText>Experience</WarmGradientText>
          </h2>
          
          {/* Subtitle */}
          <p className="max-w-[700px] text-[#a88455] md:text-lg leading-relaxed">
            My professional journey through innovative companies and challenging roles that have shaped my expertise
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line - warm gold gradient */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                #d8b372 5%, 
                #d6a354 50%, 
                #c49552 95%, 
                transparent 100%
              )`
            }}
          />
          
          {/* Glowing effect on timeline */}
          <div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-4 transform md:-translate-x-1/2 opacity-30 blur-sm -z-10"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                #d8b372 10%, 
                #d6a354 50%, 
                #c49552 90%, 
                transparent 100%
              )`
            }}
          />

          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
          
          {/* End of timeline marker */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute left-0 md:left-1/2 bottom-0 transform -translate-x-1/2 translate-y-8"
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#d6a354] to-[#e2c394] ring-4 ring-[#1c1612]" />
          </motion.div>
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-[#8b7355] text-sm mb-4">
            Want to know more about my experience?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d6a354]/20 to-[#e2c394]/20 border border-[#d6a354]/30 text-[#d6a354] font-medium hover:from-[#d6a354]/30 hover:to-[#e2c394]/30 hover:border-[#d6a354]/50 transition-all duration-300 shadow-lg shadow-[#d6a354]/10"
          >
            <span>Let&apos;s Connect</span>
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
