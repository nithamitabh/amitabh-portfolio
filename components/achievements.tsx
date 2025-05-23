"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { achievements } from "@/lib/data"

/**
 * Achievements section component that displays tabs for different achievement categories
 * Features:
 * - Tabbed interface for hackathons, positions, and awards
 * - Animated cards with staggered animations
 * - Responsive grid layout
 *
 * @returns Achievements section with tabbed interface
 */
export default function Achievements() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Achievements & Activities</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Highlights from my academic and extracurricular journey
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="hackathons" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
            </TabsList>

            <TabsContent value="hackathons" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.hackathons.map((hackathon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{hackathon.name}</CardTitle>
                        <CardDescription>{hackathon.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{hackathon.description}</p>
                        {hackathon.achievement && (
                          <p className="mt-2 text-sm font-medium">Achievement: {hackathon.achievement}</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="positions" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.positions.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{position.role}</CardTitle>
                        <CardDescription>
                          {position.organization} • {position.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{position.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="awards" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{award.title}</CardTitle>
                        <CardDescription>
                          {award.issuer} • {award.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{award.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
