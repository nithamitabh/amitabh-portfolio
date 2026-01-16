import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amitabh Kumar | Software Developer",
  description: "Personal portfolio of Amitabh Kumar, software developer and open-source contributor",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[var(--wood-bg)] transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--wood-bg)] via-[var(--wood-card)] to-[var(--wood-bg)]">
            {/* Subtle wood grain overlay */}
            <div 
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                opacity: 'var(--wood-grain-opacity)',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            <Navbar />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
