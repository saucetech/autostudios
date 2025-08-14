"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { NotionEditor } from "@/components/ui/editor"
import { ContentKanban } from "@/components/content-kanban"
import {
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Play,
  RefreshCw,
  Plus,
  Search,
  Calendar,
  BarChart3,
  Zap,
  Target,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Settings,
  Kanban,
  X,
  Info,
  Facebook,
  Pin,
  Gamepad2,
  Cloud,
  MessageSquare,
  Globe,
  ArrowLeft,
} from "lucide-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface SocialChannel {
  id: string
  platform: "youtube" | "instagram" | "twitter" | "linkedin" | "tiktok"
  username: string
  displayName: string
  followers: number
  isVerified: boolean
  isConnected: boolean
  lastSync: string
  engagementRate: number
}

interface Competitor {
  id: string
  name: string
  platform: "youtube" | "instagram" | "twitter" | "linkedin" | "tiktok"
  username: string
  followers: number
  engagementRate: number
  topContentCount: number
  status: "active" | "analyzing" | "error" | "pending"
  lastAnalyzed: string
  isAutoDiscovered: boolean
}

interface ContentAnalysis {
  id: string
  title: string
  platform: "youtube" | "instagram" | "twitter" | "linkedin" | "tiktok"
  competitor: string
  thumbnail: string
  views: number
  likes: number
  comments: number
  shares: number
  engagementRate: number
  hook: string
  viralFramework: string
  angles: string[]
  publishedDate: string
  analysisScore: number
  url: string
}

interface TrendKeyword {
  id: string
  keyword: string
  searchVolume: number
  trend: "rising" | "stable" | "declining"
  competition: "low" | "medium" | "high"
  opportunity: number
  relatedKeywords: string[]
}

interface ScriptOption {
  id: string
  title: string
  framework: string
  content: string
  preview: string
  score: number
}

interface HookOption {
  id: string
  text: string
  type: string
  score: number
}

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: Play,
  facebook: Facebook,
  pinterest: Pin,
  twitch: Gamepad2,
  threads: MessageCircle,
  bluesky: Cloud,
  reddit: MessageSquare,
  google: Globe,
}

const platformColors = {
  youtube: "text-red-500",
  instagram: "text-pink-500",
  twitter: "text-blue-500",
  linkedin: "text-blue-600",
  tiktok: "text-black",
  facebook: "text-blue-600",
  pinterest: "text-red-600",
  twitch: "text-purple-500",
  threads: "text-gray-400",
  bluesky: "text-sky-500",
  reddit: "text-orange-500",
  google: "text-green-500",
}

const platformDescriptions = {
  youtube: "Measure, programme and move forward",
  instagram: "Analyze your Instagram account",
  twitter: "Measure and publish tweets",
  linkedin: "Analyze and schedule your personal or company profile",
  tiktok: "Growing on TikTok",
  facebook: "Manage Facebook like a pro",
  pinterest: "Get growing on Pinterest",
  twitch: "Analyse your channel and competitors",
  threads: "Schedule and analyze Threads",
  bluesky: "Schedule and plan",
  reddit: "Engage with communities and track discussions",
  google: "Schedule and answer reviews",
}

export default function SocialMediaAgentPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isScriptEditorOpen, setIsScriptEditorOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentAnalysis | null>(null)
  const [selectedAngle, setSelectedAngle] = useState<string>("")
  const [isScriptGeneratorOpen, setIsScriptGeneratorOpen] = useState(false)
  const [generatedHooks, setGeneratedHooks] = useState<HookOption[]>([])
  const [generatedScripts, setGeneratedScripts] = useState<ScriptOption[]>([])
  const [selectedHook, setSelectedHook] = useState<string>("")
  const [selectedScript, setSelectedScript] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<"hook" | "script">("hook")

  const [showAddChannelModal, setShowAddChannelModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [channelCredentials, setChannelCredentials] = useState({
    username: "",
    accessToken: "",
    refreshToken: "",
    apiKey: "",
    apiSecret: "",
    clientId: "",
    clientSecret: "",
  })

  const [socialChannels, setSocialChannels] = useState<SocialChannel[]>([
    {
      id: "1",
      platform: "youtube",
      username: "@yourcompany",
      displayName: "Your Company",
      followers: 125000,
      isVerified: true,
      isConnected: true,
      lastSync: "2 minutes ago",
      engagementRate: 4.2,
    },
    {
      id: "2",
      platform: "instagram",
      username: "@yourcompany",
      displayName: "Your Company",
      followers: 89000,
      isVerified: false,
      isConnected: true,
      lastSync: "5 minutes ago",
      engagementRate: 3.8,
    },
  ])

  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: "1",
      name: "TechCorp Solutions",
      platform: "youtube",
      username: "@techcorp",
      followers: 250000,
      engagementRate: 5.2,
      topContentCount: 15,
      status: "active",
      lastAnalyzed: "1 hour ago",
      isAutoDiscovered: true,
    },
    {
      id: "2",
      name: "Innovation Labs",
      platform: "youtube",
      username: "@innovationlabs",
      followers: 180000,
      engagementRate: 4.8,
      topContentCount: 12,
      status: "analyzing",
      lastAnalyzed: "3 hours ago",
      isAutoDiscovered: false,
    },
  ])

  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis[]>([
    {
      id: "1",
      title: "How AI Will Transform Your Business in 2024",
      platform: "youtube",
      competitor: "TechCorp Solutions",
      thumbnail: "/placeholder.svg?height=120&width=200&text=AI+Business+2024",
      views: 1200000,
      likes: 45000,
      comments: 2800,
      shares: 1200,
      engagementRate: 4.1,
      hook: "Most businesses will fail in 2024 if they ignore this...",
      viralFramework: "Problem-Solution-Proof",
      angles: ["Fear-based urgency", "Future prediction", "Business transformation"],
      publishedDate: "2024-01-15",
      analysisScore: 92,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "2",
      title: "5 Automation Tools That Saved Me 40 Hours Per Week",
      platform: "youtube",
      competitor: "Innovation Labs",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Automation+Tools",
      views: 850000,
      likes: 32000,
      comments: 1900,
      shares: 890,
      engagementRate: 4.3,
      hook: "I was working 80-hour weeks until I discovered these 5 tools...",
      viralFramework: "Personal Story-List-Results",
      angles: ["Personal transformation", "Productivity hacks", "Tool recommendations"],
      publishedDate: "2024-01-12",
      analysisScore: 88,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ])

  const [trendKeywords, setTrendKeywords] = useState<TrendKeyword[]>([
    {
      id: "1",
      keyword: "AI automation tools",
      searchVolume: 45000,
      trend: "rising",
      competition: "medium",
      opportunity: 78,
      relatedKeywords: ["business automation", "AI productivity", "workflow automation"],
    },
    {
      id: "2",
      keyword: "social media marketing",
      searchVolume: 89000,
      trend: "stable",
      competition: "high",
      opportunity: 45,
      relatedKeywords: ["content marketing", "digital marketing", "social strategy"],
    },
    {
      id: "3",
      keyword: "voice AI assistants",
      searchVolume: 23000,
      trend: "rising",
      competition: "low",
      opportunity: 85,
      relatedKeywords: ["conversational AI", "voice bots", "AI customer service"],
    },
  ])

  const [newCompetitor, setNewCompetitor] = useState({
    name: "",
    platform: "youtube" as const,
    username: "",
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const supabase = useSupabaseClient()
  const router = useRouter()

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleAddChannel = async () => {
    try {
      // Here you would typically make an API call to save the credentials
      const newChannel = {
        id: Date.now().toString(),
        platform: selectedPlatform as keyof typeof platformIcons,
        username: channelCredentials.username,
        displayName: channelCredentials.username,
        followers: 0,
        isVerified: false,
        isConnected: false,
        lastSync: "Never",
        engagementRate: 0,
      }

      setSocialChannels([...socialChannels, newChannel])
      setShowAddChannelModal(false)
      setSelectedPlatform("")
      setChannelCredentials({
        username: "",
        accessToken: "",
        refreshToken: "",
        apiKey: "",
        apiSecret: "",
        clientId: "",
        clientSecret: "",
      })
    } catch (error) {
      console.error("Error adding channel:", error)
    }
  }

  const addCompetitor = () => {
    if (newCompetitor.name && newCompetitor.username) {
      const competitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitor.name,
        platform: newCompetitor.platform,
        username: newCompetitor.username,
        followers: 0,
        engagementRate: 0,
        topContentCount: 0,
        status: "pending",
        lastAnalyzed: "Never",
        isAutoDiscovered: false,
      }
      setCompetitors([...competitors, competitor])
      setNewCompetitor({ name: "", platform: "youtube", username: "" })
    }
  }

  const analyzeCompetitor = async (competitorId: string) => {
    setIsAnalyzing(true)
    // Simulate API call to n8n webhook
    setTimeout(() => {
      setCompetitors(
        competitors.map((comp) => (comp.id === competitorId ? { ...comp, status: "analyzing" as const } : comp)),
      )
      setIsAnalyzing(false)
    }, 1000)
  }

  const generateThumbnail = async (contentId: string) => {
    // Simulate API call to n8n webhook for thumbnail generation
    console.log("Generating new thumbnail for content:", contentId)
  }

  const generateScript = (content: ContentAnalysis, angle: string) => {
    setSelectedContent(content)
    setSelectedAngle(angle)
    setIsScriptEditorOpen(true)
  }

  const closeScriptEditor = () => {
    setIsScriptEditorOpen(false)
    setSelectedContent(null)
    setSelectedAngle("")
  }

  const saveScript = (scriptContent: string, title: string) => {
    // Here you would typically save to your content management system
    console.log("Saving script:", { title, content: scriptContent, angle: selectedAngle })
    closeScriptEditor()
  }

  const generateInitialScript = (content: ContentAnalysis, angle: string) => {
    return `<h1>${content.title} - ${angle} Angle</h1>

<h2>Hook</h2>
<p><strong>"${content.hook}"</strong></p>

<h2>Viral Framework: ${content.viralFramework}</h2>

<h3>Opening (0-15 seconds)</h3>
<p>Start with the hook that grabbed attention in the original video. Create urgency and curiosity.</p>

<h3>Problem/Story (15-45 seconds)</h3>
<p>Expand on the problem or story that resonates with your audience. Use the ${angle.toLowerCase()} approach.</p>

<h3>Solution/Value (45-90 seconds)</h3>
<p>Present your solution or main content. Break it down into digestible points.</p>

<h3>Proof/Results (90-120 seconds)</h3>
<p>Show evidence, results, or testimonials that support your claims.</p>

<h3>Call to Action (120+ seconds)</h3>
<p>Clear next step for viewers - subscribe, visit website, download resource, etc.</p>

<h2>Key Angles to Emphasize</h2>
<ul>
${content.angles.map((a) => `<li>${a}</li>`).join("")}
</ul>

<h2>Competitor Insights</h2>
<p><strong>Original by:</strong> ${content.competitor}</p>
<p><strong>Performance:</strong> ${formatNumber(content.views)} views, ${content.engagementRate}% engagement</p>
<p><strong>Analysis Score:</strong> ${content.analysisScore}% match to viral patterns</p>

<hr>

<p><em>Generated from viral content analysis. Customize this script to match your brand voice and unique value proposition.</em></p>`
  }

  const generateScriptFromViral = async (content: ContentAnalysis) => {
    setSelectedContent(content)
    setIsScriptGeneratorOpen(true)
    setIsGenerating(true)
    setCurrentStep("hook")
    setSelectedHook("")
    setSelectedScript("")

    try {
      // Simulate API call to generate hooks
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate 3 hook options
      const hooks: HookOption[] = [
        {
          id: "1",
          text: `${content.hook.split(" ").slice(0, 8).join(" ")}... but here's what they missed`,
          type: "Curiosity Gap",
          score: 92,
        },
        {
          id: "2",
          text: `I tried ${content.competitor}'s strategy and got ${Math.floor(Math.random() * 50 + 50)}% better results`,
          type: "Personal Experience",
          score: 88,
        },
        {
          id: "3",
          text: `Everyone's copying ${content.competitor}, but this approach is 10x better`,
          type: "Contrarian",
          score: 85,
        },
      ]

      setGeneratedHooks(hooks)
    } catch (error) {
      console.error("Error generating hooks:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateScriptsForHook = async (hookId: string) => {
    const selectedHookData = generatedHooks.find((h) => h.id === hookId)
    if (!selectedHookData || !selectedContent) return

    setIsGenerating(true)
    setCurrentStep("script")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate 3 script options based on the selected hook
      const scripts: ScriptOption[] = [
        {
          id: "1",
          title: `${selectedContent.title} - Enhanced Version`,
          framework: "Problem-Agitation-Solution",
          content: generateScriptContent(selectedContent, selectedHookData, "Problem-Agitation-Solution"),
          preview:
            "Start with the problem, agitate the pain points, then present your solution with clear benefits and social proof.",
          score: 94,
        },
        {
          id: "2",
          title: `${selectedContent.title} - Personal Story`,
          framework: "Story-Lesson-Application",
          content: generateScriptContent(selectedContent, selectedHookData, "Story-Lesson-Application"),
          preview:
            "Share a personal experience, extract the key lesson, then show how others can apply it to their situation.",
          score: 91,
        },
        {
          id: "3",
          title: `${selectedContent.title} - Contrarian Take`,
          framework: "Myth-Truth-Proof",
          content: generateScriptContent(selectedContent, selectedHookData, "Myth-Truth-Proof"),
          preview:
            "Challenge common beliefs, reveal the truth behind the myth, then provide evidence and proof points.",
          score: 89,
        },
      ]

      setGeneratedScripts(scripts)
    } catch (error) {
      console.error("Error generating scripts:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleHookSelection = (hookId: string) => {
    setSelectedHook(hookId)
    generateScriptsForHook(hookId)
  }

  const generateScriptContent = (content: ContentAnalysis, hook: HookOption, framework: string) => {
    return `<h1>${content.title} - AI Generated Script</h1>

<h2>Hook (0-5 seconds)</h2>
<p><strong>"${hook.text}"</strong></p>
<p><em>Hook Type: ${hook.type} | Viral Score: ${hook.score}%</em></p>

<h2>Framework: ${framework}</h2>

<h3>Opening (5-15 seconds)</h3>
<p>Expand on the hook with context from the original viral content. Reference the competitor insight: "${content.competitor}" achieved ${formatNumber(content.views)} views with their approach.</p>

<h3>Main Content (15-90 seconds)</h3>
<p>Core message based on viral framework: <strong>${content.viralFramework}</strong></p>
<ul>
${content.angles.map((angle) => `<li><strong>${angle}:</strong> Elaborate on this angle with your unique perspective</li>`).join("")}
</ul>

<h3>Proof/Results (90-120 seconds)</h3>
<p>Show evidence and results. Reference the original's performance metrics:</p>
<ul>
<li>Original engagement rate: ${content.engagementRate}%</li>
<li>Analysis score: ${content.analysisScore}% viral pattern match</li>
<li>Your improved approach and expected results</li>
</ul>

<h3>Call to Action (120+ seconds)</h3>
<p>Clear next step for viewers - subscribe, visit website, download resource, etc.</p>

<h2>Viral Elements to Emphasize</h2>
<ul>
<li><strong>Hook:</strong> ${hook.text}</li>
<li><strong>Framework:</strong> ${framework}</li>
<li><strong>Key Angles:</strong> ${content.angles.join(", ")}</li>
</ul>

<h2>Competitor Analysis</h2>
<p><strong>Based on:</strong> ${content.competitor} - "${content.title}"</p>
<p><strong>Original Performance:</strong> ${formatNumber(content.views)} views, ${content.engagementRate}% engagement</p>
<p><strong>Viral Score:</strong> ${content.analysisScore}% match to viral patterns</p>

<hr>
<p><em>Generated by AI from viral content analysis. Customize to match your brand voice and unique value proposition.</em></p>`
  }

  const saveScriptToPipeline = async () => {
    if (!selectedScript || !selectedHook || !selectedContent) return

    const script = generatedScripts.find((s) => s.id === selectedScript)
    const hook = generatedHooks.find((h) => h.id === selectedHook)

    if (!script || !hook) return

    try {
      // Save to Supabase content_items table
      const { data, error } = await supabase.from("content_items").insert({
        title: script.title,
        description: `AI-generated script based on viral content from ${selectedContent.competitor}`,
        content: script.content,
        type: "script",
        status: "ideas",
        priority: "medium",
        viral_hook: hook.text,
        viral_framework: script.framework,
        viral_angles: selectedContent.angles,
        viral_competitor: selectedContent.competitor,
        viral_analysis_score: script.score,
        predicted_engagement: script.score / 10,
        audience_match: selectedContent.analysisScore,
        tags: ["AI Generated", "Viral Analysis", selectedContent.platform, ...selectedContent.angles],
      })

      if (error) throw error

      // Close dialog and show success
      setIsScriptGeneratorOpen(false)
      setSelectedContent(null)
      setSelectedHook("")
      setSelectedScript("")
      setGeneratedHooks([])
      setGeneratedScripts([])

      // You could add a toast notification here
      console.log("Script saved to content pipeline:", data)
    } catch (error) {
      console.error("Error saving script:", error)
    }
  }

  const analyzeVideo = async (content: any) => {
    try {
      setIsAnalyzing(true)

      const response = await fetch("/api/analyze-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: content.url,
          platform: content.platform,
          contentId: content.id,
          title: content.title,
          hook: content.hook,
          viralFramework: content.viralFramework,
          metrics: {
            views: content.views,
            likes: content.likes,
            comments: content.comments,
            shares: content.shares,
            engagementRate: content.engagementRate,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze video")
      }

      const result = await response.json()

      // Show success message
      toast({
        title: "Video Analysis Started",
        description: "AI is analyzing the video. Results will appear in your content pipeline shortly.",
      })
    } catch (error) {
      console.error("Error analyzing video:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to start video analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card-strong rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-white mb-4 tracking-tight">Social Media Agent</h1>
            <p className="text-gray-100 text-lg leading-relaxed max-w-3xl">
              Analyze competitors, discover viral content patterns, and automate your social media strategy with
              AI-powered insights.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass-card p-1.5 h-auto border border-white/20 bg-black/40 backdrop-blur-xl">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            Social Channels
          </TabsTrigger>
          <TabsTrigger
            value="competitors"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            Competitors
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            Content Analysis
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            Trend Reports
          </TabsTrigger>
          <TabsTrigger
            value="content-pipeline"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 px-6 py-3 font-medium"
          >
            <Kanban className="w-4 h-4 mr-2" />
            Content Pipeline
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Connected Channels</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {socialChannels.filter((c) => c.isConnected).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Active Competitors</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {competitors.filter((c) => c.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Content Analyzed</p>
                    <p className="text-2xl font-bold text-white mt-1">{contentAnalysis.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-200 text-sm font-medium">Trending Keywords</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {trendKeywords.filter((k) => k.trend === "rising").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-200">
                Latest updates from your social media analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Competitor analysis completed</p>
                  <p className="text-gray-200 text-sm">TechCorp Solutions - 15 new viral videos analyzed</p>
                </div>
                <span className="text-gray-300 text-sm">2 min ago</span>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">New trending keyword detected</p>
                  <p className="text-gray-200 text-sm">"Voice AI assistants" showing 85% opportunity score</p>
                </div>
                <span className="text-gray-300 text-sm">1 hour ago</span>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Content insights generated</p>
                  <p className="text-gray-200 text-sm">5 new viral frameworks identified from competitor analysis</p>
                </div>
                <span className="text-gray-300 text-sm">3 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Connected Social Channels</CardTitle>
              <CardDescription className="text-gray-200">
                Manage your social media accounts and monitor their performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialChannels.map((channel) => {
                const PlatformIcon = platformIcons[channel.platform]
                return (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center`}>
                        <PlatformIcon className={`w-6 h-6 ${platformColors[channel.platform]}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-medium">{channel.displayName}</h3>
                          {channel.isVerified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                        </div>
                        <p className="text-gray-200 text-sm">{channel.username}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-gray-300 text-xs">{formatNumber(channel.followers)} followers</span>
                          <span className="text-gray-300 text-xs">{channel.engagementRate}% engagement</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={channel.isConnected ? "default" : "secondary"} className="mb-1">
                          {channel.isConnected ? "Connected" : "Disconnected"}
                        </Badge>
                        <p className="text-gray-300 text-xs">Last sync: {channel.lastSync}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                )
              })}

              {/* Add New Channel */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/30 transition-colors">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white font-medium mb-2">Connect New Channel</h3>
                <p className="text-gray-200 text-sm mb-4">Add another social media account to analyze</p>
                <Button
                  onClick={() => setShowAddChannelModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Channel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          {/* Add Competitor */}
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Add Competitor</CardTitle>
              <CardDescription className="text-gray-200">
                Manually add competitors or let AI discover them automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="competitor-name" className="text-gray-300">
                    Company Name
                  </Label>
                  <Input
                    id="competitor-name"
                    placeholder="Enter company name"
                    value={newCompetitor.name}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="competitor-platform" className="text-gray-300">
                    Platform
                  </Label>
                  <Select
                    value={newCompetitor.platform}
                    onValueChange={(value: any) => setNewCompetitor({ ...newCompetitor, platform: value })}
                  >
                    <SelectTrigger className="bg-black/40 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="competitor-username" className="text-gray-300">
                    Username
                  </Label>
                  <Input
                    id="competitor-username"
                    placeholder="@username"
                    value={newCompetitor.username}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, username: e.target.value })}
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={addCompetitor}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Competitor
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-Discover
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Competitor Analysis</CardTitle>
              <CardDescription className="text-gray-200">
                Monitor and analyze your competitors' social media performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {competitors.map((competitor) => {
                const PlatformIcon = platformIcons[competitor.platform]
                const statusColors = {
                  active: "text-green-400 bg-green-500/20",
                  analyzing: "text-yellow-400 bg-yellow-500/20",
                  error: "text-red-400 bg-red-500/20",
                  pending: "text-gray-400 bg-gray-500/20",
                }

                return (
                  <div
                    key={competitor.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-white/20"
                    onClick={() => router.push(`/dashboard/competitors/${competitor.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${platformColors[competitor.platform]}`}>
                        <PlatformIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{competitor.name}</h4>
                        <p className="text-sm text-gray-400">{competitor.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">
                          {competitor.followers >= 1000000
                            ? `${(competitor.followers / 1000000).toFixed(1)}M`
                            : `${(competitor.followers / 1000).toFixed(0)}K`}
                        </p>
                        <p className="text-xs text-gray-400">{competitor.engagementRate}% engagement</p>
                      </div>
                      <Badge className={statusColors[competitor.status]}>{competitor.status}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/dashboard/competitors/${competitor.id}`)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Analysis Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Viral Content Analysis</CardTitle>
              <CardDescription className="text-gray-200">
                Discover what makes your competitors' content go viral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contentAnalysis.map((content) => {
                const PlatformIcon = platformIcons[content.platform]
                return (
                  <div key={content.id} className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <img
                          src={content.thumbnail || "/placeholder.svg"}
                          alt={content.title}
                          className="w-full lg:w-48 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <PlatformIcon className={`w-4 h-4 ${platformColors[content.platform]}`} />
                            <span className="text-gray-200 text-sm">{content.competitor}</span>
                            <Badge className="bg-green-500/30 text-green-200 border-green-400/50 font-medium">
                              {content.analysisScore}% Match
                            </Badge>
                          </div>
                          <h3 className="text-white font-medium text-lg mb-2">{content.title}</h3>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">{formatNumber(content.views)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">{formatNumber(content.likes)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">{formatNumber(content.comments)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Share2 className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">{formatNumber(content.shares)}</span>
                            </div>
                          </div>

                          {/* Engagement Rate */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-200 text-sm">Engagement Rate</span>
                              <span className="text-white text-sm">{content.engagementRate}%</span>
                            </div>
                            <Progress value={content.engagementRate * 20} className="h-2" />
                          </div>
                        </div>

                        {/* Analysis Details */}
                        <div className="space-y-3">
                          <div>
                            <Label className="text-gray-300 text-sm">Hook</Label>
                            <p className="text-white text-sm bg-white/5 p-3 rounded-lg mt-1">"{content.hook}"</p>
                          </div>

                          <div>
                            <Label className="text-gray-300 text-sm">Viral Framework</Label>
                            <Badge className="bg-purple-500/20 text-purple-400 mt-1">{content.viralFramework}</Badge>
                          </div>

                          <div>
                            <Label className="text-gray-300 text-sm">Content Angles</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {content.angles.map((angle, index) => (
                                <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                                  {angle}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                          <Button
                            onClick={() => generateScriptFromViral(content)}
                            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Create Script
                          </Button>

                          <Button
                            size="sm"
                            onClick={() => generateThumbnail(content.id)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Thumbnail
                          </Button>

                          <Button
                            size="sm"
                            onClick={() => analyzeVideo(content)}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Analyze Video
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(content.url, "_blank")}
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Original
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Trending Keywords</CardTitle>
              <CardDescription className="text-gray-200">
                Monitor keyword trends and discover content opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendKeywords.map((keyword) => {
                const TrendIcon =
                  keyword.trend === "rising" ? TrendingUp : keyword.trend === "declining" ? TrendingDown : Minus
                const trendColors = {
                  rising: "text-green-400",
                  declining: "text-red-400",
                  stable: "text-gray-400",
                }
                const competitionColors = {
                  low: "text-green-400 bg-green-500/20",
                  medium: "text-yellow-400 bg-yellow-500/20",
                  high: "text-red-400 bg-red-500/20",
                }

                return (
                  <div
                    key={keyword.id}
                    className="flex items-center justify-between p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-medium">{keyword.keyword}</h3>
                        <TrendIcon className={`w-4 h-4 ${trendColors[keyword.trend]}`} />
                        <Badge className={competitionColors[keyword.competition]}>
                          {keyword.competition} competition
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-gray-200 text-sm">Search Volume</span>
                          <p className="text-white font-medium">{formatNumber(keyword.searchVolume)}/month</p>
                        </div>
                        <div>
                          <span className="text-gray-200 text-sm">Opportunity Score</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={keyword.opportunity} className="flex-1 h-2" />
                            <span className="text-white text-sm">{keyword.opportunity}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-200 text-sm">Trend</span>
                          <p className={`font-medium capitalize ${trendColors[keyword.trend]}`}>{keyword.trend}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-200 text-sm">Related Keywords</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {keyword.relatedKeywords.map((related, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-gray-300 text-xs">
                              {related}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Research
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>
                )
              })}

              {/* Schedule Reports */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white font-medium mb-2">Schedule Trend Reports</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Get automated reports on trending keywords and opportunities
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  Setup Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Pipeline Tab */}
        <TabsContent value="content-pipeline" className="space-y-6">
          <ContentKanban />
        </TabsContent>
      </Tabs>

      {/* Script Editor Dialog */}
      <Dialog open={isScriptEditorOpen} onOpenChange={setIsScriptEditorOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 bg-transparent border-none">
          {selectedContent && (
            <NotionEditor
              title={`${selectedContent.title} - ${selectedAngle} Script`}
              initialContent={generateInitialScript(selectedContent, selectedAngle)}
              onSave={saveScript}
              onClose={closeScriptEditor}
              className="h-full"
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isScriptGeneratorOpen} onOpenChange={setIsScriptGeneratorOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0 bg-black/95 border border-white/20 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white">AI Script Generator</h2>
                <p className="text-gray-300 text-sm mt-1">
                  {selectedContent && `Based on viral content from ${selectedContent.competitor}`}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${currentStep === "hook" ? "bg-purple-400" : "bg-green-400"}`}
                  />
                  <span className="text-xs text-gray-400">
                    {currentStep === "hook" ? "Step 1: Choose Hook" : "Step 2: Choose Script"}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsScriptGeneratorOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {currentStep === "hook" ? "Generating Hooks..." : "Generating Scripts..."}
                    </h3>
                    <p className="text-gray-300">
                      {currentStep === "hook"
                        ? "Analyzing viral patterns and creating hook options"
                        : "Creating custom scripts for your selected hook"}
                    </p>
                  </div>
                </div>
              ) : currentStep === "hook" ? (
                <div className="p-6 h-full overflow-auto">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold text-white mb-2">Choose Your Hook</h3>
                      <p className="text-gray-300">Select the hook that best captures attention for your content</p>
                    </div>
                    <div className="grid gap-4">
                      {generatedHooks.map((hook) => (
                        <div
                          key={hook.id}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedHook === hook.id
                              ? "border-purple-400 bg-purple-500/20"
                              : "border-white/20 bg-white/5 hover:bg-white/10"
                          }`}
                          onClick={() => handleHookSelection(hook.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <Badge className="bg-blue-500/20 text-blue-400">{hook.type}</Badge>
                            <span className="text-green-400 text-sm font-medium">{hook.score}%</span>
                          </div>
                          <p className="text-white font-medium text-lg">"{hook.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 h-full overflow-auto">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">Choose Your Script</h3>
                      <p className="text-gray-300">Scripts generated for your selected hook</p>
                      <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-purple-300 text-sm mb-1">Selected Hook:</p>
                        <p className="text-white font-medium">
                          "{generatedHooks.find((h) => h.id === selectedHook)?.text}"
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {generatedScripts.map((script) => (
                        <div
                          key={script.id}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedScript === script.id
                              ? "border-purple-400 bg-purple-500/20"
                              : "border-white/20 bg-white/5 hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedScript(script.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <Badge className="bg-purple-500/20 text-purple-400">{script.framework}</Badge>
                            <span className="text-green-400 text-sm font-medium">{script.score}%</span>
                          </div>
                          <h4 className="text-white font-medium text-lg mb-2">{script.title}</h4>
                          <p className="text-gray-300 text-sm">{script.preview}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentStep("hook")
                          setSelectedScript("")
                          setGeneratedScripts([])
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Hooks
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!isGenerating && currentStep === "script" && (
              <div className="flex items-center justify-between p-6 border-t border-white/20">
                <div className="text-sm text-gray-300">
                  {selectedScript ? "Ready to save to content pipeline" : "Select a script to continue"}
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsScriptGeneratorOpen(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveScriptToPipeline}
                    disabled={!selectedScript}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Save to Pipeline
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddChannelModal} onOpenChange={setShowAddChannelModal}>
        <DialogContent className="glass-card border-white/20 bg-black/90 backdrop-blur-xl text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Add Social Media Channel</DialogTitle>
            <DialogDescription className="text-gray-300">
              Connect your social media accounts to start analyzing performance and content
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <Label className="text-gray-300 text-sm font-medium">Select Platform</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {Object.entries(platformIcons).map(([platform, Icon]) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
                      selectedPlatform === platform
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${platformColors[platform as keyof typeof platformColors]}`} />
                    <div className="text-sm font-medium capitalize text-center">
                      {platform === "google" ? "Google Business" : platform}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Credentials Form */}
            {selectedPlatform && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-gray-300">
                      {selectedPlatform === "google" ? "Business Name" : "Username/Handle"}
                    </Label>
                    <Input
                      id="username"
                      placeholder={selectedPlatform === "google" ? "Your Business Name" : "@username"}
                      value={channelCredentials.username}
                      onChange={(e) => setChannelCredentials({ ...channelCredentials, username: e.target.value })}
                      className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessToken" className="text-gray-300">
                      Access Token
                    </Label>
                    <Input
                      id="accessToken"
                      type="password"
                      placeholder="Enter access token"
                      value={channelCredentials.accessToken}
                      onChange={(e) => setChannelCredentials({ ...channelCredentials, accessToken: e.target.value })}
                      className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Platform-specific fields */}
                {(selectedPlatform === "youtube" ||
                  selectedPlatform === "instagram" ||
                  selectedPlatform === "facebook" ||
                  selectedPlatform === "linkedin" ||
                  selectedPlatform === "google") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientId" className="text-gray-300">
                        Client ID
                      </Label>
                      <Input
                        id="clientId"
                        placeholder="Enter client ID"
                        value={channelCredentials.clientId}
                        onChange={(e) => setChannelCredentials({ ...channelCredentials, clientId: e.target.value })}
                        className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientSecret" className="text-gray-300">
                        Client Secret
                      </Label>
                      <Input
                        id="clientSecret"
                        type="password"
                        placeholder="Enter client secret"
                        value={channelCredentials.clientSecret}
                        onChange={(e) => setChannelCredentials({ ...channelCredentials, clientSecret: e.target.value })}
                        className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                  </div>
                )}

                {(selectedPlatform === "twitter" || selectedPlatform === "reddit") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="apiKey" className="text-gray-300">
                        API Key
                      </Label>
                      <Input
                        id="apiKey"
                        placeholder="Enter API key"
                        value={channelCredentials.apiKey}
                        onChange={(e) => setChannelCredentials({ ...channelCredentials, apiKey: e.target.value })}
                        className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apiSecret" className="text-gray-300">
                        API Secret
                      </Label>
                      <Input
                        id="apiSecret"
                        type="password"
                        placeholder="Enter API secret"
                        value={channelCredentials.apiSecret}
                        onChange={(e) => setChannelCredentials({ ...channelCredentials, apiSecret: e.target.value })}
                        className="bg-black/40 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      />
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-400 font-medium text-sm">How to get credentials</h4>
                      <p className="text-gray-300 text-sm mt-1">
                        {selectedPlatform === "youtube" &&
                          "Go to Google Cloud Console → APIs & Services → Credentials to create OAuth 2.0 credentials."}
                        {selectedPlatform === "instagram" &&
                          "Use Facebook Developer Console to create an Instagram Basic Display app and get your credentials."}
                        {selectedPlatform === "twitter" &&
                          "Visit Twitter Developer Portal to create an app and get your API keys."}
                        {selectedPlatform === "tiktok" &&
                          "Apply for TikTok for Developers and create an app to get your access token."}
                        {selectedPlatform === "facebook" &&
                          "Use Facebook Developer Console to create an app and get your credentials."}
                        {selectedPlatform === "linkedin" &&
                          "Go to LinkedIn Developer Portal to create an app and get OAuth 2.0 credentials."}
                        {selectedPlatform === "pinterest" &&
                          "Visit Pinterest Developer Portal to create an app and get your access token."}
                        {selectedPlatform === "twitch" &&
                          "Go to Twitch Developer Console to create an app and get your client credentials."}
                        {selectedPlatform === "threads" &&
                          "Use Meta Developer Portal to create a Threads app and get your credentials."}
                        {selectedPlatform === "bluesky" &&
                          "Create an app password in your Bluesky account settings for API access."}
                        {selectedPlatform === "reddit" &&
                          "Visit Reddit App Preferences to create a script app and get your API credentials."}
                        {selectedPlatform === "google" &&
                          "Go to Google My Business API in Google Cloud Console to get your credentials."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowAddChannelModal(false)}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddChannel}
              disabled={!selectedPlatform || !channelCredentials.username || !channelCredentials.accessToken}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
