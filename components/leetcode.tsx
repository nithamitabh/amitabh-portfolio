"use client";

import { motion } from "framer-motion";
import { Trophy, Code, Target, ExternalLink } from "lucide-react";
import Image from "next/image";

const LEETCODE_USERNAME = "nithamitabh";
const LEETCODE_PROFILE_URL = `https://leetcode.com/${LEETCODE_USERNAME}`;

/**
 * Competitive Programming / LeetCode section
 * Displays LeetCode stats with warm wooden theme
 */
export default function LeetCode() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Warm wooden background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#15100d] via-[#1c1612] to-[#15100d]" />
      
      {/* Ambient amber glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d6a354]/10 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#d8b372]/8 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d6a354]/20 bg-[#4b3621]/50 backdrop-blur-sm text-sm text-[#d6a354]">
            <Trophy className="h-3 w-3" />
            Problem Solving
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="text-[#f2e9d8]">Competitive </span>
            <span className="bg-gradient-to-r from-[#d6a354] via-[#e2c394] to-[#d8b372] bg-clip-text text-transparent">Programming</span>
          </h2>
          <p className="max-w-[700px] text-[#a88455] md:text-lg">
            Sharpening my algorithmic skills one problem at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LeetCard Widget */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-[#1c1612]/90 via-[#201a15]/80 to-[#1c1612]/90 border border-[#d6a354]/10 backdrop-blur-xl shadow-xl hover:border-[#d6a354]/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d6a354]/20 flex items-center justify-center">
                      <Code className="h-5 w-5 text-[#d6a354]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f2e9d8]">LeetCode Stats</h3>
                      <p className="text-xs text-[#a88455]">@{LEETCODE_USERNAME}</p>
                    </div>
                  </div>
                  <a
                    href={LEETCODE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#d6a354]/10 text-[#d6a354] border border-[#d6a354]/20 hover:bg-[#d6a354]/20 transition-colors"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* LeetCard Image */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#201a15] to-[#15100d] p-2 border border-[#4b3621]/30">
                  <Image
                    src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Fira%20Code&ext=heatmap`}
                    alt="LeetCode Stats"
                    width={500}
                    height={200}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contest Rating Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-[#1c1612]/90 via-[#201a15]/80 to-[#1c1612]/90 border border-[#d6a354]/10 backdrop-blur-xl shadow-xl hover:border-[#d6a354]/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e2c394]/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-[#e2c394]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#f2e9d8]">Contest Rating</h3>
                      <p className="text-xs text-[#a88455]">Weekly Contests</p>
                    </div>
                  </div>
                </div>

                {/* Contest Rating Card Image */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#201a15] to-[#15100d] p-2 border border-[#4b3621]/30">
                  <Image
                    src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Fira%20Code&ext=contest`}
                    alt="LeetCode Contest Rating"
                    width={500}
                    height={200}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                </div>

                {/* Quick Stats with warm colors */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-[#4b8b3b]/10 border border-[#4b8b3b]/20">
                    <div className="text-lg font-bold text-[#7cb66a]">Easy</div>
                    <div className="text-xs text-[#a88455]">Solved</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#d6a354]/10 border border-[#d6a354]/20">
                    <div className="text-lg font-bold text-[#d6a354]">Medium</div>
                    <div className="text-xs text-[#a88455]">Solved</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#c75b4a]/10 border border-[#c75b4a]/20">
                    <div className="text-lg font-bold text-[#d4776a]">Hard</div>
                    <div className="text-xs text-[#a88455]">Solved</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
