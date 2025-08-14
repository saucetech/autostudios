"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Users, TrendingUp, Mail, Calendar, FileText, Play, Settings, BarChart3 } from "lucide-react"

interface Workflow {
  id: string
  name: string
  description: string
  icon: any
  status: "active" | "inactive" | "running"
  lastRun: string
  successRate: string
  category: string
}

export function WorkflowGrid() {
  const workflows: Workflow[] = [
    {
      id: "social-media",
      name: "Social Media Content Researcher",
      description: "Automatically research trending topics and generate content ideas for your social media channels",
      icon: Share2,
      status: "active",
      lastRun: "2 hours ago",
      successRate: "98%",
      category: "Content",
    },
    {
      id: "lead-generation",
      name: "Lead Generation Agent",
      description: "Identify and qualify potential leads from multiple sources and databases",
      icon: Users,
      status: "active",
      lastRun: "30 minutes ago",
      successRate: "94%",
      category: "Sales",
    },
    {
      id: "market-analysis",
      name: "Market Analysis & Insights",
      description: "Analyze market trends, competitor data, and provide actionable business insights",
      icon: TrendingUp,
      status: "running",
      lastRun: "Running now",
      successRate: "96%",
      category: "Analytics",
    },
    {
      id: "email-automation",
      name: "Email Marketing Automation",
      description: "Create personalized email campaigns and automate follow-up sequences",
      icon: Mail,
      status: "active",
      lastRun: "1 hour ago",
      successRate: "99%",
      category: "Marketing",
    },
    {
      id: "meeting-scheduler",
      name: "Smart Meeting Scheduler",
      description: "Automatically schedule meetings, send reminders, and manage calendar conflicts",
      icon: Calendar,
      status: "active",
      lastRun: "15 minutes ago",
      successRate: "97%",
      category: "Productivity",
    },
    {
      id: "content-generator",
      name: "Content Generator & Optimizer",
      description: "Generate SEO-optimized content for blogs, websites, and marketing materials",
      icon: FileText,
      status: "inactive",
      lastRun: "3 days ago",
      successRate: "95%",
      category: "Content",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "running":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleRunWorkflow = async (workflowId: string) => {
    // This would integrate with your n8n API
    console.log(`Running workflow: ${workflowId}`)
    // Example API call:
    // await fetch(`${process.env.NEXT_PUBLIC_N8N_BASE_URL}/webhook/${workflowId}`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.N8N_API_KEY}` }
    // })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">AI Workflows</h2>
        <Button
          variant="outline"
          className="border-purple-400/40 text-purple-300 hover:bg-purple-500/20 bg-white/[0.05] hover:text-purple-200 w-fit"
        >
          <Settings className="w-4 h-4 mr-2" />
          Manage Workflows
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {workflows.map((workflow) => (
          <Card
            key={workflow.id}
            className="glass-card border-white/20 hover:border-purple-400/40 transition-all duration-200 bg-white/[0.08] hover:bg-white/[0.12] flex flex-col h-full"
          >
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/30">
                    <workflow.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-sm font-semibold leading-tight">{workflow.name}</CardTitle>
                    <Badge variant="outline" className={`text-xs mt-2 font-medium ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
              <p className="text-gray-200 text-sm leading-relaxed flex-1">{workflow.description}</p>

              <div className="flex justify-between text-xs text-gray-300 font-medium pt-2 border-t border-white/10">
                <span>Last run: {workflow.lastRun}</span>
                <span>Success: {workflow.successRate}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                  onClick={() => handleRunWorkflow(workflow.id)}
                  disabled={workflow.status === "running"}
                >
                  <Play className="w-3 h-3 mr-1" />
                  {workflow.status === "running" ? "Running..." : "Run Now"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-gray-300 hover:text-white hover:bg-white/10 bg-white/[0.05]"
                >
                  <BarChart3 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
