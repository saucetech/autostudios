"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

// ... existing interfaces and data ...

interface Activity {
  id: string
  workflow: string
  action: string
  status: "success" | "pending" | "warning" | "error"
  timestamp: string
  details?: string
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      workflow: "Lead Generation Agent",
      action: "Generated 15 new qualified leads",
      status: "success",
      timestamp: "2 minutes ago",
      details: "From LinkedIn and industry databases",
    },
    {
      id: "2",
      workflow: "Social Media Content Researcher",
      action: "Content ideas generated for next week",
      status: "success",
      timestamp: "15 minutes ago",
      details: "5 trending topics identified",
    },
    {
      id: "3",
      workflow: "Email Marketing Automation",
      action: "Campaign sent to 1,247 subscribers",
      status: "success",
      timestamp: "1 hour ago",
      details: "Open rate: 34.2%",
    },
    {
      id: "4",
      workflow: "Market Analysis & Insights",
      action: "Weekly report generation",
      status: "pending",
      timestamp: "2 hours ago",
      details: "Processing competitor data",
    },
    {
      id: "5",
      workflow: "Content Generator & Optimizer",
      action: "SEO optimization failed",
      status: "error",
      timestamp: "3 hours ago",
      details: "API rate limit exceeded",
    },
  ]

  // ... existing functions ...

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-400" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "warning":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="glass-card border-white/20 bg-white/[0.08]">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-4 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] transition-all duration-200 border border-white/10"
          >
            <div className="flex-shrink-0 mt-0.5">{getStatusIcon(activity.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-white">{activity.workflow}</p>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium flex-shrink-0 ${getStatusColor(activity.status)}`}
                >
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-200 mt-1 font-medium">{activity.action}</p>
              {activity.details && <p className="text-xs text-gray-300 mt-1">{activity.details}</p>}
              <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
