"use client"

import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { WorkflowGrid } from "@/components/dashboard/workflow-grid"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Target, Mic, Users, Zap } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-8 md:space-y-10">
      {/* Welcome Section */}
      <div className="glass-card-strong rounded-2xl p-8 md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-3 tracking-tight">
              Welcome to Your AI Command Center
            </h1>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl">
              Manage and deploy your autonomous AI agents to optimize your business processes.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Quick Access to Agents */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            AI Agents
          </CardTitle>
          <CardDescription className="text-gray-400">Quick access to your specialized AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Social Media Agent */}
            <Link href="/dashboard/agents/social-media">
              <div className="group p-6 glass-card border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                      Social Media Agent
                    </h3>
                    <p className="text-gray-400 text-sm">Competitor analysis & content insights</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Competitors Tracked</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Content Analyzed</span>
                    <span className="text-white">1,247</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Placeholder for future agents */}
            <div className="p-6 glass-card border-white/10 rounded-2xl border-dashed border-white/20 hover:border-white/30 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center opacity-50">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold">Lead Generation Agent</h3>
                  <p className="text-gray-500 text-sm">Coming soon</p>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Prospect discovery & outreach automation</p>
              </div>
            </div>

            <div className="p-6 glass-card border-white/10 rounded-2xl border-dashed border-white/20 hover:border-white/30 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center opacity-50">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold">Voice AI Agent</h3>
                  <p className="text-gray-500 text-sm">Coming soon</p>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Call handling & appointment booking</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Workflows */}
      <WorkflowGrid />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
