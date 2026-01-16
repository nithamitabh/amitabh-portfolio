"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ReactNode, useRef } from "react"
import { cn } from "@/lib/utils"

interface WoodCardProps {
  children: ReactNode
  className?: string
  glowOnHover?: boolean
  tiltEffect?: boolean
  featured?: boolean
}

/**
 * WoodCard - Premium wooden themed card with grain texture and amber glow
 * Features:
 * - Subtle wood grain texture overlay
 * - Warm amber glow on hover
 * - Optional 3D tilt effect
 * - Featured variant for larger cards
 */
export function WoodCard({
  children,
  className,
  glowOnHover = true,
  tiltEffect = true,
  featured = false,
}: WoodCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tiltEffect) return
    const rect = ref.current.getBoundingClientRect()
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltEffect ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-cabin-warm/80 to-cabin-dark/90",
        "border border-amber-gold/10",
        "shadow-wood",
        glowOnHover && "hover:border-amber-gold/25 hover:shadow-amber-glow",
        featured && "md:col-span-2 md:row-span-2",
        className
      )}
    >
      {/* Wood grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Ambient glow effect on hover */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(214, 163, 84, 0.1) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/**
 * WoodGlassCard - Wooden glassmorphic variant with stronger blur
 */
export function WoodGlassCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "backdrop-blur-xl",
        "bg-gradient-to-br from-wood-800/40 via-wood-700/30 to-wood-800/40",
        "border border-amber-gold/15",
        "shadow-wood hover:shadow-amber-glow",
        "hover:border-amber-gold/30 transition-all duration-300",
        className
      )}
    >
      {/* Wood grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/**
 * Warm themed button with amber glow
 */
export function WarmButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode
  variant?: "primary" | "outline" | "ghost"
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}) {
  const variants = {
    primary: cn(
      "bg-gradient-to-r from-amber-gold via-amber-light to-amber-gold",
      "text-cabin-darker font-semibold",
      "shadow-amber-glow hover:shadow-amber-glow-lg",
      "hover:scale-[1.02] active:scale-[0.98]"
    ),
    outline: cn(
      "bg-transparent border border-amber-gold/50",
      "text-amber-gold hover:bg-amber-gold/10",
      "hover:border-amber-gold hover:shadow-amber-glow"
    ),
    ghost: cn(
      "bg-transparent text-amber-gold/80",
      "hover:text-amber-gold hover:bg-amber-gold/5"
    ),
  }

  return (
    <motion.button
      whileHover={{ scale: variant === "primary" ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        "relative px-6 py-3 rounded-xl font-medium",
        "transition-all duration-300 overflow-hidden",
        variants[variant],
        className
      )}
    >
      {/* Shimmer effect for primary button */}
      {variant === "primary" && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer-gold" />
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default WoodCard
