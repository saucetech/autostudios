"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MoreHorizontal, Play, Pause, Settings, Trash2, BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserAutomation {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "error"
  lastRun: string
  totalRuns: number
  successRate: number
  category: string
}

export function MyAutomations() {
  const [automations, setAutomations] = useState<UserAutomation[]>([
    {
      id: "1",
      name: "LinkedIn Lead Generation",
      description: "Automatically scrape and qualify leads from LinkedIn",
      status: "active",
      lastRun: "2024-01-15T10:30:00Z",
      totalRuns: 45,
      successRate: 98,
      category: "Lead Generation",
    },
    {
      id: "2",
      name: "Instagram Content Scheduler",
      description: "Schedule and post content to Instagram automatically",
      status: "paused",
      lastRun: "2024-01-14T15:20:00Z",
      totalRuns: 32,
      successRate: 95,
      category: "Social Media",
    },
    {
      id: "3",
      name: "Email Welcome Sequence",
      description: "Send personalized welcome emails to new subscribers",
      status: "error",
      lastRun: "2024-01-15T08:45:00Z",
      totalRuns: 28,
      successRate: 92,
      category: "Email Automation",
    },
  ])

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === id
          ? { ...automation, status: automation.status === "active" ? "paused" : "active" }
          : automation,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {automations.length === 0 ? (
        <Card className="glass-card border-white/10">
          <CardContent className="p-12 text-center">
            <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No automations deployed</h3>
            <p className="text-gray-400 mb-4">Deploy your first automation from the catalog to get started.</p>
            <Button className="bg-purple-600 hover:bg-purple-700">Browse Catalog</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {automations.map((automation) => (
            <Card key={automation.id} className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center space-x-3">
                      <span>{automation.name}</span>
                      <Badge className={getStatusColor(automation.status)}>{automation.status}</Badge>
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">{automation.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/90 border-white/10">
                      <DropdownMenuItem className="text-white hover:bg-white/10">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-white/10">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Last Run</p>
                    <p className="text-white">{new Date(automation.lastRun).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Runs</p>
                    <p className="text-white">{automation.totalRuns}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Success Rate</p>
                    <p className="text-green-400">{automation.successRate}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={automation.status === "active"}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                    />
                    <span className="text-sm text-gray-300">
                      {automation.status === "active" ? "Active" : "Paused"}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/10 bg-transparent"
                  >
                    {automation.status === "active" ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
