"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Settings, LogOut, User, BarChart3, Workflow, Bell } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 glass-card border-r border-white/10 p-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 mb-8">
          <img src="/logo.png" alt="Autonomous Studios" className="h-8" />
          <span className="text-white font-medium">Dashboard</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white bg-white/10 border border-white/20"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/workflows"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
          >
            <Workflow className="w-5 h-5" />
            <span>Workflows</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light text-white">Dashboard</h1>
            <p className="text-gray-400">Manage your AI workflows and monitor performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
