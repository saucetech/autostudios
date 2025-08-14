import { AutomationCatalog } from "@/components/automations/automation-catalog"
import { MyAutomations } from "@/components/automations/my-automations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Plus,
  Activity,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Settings,
  Pause,
  Users,
  Target,
  Mic,
} from "lucide-react"
import Link from "next/link"

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Agents</h1>
          <p className="text-gray-400">Deploy and manage intelligent AI agents to automate your business processes.</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Agent Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Agents</p>
                <p className="text-2xl font-bold text-white mt-1">12</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                  <span className="text-emerald-400 text-sm">+3 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Tasks Completed</p>
                <p className="text-2xl font-bold text-white mt-1">1,247</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">98.2% success</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Time Saved</p>
                <p className="text-2xl font-bold text-white mt-1">847h</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-purple-400 mr-1" />
                  <span className="text-purple-400 text-sm">+23% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Cost Savings</p>
                <p className="text-2xl font-bold text-white mt-1">$24,680</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-orange-400 mr-1" />
                  <span className="text-orange-400 text-sm">+18% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Agents Overview - Replace the existing section */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Specialized AI Agents</CardTitle>
              <CardDescription className="text-gray-400">
                Manage and configure your specialized AI agents
              </CardDescription>
            </div>
            <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Agent Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Media Agent */}
          <div className="glass-card border-white/5 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Social Media Agent</h3>
                  <p className="text-gray-400">Analyze competitors and discover viral content patterns</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    <span className="text-gray-500 text-sm">Last run: 2 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/dashboard/agents/social-media">
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/5 bg-transparent">
                  <Pause className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-gray-400 text-sm">Competitors Tracked</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-gray-400 text-sm">Content Analyzed</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">89</p>
                <p className="text-gray-400 text-sm">Viral Patterns Found</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">98.2%</p>
                <p className="text-gray-400 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Coming Soon Agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lead Generation Agent */}
            <div className="glass-card border-white/5 p-6 rounded-2xl border-dashed border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center opacity-50">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold">Lead Generation Agent</h3>
                  <p className="text-gray-500 text-sm">Prospect discovery & outreach automation</p>
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 mt-2">Coming Soon</Badge>
                </div>
              </div>
              <div className="text-center py-6">
                <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent" disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Setup Agent
                </Button>
              </div>
            </div>

            {/* Voice AI Agent */}
            <div className="glass-card border-white/5 p-6 rounded-2xl border-dashed border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center opacity-50">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-400 font-semibold">Voice AI Agent</h3>
                  <p className="text-gray-500 text-sm">Call handling & appointment booking</p>
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 mt-2">Coming Soon</Badge>
                </div>
              </div>
              <div className="text-center py-6">
                <Button variant="outline" className="border-white/20 text-gray-400 bg-transparent" disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Setup Agent
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Agent Management */}
      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="glass-card border-white/10 bg-transparent">
          <TabsTrigger
            value="catalog"
            className="data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            Agent Catalog
          </TabsTrigger>
          <TabsTrigger
            value="my-agents"
            className="data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            My Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <AutomationCatalog />
        </TabsContent>

        <TabsContent value="my-agents">
          <MyAutomations />
        </TabsContent>
      </Tabs>
    </div>
  )
}
