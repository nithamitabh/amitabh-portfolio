"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Calendar, Users } from "lucide-react";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wood-950 via-wood-900 to-wood-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-amber-100">Project not found</h1>
          <Link href="/#projects">
            <Button variant="outline" className="border-amber-500/30 text-amber-300">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wood-950 via-wood-900 to-wood-950">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/#projects">
            <Button 
              variant="ghost" 
              className="mb-8 text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden mb-12 border border-amber-500/20 shadow-2xl shadow-amber-900/20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-wood-950 via-wood-950/50 to-transparent z-10" />
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-amber-100/70 max-w-2xl"
            >
              {project.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-wood-800/50 to-wood-900/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/10 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                About This Project
              </h2>
              <p className="text-amber-100/70 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="bg-gradient-to-br from-wood-800/50 to-wood-900/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/10 shadow-lg">
                <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                  Screenshots
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="group relative overflow-hidden rounded-lg border border-amber-500/20"
                    >
                      <Image
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wood-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-wood-800/50 to-wood-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/10 shadow-lg">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    className="bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-wood-800/50 to-wood-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/10 shadow-lg">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.github && (
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-wood-800/50 border-amber-500/30 text-amber-100 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-200 transition-all"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </Button>
                  </Link>
                )}
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-wood-950 font-semibold shadow-lg shadow-amber-900/30 transition-all mt-3"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Demo
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-wood-800/50 to-wood-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/10 shadow-lg">
              <h3 className="text-lg font-semibold text-amber-100 mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-amber-100/70">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>Project #{project.id}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-100/70">
                  <Users className="h-4 w-4 text-amber-400" />
                  <span>Personal Project</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
