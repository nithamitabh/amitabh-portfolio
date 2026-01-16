"use client"

import type React from "react"
import { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Warm gradient text
function WarmGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-400 via-golden-400 to-orange-400 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

// Wooden glass card with tilt effect
function WoodGlassCard({ 
  children, 
  className = "", 
  enableTilt = false 
}: { 
  children: React.ReactNode
  className?: string
  enableTilt?: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 35 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 35 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])
  
  const handleMouseMove = enableTilt ? (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  } : undefined
  
  const handleMouseLeave = enableTilt ? () => {
    x.set(0)
    y.set(0)
  } : undefined

  return (
    <motion.div
      style={enableTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl bg-gradient-to-br from-wood-800/90 via-wood-850/80 to-coffee-800/70 border border-coffee-600/30 backdrop-blur-xl overflow-hidden ${className}`}
    >
      {/* Wood texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Shimmer on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden-400/40 to-transparent" />
      
      <div className="relative">{children}</div>
    </motion.div>
  )
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "amitabhkumarstud@gmail.com",
    href: "mailto:amitabhkumarstud@gmail.com",
    color: "from-amber-500 to-golden-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9555936735",
    href: "tel:+919555936735",
    color: "from-golden-400 to-orange-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "NIT Hamirpur, HP, India",
    href: null,
    color: "from-orange-400 to-amber-500",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/nithamitabh", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/amitabh-kumar-392671231", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/amitabh85467656", label: "Twitter" },
];

/**
 * Premium Contact section with warm wooden theme
 */
export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({ title: "Message sent!", description: "Thank you! I'll get back to you soon." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-900 via-wood-950 to-wood-900" />
      
      {/* Warm ambient glows */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-600/6 rounded-full blur-[180px]" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-golden-500/5 rounded-full blur-[150px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm"
          >
            <MessageCircle className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Let&apos;s Connect</span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-wood-50">
            Get In <WarmGradientText>Touch</WarmGradientText>
          </h2>
          
          {/* Subtitle */}
          <p className="max-w-[700px] text-coffee-300 md:text-lg leading-relaxed">
            Have a question or want to collaborate? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <WoodGlassCard className="p-6" enableTilt={true}>
              <h3 className="text-lg font-semibold text-wood-50 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const Wrapper = item.href ? "a" : "div"
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-500/5 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-500/20`}>
                        <Icon className="h-5 w-5 text-wood-950" />
                      </div>
                      <div>
                        <p className="text-xs text-coffee-400">{item.label}</p>
                        <p className="text-sm font-medium text-wood-100">{item.value}</p>
                      </div>
                    </Wrapper>
                  )
                })}
              </div>
            </WoodGlassCard>

            <WoodGlassCard className="p-6" enableTilt={true}>
              <h3 className="text-lg font-semibold text-wood-50 mb-4">Connect with me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-wood-800/50 border border-coffee-600/30 flex items-center justify-center text-coffee-300 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </div>
            </WoodGlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WoodGlassCard className="p-6">
              <h3 className="text-lg font-semibold text-wood-50 mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-coffee-300">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-wood-800/50 border-coffee-600/30 focus:border-amber-500/50 text-wood-100 placeholder:text-coffee-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-coffee-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-wood-800/50 border-coffee-600/30 focus:border-amber-500/50 text-wood-100 placeholder:text-coffee-500 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm text-coffee-300">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`bg-wood-800/50 border-coffee-600/30 focus:border-amber-500/50 text-wood-100 placeholder:text-coffee-500 ${errors.subject ? "border-red-500" : ""}`}
                  />
                  {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-coffee-300">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`bg-wood-800/50 border-coffee-600/30 focus:border-amber-500/50 text-wood-100 placeholder:text-coffee-500 resize-none ${errors.message ? "border-red-500" : ""}`}
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-golden-500 text-wood-950 font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:from-amber-400 hover:to-golden-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </WoodGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
