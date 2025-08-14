"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 dashboard-header">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block group-hover:text-gray-100 transition-colors duration-300">
                Autonomous Studios
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 glass-card-strong border-white/20 shadow-xl" align="end">
                <div className="flex items-center justify-start gap-3 p-4">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-semibold text-white text-sm">{user?.user_metadata?.full_name || "User"}</p>
                    <p className="w-[180px] truncate text-sm text-gray-300">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-gray-200 hover:text-white hover:bg-white/10 rounded-lg mx-2 my-1 transition-all duration-200">
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:text-white hover:bg-white/10 rounded-lg mx-2 my-1 transition-all duration-200">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg mx-2 my-1 transition-all duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
