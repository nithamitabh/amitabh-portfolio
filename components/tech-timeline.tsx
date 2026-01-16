"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Cpu, Globe, Brain, Rocket } from "lucide-react";
import { FadeUp, GradientText, SlideIn } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    year: "2021",
    title: "Foundation",
    description: "Started with C/C++ programming and fundamentals of computer science",
    technologies: ["C", "C++", "Data Structures"],
    icon: Code2,
    color: "from-[#d6a354] to-[#e2c394]",
    dotColor: "bg-[#d6a354]",
  },
  {
    year: "2022",
    title: "Backend Journey",
    description: "Explored Python ecosystem and built web applications with Django",
    technologies: ["Python", "Django", "MySQL", "REST APIs"],
    icon: Cpu,
    color: "from-[#c49552] to-[#d8b372]",
    dotColor: "bg-[#c49552]",
  },
  {
    year: "2023",
    title: "Full Stack Era",
    description: "Embraced modern JavaScript ecosystem with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    icon: Globe,
    color: "from-[#a88455] to-[#c9a87c]",
    dotColor: "bg-[#a88455]",
  },
  {
    year: "2024",
    title: "Next Level",
    description: "Advanced to Next.js and started telecom ML research for 6G systems",
    technologies: ["Next.js", "TypeScript", "TensorFlow", "Wireless ML"],
    icon: Brain,
    color: "from-[#d8b372] to-[#e2c394]",
    dotColor: "bg-[#d8b372]",
  },
  {
    year: "2025",
    title: "Current Focus",
    description: "Exploring Rust, LLMs, and cutting-edge AI/ML technologies",
    technologies: ["Rust", "LLMs", "RAG", "6G Research"],
    icon: Rocket,
    color: "from-[#d6a354] to-[#f0d9a8]",
    dotColor: "bg-[#d6a354]",
  },
];

function TimelineItem({ item, index, isLast }: { item: typeof timelineData[0]; index: number; isLast: boolean }) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 bottom-0 w-px bg-gradient-to-b from-[#d6a354]/30 to-transparent -translate-x-1/2 hidden md:block" />
      )}

      <div className={cn(
        "grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start",
      )}>
        {/* Left content (or empty on odd items) */}
        <SlideIn direction="left" delay={index * 0.1}>
          <div className={cn(
            "md:text-right",
            !isEven && "md:order-3 md:text-left"
          )}>
            {isEven ? (
              <TimelineCard item={item} />
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </SlideIn>

        {/* Center - Year badge and dot */}
        <div className="flex flex-col items-center gap-2 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              "bg-gradient-to-br shadow-lg",
              item.color
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
          >
            {item.year}
          </motion.span>
        </div>

        {/* Right content (or empty on even items) */}
        <SlideIn direction="right" delay={index * 0.1}>
          <div className={cn(
            !isEven && "md:order-1"
          )}>
            {!isEven ? (
              <TimelineCard item={item} />
            ) : (
              <div className="hidden md:block" />
            )}
            {/* Mobile - always show card */}
            <div className="md:hidden">
              {isEven && null}
            </div>
          </div>
        </SlideIn>
      </div>
    </div>
  );
}

function TimelineCard({ item }: { item: typeof timelineData[0] }) {
  return (
    <div className="relative p-6 rounded-2xl border border-[#d6a354]/20 bg-gradient-to-br from-[#2d231e]/50 to-[#1c1612]/50 backdrop-blur-sm hover:border-[#d6a354]/40 transition-colors group">
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity",
        "bg-gradient-to-r",
        item.color,
        "blur-xl"
      )} style={{ opacity: 0.1 }} />
      
      <div className="relative space-y-3">
        <h3 className="text-lg font-semibold text-[#f2e9d8]">{item.title}</h3>
        <p className="text-sm text-[#a88455]">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#d6a354]/10 text-[#d6a354] border border-[#d6a354]/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Tech Timeline section
 * Shows the developer journey from 2021 to 2025
 */
export default function TechTimeline() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations - warm amber tones */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d6a354]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#e2c394]/5 rounded-full blur-[120px]" />
      
      <div className="container relative px-4 md:px-6">
        <FadeUp>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d6a354]/30 bg-[#d6a354]/10 backdrop-blur-sm text-sm text-[#d6a354]">
              <Calendar className="h-3 w-3 text-[#d6a354]" />
              My Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#f2e9d8]">
              Tech <GradientText from="from-[#d6a354]" via="via-[#e2c394]" to="to-[#d8b372]">Timeline</GradientText>
            </h2>
            <p className="max-w-[700px] text-[#a88455] md:text-lg">
              A glimpse into my evolution as a developer over the years
            </p>
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
