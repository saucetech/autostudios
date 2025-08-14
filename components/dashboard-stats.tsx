"use client"

import { TrendingUp, Clock, Zap, DollarSign } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      change: "+3 this month",
      icon: Zap,
      color: "text-green-400",
    },
    {
      title: "Time Saved",
      value: "247h",
      change: "+18% vs last month",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Cost Savings",
      value: "$15,420",
      change: "+22% vs last month",
      icon: DollarSign,
      color: "text-purple-400",
    },
    {
      title: "Efficiency Gain",
      value: "34%",
      change: "+5% vs last month",
      icon: TrendingUp,
      color: "text-pink-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="glass-card rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
            <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
