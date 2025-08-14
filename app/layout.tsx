import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "sonner"
import { AuroraBackground } from "@/components/aurora-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Autonomous Studios - AI-Powered Business Automation",
  description: "Transform your business with intelligent AI agents and automation workflows",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          {/* Aurora Background - Global */}
          <AuroraBackground />

          {/* Content */}
          <div className="relative z-10">
            <AuthProvider>{children}</AuthProvider>
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
              },
            }}
          />
        </div>
      </body>
    </html>
  )
}
