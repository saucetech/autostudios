"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { User } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const isHomePage = pathname === "/"

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    // On other pages, the Link component's default behavior will handle navigation to the hash link on the homepage.
  }

  const handleBookDemoClick = () => {
    if (isHomePage) {
      const element = document.getElementById("contact")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push("/#contact")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 dashboard-header">
      <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Autonomous Studios Logo"
              width={40}
              height={40}
              className="rounded-full border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:border-white/40"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-semibold text-xl text-white group-hover:text-gray-100 transition-colors duration-300">
            Autonomous Studios
          </span>
        </Link>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#solutions"
              onClick={(e) => handleNavClick(e, "solutions")}
              className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium relative group"
            >
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/#roi-calculator"
              onClick={(e) => handleNavClick(e, "roi-calculator")}
              className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium relative group"
            >
              ROI Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/#how-it-works"
              onClick={(e) => handleNavClick(e, "how-it-works")}
              className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium relative group"
            >
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/library"
              className={`text-sm font-medium transition-colors duration-300 relative group ${
                pathname.startsWith("/library") ? "text-white" : "text-gray-200 hover:text-white"
              }`}
            >
              Library
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${
                  pathname.startsWith("/library") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 glass-card-subtle px-4 py-2 rounded-lg text-gray-100 hover:text-white transition-all duration-300 hover:bg-white/10 text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <div className="text-gray-300 text-sm font-medium">{user?.name}</div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Sign In
              </Link>
              <button
                onClick={handleBookDemoClick}
                className="primary-button px-6 py-3 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
