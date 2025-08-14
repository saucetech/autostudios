"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Zap,
  Settings,
  Activity,
  Webhook,
  Users,
  BarChart3,
  Brain,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, category: "main" },
  { name: "Agents", href: "/dashboard/automations", icon: Zap, category: "main" },
  { name: "Integrations", href: "/dashboard/integrations", icon: Settings, category: "main" },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Brain, category: "main" },
  { name: "Jobs", href: "/dashboard/jobs", icon: Activity, category: "tools" },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook, category: "tools" },
  { name: "Team", href: "/dashboard/team", icon: Users, category: "tools" },
  { name: "Insights", href: "/dashboard/analytics", icon: BarChart3, category: "tools" },
  { name: "User Settings", href: "/dashboard/settings", icon: User, category: "tools" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  if (!mounted) return null

  const mainItems = navigation.filter((item) => item.category === "main")
  const toolItems = navigation.filter((item) => item.category === "tools")

  return (
    <div className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex-1 flex flex-col min-h-0 premium-sidebar">
        {/* Brand Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all duration-500 group-hover:shadow-purple-500/40 group-hover:scale-105">
              <span className="text-white text-lg font-bold tracking-tight">AS</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Main Navigation */}
          <nav className="px-6 space-y-1">
            {mainItems.map((item, index) => {
              const isActive = pathname === item.href
              const isHovered = hoveredItem === item.name

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3.5 rounded-2xl relative overflow-hidden",
                    "transform transition-all duration-500 ease-out",
                    "hover:translate-x-1",
                    isActive
                      ? "premium-nav-active text-white shadow-2xl shadow-purple-500/20 translate-x-1"
                      : "text-gray-300 hover:premium-nav-hover hover:text-white",
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: mounted ? "slideInLeft 0.6s ease-out forwards" : "none",
                  }}
                >
                  {/* Active state background */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-violet-500/20 to-purple-600/30 rounded-2xl"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-violet-500 rounded-r-full shadow-lg shadow-purple-400/50"></div>
                    </>
                  )}

                  {/* Hover state background */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] rounded-2xl transition-all duration-300"></div>
                  )}

                  <div className="flex items-center relative z-10">
                    <item.icon
                      className={cn(
                        "mr-4 flex-shrink-0 h-5 w-5 transition-all duration-500",
                        "group-hover:scale-110",
                        isActive
                          ? "text-purple-300 drop-shadow-lg"
                          : "text-gray-400 group-hover:text-white group-hover:drop-shadow-sm",
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium text-[15px] tracking-tight transition-all duration-300",
                        isActive && "drop-shadow-sm font-semibold",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {isActive && <ChevronRight className="w-4 h-4 text-purple-300 relative z-10 animate-pulse-subtle" />}

                  {/* Subtle border */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl border transition-all duration-500",
                      isActive ? "border-purple-400/20" : "border-transparent group-hover:border-white/[0.08]",
                    )}
                  ></div>
                </Link>
              )
            })}
          </nav>

          {/* Section Divider */}
          <div className="px-6 py-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-4 px-4">Tools</p>
          </div>

          {/* Tools Navigation */}
          <nav className="px-6 space-y-1">
            {toolItems.map((item, index) => {
              const isActive = pathname === item.href
              const isHovered = hoveredItem === item.name

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-2xl relative overflow-hidden",
                    "transform transition-all duration-500 ease-out",
                    "hover:translate-x-1",
                    isActive
                      ? "premium-nav-active text-white shadow-2xl shadow-purple-500/20 translate-x-1"
                      : "text-gray-400 hover:premium-nav-hover hover:text-gray-200",
                  )}
                  style={{
                    animationDelay: `${(mainItems.length + index) * 100}ms`,
                    animation: mounted ? "slideInLeft 0.6s ease-out forwards" : "none",
                  }}
                >
                  {/* Active state background */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-violet-500/20 to-purple-600/30 rounded-2xl"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-400 to-violet-500 rounded-r-full shadow-lg shadow-purple-400/50"></div>
                    </>
                  )}

                  {/* Hover state background */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] rounded-2xl transition-all duration-300"></div>
                  )}

                  <div className="flex items-center relative z-10">
                    <item.icon
                      className={cn(
                        "mr-4 flex-shrink-0 h-4 w-4 transition-all duration-500",
                        "group-hover:scale-110",
                        isActive
                          ? "text-purple-300 drop-shadow-lg"
                          : "text-gray-500 group-hover:text-gray-300 group-hover:drop-shadow-sm",
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium text-sm tracking-tight transition-all duration-300",
                        isActive && "drop-shadow-sm font-semibold",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {isActive && <ChevronRight className="w-3 h-3 text-purple-300 relative z-10 animate-pulse-subtle" />}

                  {/* Subtle border */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl border transition-all duration-500",
                      isActive ? "border-purple-400/20" : "border-transparent group-hover:border-white/[0.06]",
                    )}
                  ></div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Profile Section */}
          <div className="px-6 pb-8 mt-auto">
            <div className="premium-profile-card p-5 rounded-3xl transition-all duration-500 hover:premium-profile-hover hover:scale-[1.02] group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 transition-all duration-500 group-hover:shadow-purple-500/50 group-hover:scale-105">
                    <span className="text-white text-lg font-bold tracking-tight">AS</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 shadow-sm animate-pulse-slow"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">Autonomous Studios</p>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Enterprise Plan</p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
