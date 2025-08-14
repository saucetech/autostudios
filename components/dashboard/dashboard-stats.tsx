"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, DollarSign, Activity } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Time Saved",
      value: "847h",
      change: "+23% this month",
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: "Cost Savings",
      value: "$24,680",
      change: "+18% this month",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      gradient: "from-green-500/20 to-emerald-600/20",
    },
    {
      title: "Success Rate",
      value: "98.2%",
      change: "+0.5% this week",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      gradient: "from-purple-500/20 to-pink-600/20",
    },
    {
      title: "Active Workflows",
      value: "12",
      change: "+2 this week",
      icon: Activity,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      gradient: "from-emerald-500/20 to-teal-600/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="dashboard-card hover:scale-105 transition-all duration-300 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
              {stat.title}
            </CardTitle>
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <p className="text-sm font-medium text-green-300">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
