"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Play,
  Heart,
  MessageCircle,
  TrendingUp,
  RefreshCw,
  Download,
  ExternalLink,
  Zap,
  Search,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Users,
} from "lucide-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { toast } from "@/components/ui/use-toast"

interface Competitor {
  id: string
  name: string
  platform: "youtube" | "instagram" | "twitter" | "linkedin" | "tiktok"
  username: string
  display_name: string
  followers: number
  engagement_rate: number
  is_verified: boolean
  profile_image_url?: string
  bio?: string
  website_url?: string
  status: "active" | "analyzing" | "error" | "pending" | "inactive"
  last_analyzed: string
}

interface CompetitorVideo {
  id: string
  title: string
  description?: string
  thumbnail_url?: string
  video_url: string
  duration?: number
  views: number
  likes: number
  comments: number
  shares: number
  engagement_rate: number
  published_date: string
  hook_analysis?: string
  viral_framework?: string
  viral_score?: number
  content_category?: string
  target_audience?: string
  key_topics?: string[]
  sentiment_score?: number
  view_velocity?: number
}

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: Play,
}

const platformColors = {
  youtube: "text-red-500 bg-red-500/10",
  instagram: "text-pink-500 bg-pink-500/10",
  twitter: "text-blue-500 bg-blue-500/10",
  linkedin: "text-blue-600 bg-blue-600/10",
  tiktok: "text-black bg-gray-500/10",
}

export default function CompetitorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [videos, setVideos] = useState<CompetitorVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [isScrapingVideos, setIsScrapingVideos] = useState(false)
  const [sortBy, setSortBy] = useState<string>("published_date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedVideo, setSelectedVideo] = useState<CompetitorVideo | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchCompetitorData()
      fetchVideos()
    }
  }, [params.id])

  const fetchCompetitorData = async () => {
    try {
      // Mock data for now - replace with actual Supabase query
      setCompetitor({
        id: params.id as string,
        name: "TechCorp Solutions",
        platform: "youtube",
        username: "@techcorp",
        display_name: "TechCorp Solutions",
        followers: 250000,
        engagement_rate: 5.2,
        is_verified: true,
        profile_image_url: "/placeholder.svg?height=80&width=80",
        bio: "Leading technology solutions for modern businesses. Helping companies scale with AI and automation.",
        website_url: "https://techcorp.com",
        status: "active",
        last_analyzed: "2024-01-15T10:30:00Z",
      })
    } catch (error) {
      console.error("Error fetching competitor:", error)
      toast({
        title: "Error",
        description: "Failed to load competitor data",
        variant: "destructive",
      })
    }
  }

  const fetchVideos = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual Supabase query
      const mockVideos: CompetitorVideo[] = [
        {
          id: "1",
          title: "How AI Will Transform Your Business in 2024",
          description: "Discover the latest AI trends and how they'll impact your business operations.",
          thumbnail_url: "/placeholder.svg?height=180&width=320",
          video_url: "https://youtube.com/watch?v=example1",
          duration: 720,
          views: 125000,
          likes: 8500,
          comments: 450,
          shares: 320,
          engagement_rate: 7.2,
          published_date: "2024-01-10T14:30:00Z",
          hook_analysis: "Strong problem-solution hook targeting business pain points",
          viral_framework: "Problem-Agitation-Solution",
          viral_score: 85,
          content_category: "Educational",
          target_audience: "Business Leaders",
          key_topics: ["AI", "Business Transformation", "Technology"],
          sentiment_score: 0.8,
          view_velocity: 5200,
        },
        {
          id: "2",
          title: "5 Automation Tools Every Startup Needs",
          description: "Essential automation tools that can save your startup time and money.",
          thumbnail_url: "/placeholder.svg?height=180&width=320",
          video_url: "https://youtube.com/watch?v=example2",
          duration: 480,
          views: 89000,
          likes: 6200,
          comments: 280,
          shares: 190,
          engagement_rate: 7.5,
          published_date: "2024-01-08T16:45:00Z",
          hook_analysis: "List-based hook with immediate value proposition",
          viral_framework: "Listicle",
          viral_score: 78,
          content_category: "Tutorial",
          target_audience: "Entrepreneurs",
          key_topics: ["Automation", "Startups", "Productivity"],
          sentiment_score: 0.9,
          view_velocity: 3700,
        },
      ]
      setVideos(mockVideos)
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast({
        title: "Error",
        description: "Failed to load videos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleScrapeVideos = async () => {
    setIsScrapingVideos(true)
    try {
      // Trigger n8n workflow to scrape latest videos
      const response = await fetch("/api/scrape-competitor-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competitorId: params.id,
          platform: competitor?.platform,
          username: competitor?.username,
        }),
      })

      if (response.ok) {
        toast({
          title: "Scraping Started",
          description: "Video scraping has been initiated. Results will appear shortly.",
        })
        // Refresh videos after a delay
        setTimeout(() => {
          fetchVideos()
        }, 5000)
      } else {
        throw new Error("Failed to start scraping")
      }
    } catch (error) {
      console.error("Error starting scrape:", error)
      toast({
        title: "Error",
        description: "Failed to start video scraping",
        variant: "destructive",
      })
    } finally {
      setIsScrapingVideos(false)
    }
  }

  const filteredAndSortedVideos = videos
    .filter((video) => {
      if (filterCategory !== "all" && video.content_category?.toLowerCase() !== filterCategory) {
        return false
      }
      if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof CompetitorVideo]
      let bValue: any = b[sortBy as keyof CompetitorVideo]

      if (sortBy === "published_date") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (!competitor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const PlatformIcon = platformIcons[competitor.platform]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={competitor.profile_image_url || "/placeholder.svg"}
                  alt={competitor.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${platformColors[competitor.platform]}`}>
                  <PlatformIcon className="h-3 w-3" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{competitor.name}</h1>
                <p className="text-gray-400">{competitor.username}</p>
              </div>
              {competitor.is_verified && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <Button
            onClick={handleScrapeVideos}
            disabled={isScrapingVideos}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isScrapingVideos ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isScrapingVideos ? "Scraping..." : "Scrape Latest Videos"}
          </Button>
        </div>

        {/* Competitor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Followers</p>
                  <p className="text-2xl font-bold text-white">{formatNumber(competitor.followers)}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Engagement Rate</p>
                  <p className="text-2xl font-bold text-white">{competitor.engagement_rate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Videos</p>
                  <p className="text-2xl font-bold text-white">{videos.length}</p>
                </div>
                <Play className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Viral Score</p>
                  <p className="text-2xl font-bold text-white">
                    {videos.length > 0
                      ? Math.round(videos.reduce((acc, v) => acc + (v.viral_score || 0), 0) / videos.length)
                      : 0}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="glass-card border-white/20 bg-black/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published_date">Published Date</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                    <SelectItem value="comments">Comments</SelectItem>
                    <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
                    <SelectItem value="viral_score">Viral Score</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="text-gray-400 hover:text-white"
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="text-gray-400 hover:text-white"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="text-gray-400 hover:text-white"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredAndSortedVideos.map((video) => (
              <Card
                key={video.id}
                className="glass-card border-white/20 bg-black/30 backdrop-blur-xl hover:bg-black/40 transition-all cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <CardContent className={viewMode === "grid" ? "p-0" : "p-4"}>
                  {viewMode === "grid" ? (
                    <div>
                      <div className="relative">
                        <img
                          src={video.thumbnail_url || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {video.duration && (
                          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                            {formatDuration(video.duration)}
                          </Badge>
                        )}
                        {video.viral_score && (
                          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-blue-600">
                            {video.viral_score}/100
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span>{new Date(video.published_date).toLocaleDateString()}</span>
                          <span>{formatNumber(video.views)} views</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {formatNumber(video.likes)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {formatNumber(video.comments)}
                            </span>
                          </div>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            {video.engagement_rate}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail_url || "/placeholder.svg"}
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        {video.duration && (
                          <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                            {formatDuration(video.duration)}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{formatNumber(video.views)} views</span>
                            <span>{formatNumber(video.likes)} likes</span>
                            <span>{formatNumber(video.comments)} comments</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {video.viral_score && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                                {video.viral_score}/100
                              </Badge>
                            )}
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              {video.engagement_rate}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Video Detail Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/20">
            {selectedVideo && (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">{selectedVideo.title}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Published on {new Date(selectedVideo.published_date).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedVideo.thumbnail_url || "/placeholder.svg"}
                      alt={selectedVideo.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Views</p>
                        <p className="text-lg font-semibold text-white">{formatNumber(selectedVideo.views)}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Engagement Rate</p>
                        <p className="text-lg font-semibold text-white">{selectedVideo.engagement_rate}%</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Likes</p>
                        <p className="text-lg font-semibold text-white">{formatNumber(selectedVideo.likes)}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Comments</p>
                        <p className="text-lg font-semibold text-white">{formatNumber(selectedVideo.comments)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedVideo.viral_score && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Viral Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                              style={{ width: `${selectedVideo.viral_score}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold">{selectedVideo.viral_score}/100</span>
                        </div>
                      </div>
                    )}

                    {selectedVideo.hook_analysis && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Hook Analysis</p>
                        <p className="text-white bg-white/5 p-3 rounded-lg">{selectedVideo.hook_analysis}</p>
                      </div>
                    )}

                    {selectedVideo.viral_framework && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Viral Framework</p>
                        <Badge className="bg-purple-500/20 text-purple-400">{selectedVideo.viral_framework}</Badge>
                      </div>
                    )}

                    {selectedVideo.key_topics && selectedVideo.key_topics.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Key Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedVideo.key_topics.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open(selectedVideo.video_url, "_blank")}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
