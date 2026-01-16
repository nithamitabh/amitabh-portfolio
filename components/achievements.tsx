"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { achievements } from "@/lib/data"
import { Trophy, Users, Award, Code, Calendar, Building2, Star } from "lucide-react"

/**
 * Achievements section with warm wooden theme
 */

// Warm gradient text
function WarmGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-400 via-golden-400 to-orange-400 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

const AchievementCard = ({ 
  children, 
  index, 
  icon: Icon,
  accentColor = "amber" 
}: { 
  children: React.ReactNode
  index: number
  icon: React.ElementType
  accentColor?: "amber" | "golden" | "orange"
}) => {
  const colorClasses = {
    amber: "from-amber-500/15 to-golden-500/15 group-hover:from-amber-500/25 group-hover:to-golden-500/25",
    golden: "from-golden-500/15 to-orange-500/15 group-hover:from-golden-500/25 group-hover:to-orange-500/25",
    orange: "from-orange-500/15 to-amber-500/15 group-hover:from-orange-500/25 group-hover:to-amber-500/25",
  }
  
  const iconBg = {
    amber: "bg-amber-500/20 text-amber-400",
    golden: "bg-golden-500/20 text-golden-400",
    orange: "bg-orange-500/20 text-orange-400",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`
          relative overflow-hidden rounded-2xl p-6
          bg-gradient-to-br ${colorClasses[accentColor]}
          backdrop-blur-xl border border-coffee-600/30
          hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10
          transition-all duration-500
        `}
      >
        {/* Wood texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute -inset-1 bg-gradient-to-r ${colorClasses[accentColor]} blur-xl`} />
        </div>
        
        {/* Shimmer on top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon badge */}
        <div className={`absolute top-4 right-4 p-2 rounded-xl ${iconBg[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-900 via-wood-950 to-wood-900" />
      
      {/* Warm ambient glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-golden-500/6 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-5 text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-golden-500/20 backdrop-blur-xl border border-amber-500/30 mb-4"
          >
            <Trophy className="w-8 h-8 text-amber-400" />
          </motion.div>
            
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-wood-50">
            <WarmGradientText>Achievements</WarmGradientText> & Activities
          </h2>
          <p className="max-w-[700px] text-coffee-300 text-lg md:text-xl leading-relaxed">
            Highlights from my academic and extracurricular journey
          </p>
        </motion.div>

        <div className="mt-8">
          <Tabs defaultValue="hackathons" className="w-full">
            {/* Warm wooden Tab List */}
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 p-1 rounded-2xl bg-wood-800/50 backdrop-blur-xl border border-coffee-600/30">
              <TabsTrigger 
                value="hackathons" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-golden-500/20 data-[state=active]:text-amber-400 rounded-xl transition-all duration-300 flex items-center gap-2 text-coffee-300"
              >
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Hackathons</span>
              </TabsTrigger>
              <TabsTrigger 
                value="positions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-golden-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-golden-400 rounded-xl transition-all duration-300 flex items-center gap-2 text-coffee-300"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Positions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="awards"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-amber-500/20 data-[state=active]:text-orange-400 rounded-xl transition-all duration-300 flex items-center gap-2 text-coffee-300"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Awards</span>
              </TabsTrigger>
            </TabsList>

            {/* Hackathons Tab */}
            <TabsContent value="hackathons" className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.hackathons.map((hackathon, index) => (
                  <AchievementCard key={index} index={index} icon={Code} accentColor="amber">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-wood-50 group-hover:text-amber-400 transition-colors">
                        {hackathon.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-coffee-400">
                        <Calendar className="w-4 h-4" />
                        {hackathon.date}
                      </div>
                      <p className="text-coffee-300 leading-relaxed">
                        {hackathon.description}
                      </p>
                      {hackathon.achievement && (
                        <div className="flex items-center gap-2 pt-2">
                          <Star className="w-4 h-4 text-golden-400" />
                          <span className="text-sm font-semibold bg-gradient-to-r from-amber-400 to-golden-400 bg-clip-text text-transparent">
                            {hackathon.achievement}
                          </span>
                        </div>
                      )}
                    </div>
                  </AchievementCard>
                ))}
              </div>
            </TabsContent>

            {/* Positions Tab */}
            <TabsContent value="positions" className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.positions.map((position, index) => (
                  <AchievementCard key={index} index={index} icon={Users} accentColor="golden">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-wood-50 group-hover:text-golden-400 transition-colors">
                        {position.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-coffee-400">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {position.organization}
                        </div>
                        <span className="text-coffee-600">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {position.period}
                        </div>
                      </div>
                      <p className="text-coffee-300 leading-relaxed">
                        {position.description}
                      </p>
                    </div>
                  </AchievementCard>
                ))}
              </div>
            </TabsContent>

            {/* Awards Tab */}
            <TabsContent value="awards" className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.awards.map((award, index) => (
                  <AchievementCard key={index} index={index} icon={Trophy} accentColor="orange">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-wood-50 group-hover:text-orange-400 transition-colors">
                        {award.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-coffee-400">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {award.issuer}
                        </div>
                        <span className="text-coffee-600">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {award.date}
                        </div>
                      </div>
                      <p className="text-coffee-300 leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </AchievementCard>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
