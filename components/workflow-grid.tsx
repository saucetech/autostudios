"use client"

import { MessageSquare, Users, BarChart3, Mail, Calendar, FileText, Play, Pause, Settings } from "lucide-react"
import { useState } from "react"

export function WorkflowGrid() {
  const [loadingWorkflows, setLoadingWorkflows] = useState<Set<string>>(new Set())

  const workflows = [
    {
      id: "social-media-research",
      name: "Social Media Content Research",
      description: "Automatically research trending topics and generate content ideas",
      status: "active",
      icon: MessageSquare,
      lastRun: "2 hours ago",
      successRate: "94%",
    },
    {
      id: "lead-generation",
      name: "Lead Generation Agent",
      description: "Identify and qualify potential leads from multiple sources",
      status: "active",
      icon: Users,
      lastRun: "1 hour ago",
      successRate: "87%",
    },
    {
      id: "market-analysis",
      name: "Market Analysis & Reporting",
      description: "Generate comprehensive market analysis reports",
      status: "paused",
      icon: BarChart3,
      lastRun: "1 day ago",
      successRate: "91%",
    },
    {
      id: "email-automation",
      name: "Email Campaign Automation",
      description: "Personalized email sequences based on user behavior",
      status: "active",
      icon: Mail,
      lastRun: "30 minutes ago",
      successRate: "96%",
    },
    {
      id: "meeting-scheduler",
      name: "Smart Meeting Scheduler",
      description: "Automatically schedule and manage meetings",
      status: "active",
      icon: Calendar,
      lastRun: "45 minutes ago",
      successRate: "89%",
    },
    {
      id: "content-generator",
      name: "Content Generation Suite",
      description: "Create blog posts, social media content, and marketing copy",
      status: "active",
      icon: FileText,
      lastRun: "3 hours ago",
      successRate: "92%",
    },
  ]

  const handleRunWorkflow = async (workflowId: string) => {
    setLoadingWorkflows((prev) => new Set(prev).add(workflowId))

    try {
      const response = await fetch(`/api/workflows/${workflowId}/trigger`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          triggeredBy: "dashboard",
          timestamp: new Date().toISOString(),
        }),
      })

      const result = await response.json()

      if (result.status === "triggered") {
        // Show success message or update UI
        console.log(`Workflow ${workflowId} triggered successfully`)
      } else {
        console.error(`Failed to trigger workflow: ${result.message}`)
      }
    } catch (error) {
      console.error("Error triggering workflow:", error)
    } finally {
      setLoadingWorkflows((prev) => {
        const newSet = new Set(prev)
        newSet.delete(workflowId)
        return newSet
      })
    }
  }

  const handleToggleWorkflow = async (workflowId: string, currentStatus: string) => {
    setLoadingWorkflows((prev) => new Set(prev).add(workflowId))

    try {
      const action = currentStatus === "active" ? "deactivate" : "activate"
      const response = await fetch(`/api/workflows/${workflowId}/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      const result = await response.json()

      if (result.success) {
        // Update workflow status in UI
        console.log(`Workflow ${workflowId} ${action}d successfully`)
        // You might want to refresh the workflow data here
      } else {
        console.error(`Failed to ${action} workflow`)
      }
    } catch (error) {
      console.error("Error toggling workflow:", error)
    } finally {
      setLoadingWorkflows((prev) => {
        const newSet = new Set(prev)
        newSet.delete(workflowId)
        return newSet
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map((workflow) => {
        const isLoading = loadingWorkflows.has(workflow.id)

        return (
          <div
            key={workflow.id}
            className="glass-card rounded-lg p-6 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20">
                  <workflow.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">{workflow.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        workflow.status === "active" ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    />
                    <span className="text-xs text-gray-400 capitalize">{workflow.status}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-4">{workflow.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Last run:</span>
                <span className="text-gray-300">{workflow.lastRun}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Success rate:</span>
                <span className="text-green-400">{workflow.successRate}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {workflow.status === "active" ? (
                <button
                  onClick={() => handleToggleWorkflow(workflow.id, workflow.status)}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Pause className="w-3 h-3" />
                  )}
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={() => handleToggleWorkflow(workflow.id, workflow.status)}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                  <span>Activate</span>
                </button>
              )}
              <button
                onClick={() => handleRunWorkflow(workflow.id)}
                disabled={isLoading || workflow.status !== "active"}
                className="px-3 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Running..." : "Run Now"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
