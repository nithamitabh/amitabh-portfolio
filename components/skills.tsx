"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiNextdotjs,
  SiRust,
  SiGo,
  SiKubernetes,
  SiAmazonwebservices,
  SiGooglecloud,
  SiTensorflow,
  SiPytorch,
  SiRedis,
  SiGraphql,
  SiPrisma,
  SiFigma,
  SiLinux,
} from "react-icons/si";
import { Code2 } from "lucide-react";

/**
 * Skills organized by category with warm wooden theme
 */
const skillCategories = [
  {
    name: "Languages",
    icon: "💻",
    skills: [
      { name: "Python", icon: SiPython, color: "#d6a354" },
      { name: "C/C++", icon: SiCplusplus, color: "#c49552" },
      { name: "JavaScript", icon: SiJavascript, color: "#d8b372" },
      { name: "TypeScript", icon: SiTypescript, color: "#c4965a" },
      { name: "Rust", icon: SiRust, color: "#b38040" },
      { name: "Go", icon: SiGo, color: "#d6a354" },
    ],
  },
  {
    name: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", icon: SiReact, color: "#d8b372" },
      { name: "Next.js", icon: SiNextdotjs, color: "#f2e9d8" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#c49552" },
      { name: "Figma", icon: SiFigma, color: "#d6a354" },
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#b38040" },
      { name: "GraphQL", icon: SiGraphql, color: "#d6a354" },
      { name: "Prisma", icon: SiPrisma, color: "#c49552" },
      { name: "Redis", icon: SiRedis, color: "#d8b372" },
    ],
  },
  {
    name: "Database",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#b38040" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#c49552" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#d6a354" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#c49552" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#d8b372" },
      { name: "GCP", icon: SiGooglecloud, color: "#b38040" },
      { name: "Linux", icon: SiLinux, color: "#d6a354" },
    ],
  },
  {
    name: "ML & Research",
    icon: "🧠",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#d8b372" },
      { name: "PyTorch", icon: SiPytorch, color: "#c49552" },
    ],
  },
  {
    name: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", icon: SiGit, color: "#d6a354" },
    ],
  },
];

// Warm gradient text
function WarmGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-400 via-golden-400 to-orange-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/**
 * Individual skill card with wooden styling and hover effects
 */
function SkillCard({ skill, index }: { skill: { name: string; icon: React.ElementType; color: string }; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 35 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 35 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
    >
      <div className="relative p-4 rounded-xl bg-gradient-to-br from-wood-800/80 via-wood-850/70 to-coffee-800/60 border border-coffee-600/30 backdrop-blur-md overflow-hidden h-full">
        {/* Wood texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-golden-400/0 group-hover:from-amber-500/15 group-hover:to-golden-400/10 transition-all duration-300" />
        
        {/* Shimmer on top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex flex-col items-center justify-center gap-3">
          <div className="relative">
            {/* Glow effect behind icon */}
            <div
              className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{ backgroundColor: skill.color }}
            />
            <skill.icon
              className="relative h-10 w-10 transition-all duration-300 group-hover:scale-110"
              style={{ color: skill.color }}
            />
          </div>
          <span className="text-sm font-medium text-center text-coffee-200 group-hover:text-wood-50 transition-colors">
            {skill.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Category card containing multiple skills
 */
function CategoryCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-lg font-semibold text-wood-100">{category.name}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-coffee-600/50 to-transparent" />
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.skills.map((skill, idx) => (
          <SkillCard key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Skills section with warm wooden theme
 */
export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-900 via-wood-950 to-wood-900" />
      
      {/* Warm ambient glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-amber-600/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-golden-500/5 rounded-full blur-[180px]" />
      
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d6a354' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="text-sm font-medium text-amber-300">Always learning</span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-wood-50">
            Skills & <WarmGradientText>Technologies</WarmGradientText>
          </h2>
          
          {/* Subtitle */}
          <p className="max-w-[700px] text-coffee-300 md:text-lg leading-relaxed">
            A comprehensive toolkit I&apos;ve built over the years for full-stack development and research
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
