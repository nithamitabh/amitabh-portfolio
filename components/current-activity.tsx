"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Code2, 
  Server, 
  Building2, 
  Trophy,
  Zap,
  GraduationCap
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const currentActivities = [
  {
    icon: Brain,
    title: "6G CSI Feedback Research",
    description: "Deep learning-based channel state information feedback optimization for next-gen wireless systems",
    iconBg: "bg-[#d6a354]/20",
    iconColor: "text-[#d6a354]",
  },
  {
    icon: Code2,
    title: "Next.js 14 Exploration",
    description: "Building modern web applications with React Server Components and App Router",
    iconBg: "bg-[#e2c394]/20",
    iconColor: "text-[#e2c394]",
  },
  {
    icon: Server,
    title: "DevOps Learning",
    description: "Mastering Docker, Kubernetes, and CI/CD pipelines for production deployments",
    iconBg: "bg-[#c7a36a]/20",
    iconColor: "text-[#c7a36a]",
  },
  {
    icon: Building2,
    title: "Siemens Energy Prep",
    description: "Preparing for campus placement drive with focus on systems and embedded",
    iconBg: "bg-[#7cb66a]/20",
    iconColor: "text-[#7cb66a]",
  },
  {
    icon: Trophy,
    title: "LeetCode Practice",
    description: "Solving DSA problems daily to sharpen algorithmic thinking",
    iconBg: "bg-[#d8b372]/20",
    iconColor: "text-[#d8b372]",
  },
];

function ActivityCard({ activity, index }: { activity: typeof currentActivities[0]; index: number }) {
  const Icon = activity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="p-6 h-full group" enableTilt={true} enableGlow={true}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${activity.iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${activity.iconColor}`} />
          </div>

          {/* Content */}
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-[#f2e9d8] group-hover:text-[#d6a354] transition-colors">
              {activity.title}
            </h3>
            <p className="text-sm text-[#a88455] leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex-shrink-0">
            <Zap className="h-4 w-4 text-[#d6a354] animate-pulse" />
          </div>
        </div>

        {/* Bottom gradient line - warm amber */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d6a354] via-[#e2c394] to-[#d8b372] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
      </GlassCard>
    </motion.div>
  );
}

/**
 * What I'm Doing Now section - warm wooden theme
 */
export default function CurrentActivity() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#15100d] via-[#1c1612] to-[#15100d]" />
      
      {/* Warm amber glow instead of indigo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d6a354]/8 rounded-full blur-[150px]" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d6a354]/20 bg-[#4b3621]/50 backdrop-blur-sm text-sm text-[#d6a354]">
            <GraduationCap className="h-3 w-3" />
            Currently Learning
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#f2e9d8]">What I&apos;m </span>
            <span className="bg-gradient-to-r from-[#d6a354] via-[#e2c394] to-[#d8b372] bg-clip-text text-transparent">Doing Now</span>
          </h2>
          <p className="max-w-[700px] text-[#a88455] md:text-lg">
            Here&apos;s what I&apos;m currently focused on and learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentActivities.map((activity, index) => (
            <ActivityCard key={activity.title} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
