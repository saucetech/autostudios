"use client"

import { CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "success",
      title: "Lead Generation Agent completed successfully",
      description: "Generated 23 new qualified leads",
      timestamp: "2 minutes ago",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      id: 2,
      type: "info",
      title: "Social Media Research workflow started",
      description: "Analyzing trending topics for this week",
      timestamp: "15 minutes ago",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      id: 3,
      type: "success",
      title: "Email Campaign sent successfully",
      description: "Delivered to 1,247 subscribers with 34% open rate",
      timestamp: "1 hour ago",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      id: 4,
      type: "warning",
      title: "Market Analysis workflow needs attention",
      description: "API rate limit reached, workflow paused",
      timestamp: "2 hours ago",
      icon: AlertCircle,
      color: "text-yellow-400",
    },
    {
      id: 5,
      type: "success",
      title: "Content Generator created 5 blog posts",
      description: "All posts reviewed and ready for publishing",
      timestamp: "3 hours ago",
      icon: CheckCircle,
      color: "text-green-400",
    },
  ]

  return (
    <div className="glass-card rounded-lg border border-white/10">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-medium text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-white/10">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-white/5 transition-colors">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg bg-white/5 ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{activity.title}</p>
                <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-2">{activity.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
