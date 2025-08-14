"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Upload,
  Search,
  Filter,
  Plus,
  Mic,
  Send,
  FileText,
  ImageIcon,
  Video,
  Music,
  Cloud,
  Link,
  Globe,
  Database,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Brain,
  Star,
  List,
  MessageSquare,
  Archive,
  X,
  Grid,
  Download,
  Share2,
  Eye,
  Tag,
  FolderPlus,
  Loader2,
  Lightbulb,
  Network,
  Activity,
  Cpu,
} from "lucide-react"

interface KnowledgeFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: "processing" | "ready" | "error" | "summarizing" | "analyzing"
  source: "upload" | "drive" | "dropbox" | "notion" | "link" | "youtube"
  tags: string[]
  preview?: string
  metadata?: {
    pages?: number
    duration?: number
    wordCount?: number
    language?: string
    author?: string
  }
  isFavorite?: boolean
  lastAccessed?: Date
  aiSummary?: string
  keyInsights?: string[]
  relatedFiles?: string[]
  annotations?: Annotation[]
  collections?: string[]
  version?: number
  collaborators?: string[]
  confidence?: number
  extractedEntities?: string[]
  sentiment?: "positive" | "neutral" | "negative"
}

interface Annotation {
  id: string
  userId: string
  userName: string
  content: string
  position: { page?: number; x?: number; y?: number }
  timestamp: Date
  type: "note" | "highlight" | "question"
}

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isVoice?: boolean
  sources?: string[]
  confidence?: number
  suggestions?: string[]
  relatedQueries?: string[]
}

interface KnowledgeCollection {
  id: string
  name: string
  description: string
  fileIds: string[]
  color: string
  createdAt: Date
  isShared: boolean
}

interface SavedSearch {
  id: string
  name: string
  query: string
  filters: any
  createdAt: Date
}

const collections = [
  { id: "all", name: "All Files", count: 0, icon: FileText, color: "gray" },
  { id: "recent", name: "Recent", count: 12, icon: Clock, color: "blue" },
  { id: "favorites", name: "Favorites", count: 5, icon: Star, color: "yellow" },
  { id: "documents", name: "Documents", count: 8, icon: FileText, color: "green" },
  { id: "images", name: "Images", count: 15, icon: ImageIcon, color: "purple" },
  { id: "videos", name: "Videos", count: 3, icon: Video, color: "red" },
  { id: "processing", name: "Processing", count: 2, icon: Cpu, color: "orange" },
  { id: "archived", name: "Archived", count: 2, icon: Archive, color: "gray" },
]

const aiFeatures = [
  {
    id: "summarize",
    name: "AI Summarization",
    description: "Generate intelligent summaries of your documents",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    webhook: process.env.NEXT_PUBLIC_N8N_SUMMARIZE_WEBHOOK || "/webhook/summarize",
  },
  {
    id: "extract-insights",
    name: "Extract Key Insights",
    description: "Identify important themes and concepts",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    webhook: process.env.NEXT_PUBLIC_N8N_INSIGHTS_WEBHOOK || "/webhook/insights",
  },
  {
    id: "find-connections",
    name: "Find Connections",
    description: "Discover relationships between documents",
    icon: Network,
    color: "from-purple-500 to-pink-500",
    webhook: process.env.NEXT_PUBLIC_N8N_CONNECTIONS_WEBHOOK || "/webhook/connections",
  },
  {
    id: "analyze-sentiment",
    name: "Sentiment Analysis",
    description: "Understand the emotional tone of content",
    icon: Activity,
    color: "from-green-500 to-emerald-500",
    webhook: process.env.NEXT_PUBLIC_N8N_SENTIMENT_WEBHOOK || "/webhook/sentiment",
  },
]

const uploadSources = [
  {
    id: "local",
    name: "Local Files",
    icon: <Upload className="h-8 w-8" />,
    description: "Upload PDFs, documents, images, videos from your device",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/20",
    hoverBg: "hover:bg-blue-500/30",
  },
  {
    id: "drive",
    name: "Google Drive",
    icon: <img src="/logos/google-drive.png" alt="Google Drive" className="h-8 w-8" />,
    description: "Import files directly from your Google Drive",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/20",
    hoverBg: "hover:bg-green-500/30",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: <img src="/logos/dropbox.png" alt="Dropbox" className="h-8 w-8" />,
    description: "Connect and sync files from Dropbox",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-600/20",
    hoverBg: "hover:bg-blue-600/30",
  },
  {
    id: "notion",
    name: "Notion",
    icon: <img src="/logos/notion.png" alt="Notion" className="h-8 w-8" />,
    description: "Import pages and databases from Notion workspace",
    color: "from-gray-600 to-gray-700",
    bgColor: "bg-gray-600/20",
    hoverBg: "hover:bg-gray-600/30",
  },
  {
    id: "url",
    name: "Web Links",
    icon: <Link className="h-8 w-8" />,
    description: "Add content from websites, articles, and online resources",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/20",
    hoverBg: "hover:bg-orange-500/30",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <img src="/logos/youtube.png" alt="YouTube" className="h-8 w-8" />,
    description: "Extract transcripts and content from YouTube videos",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/20",
    hoverBg: "hover:bg-red-500/30",
  },
]

export default function KnowledgeBasePage() {
  const [files, setFiles] = useState<KnowledgeFile[]>([])
  const [knowledgeCollections, setKnowledgeCollections] = useState<KnowledgeCollection[]>([])
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showCollectionDialog, setShowCollectionDialog] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [selectedAIFeature, setSelectedAIFeature] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [dragActive, setDragActive] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const [notionWorkspace, setNotionWorkspace] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [showCollections, setShowCollections] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCollection, setActiveCollection] = useState("all")
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    fileType: "all",
    dateRange: "all",
    source: "all",
    status: "all",
    tags: [] as string[],
  })
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [selectedFileForDetails, setSelectedFileForDetails] = useState<string | null>(null)
  const [isProcessingAI, setIsProcessingAI] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // AI Processing Functions
  const processWithAI = async (fileIds: string[], feature: string) => {
    setIsProcessingAI(true)

    try {
      const aiFeature = aiFeatures.find((f) => f.id === feature)
      if (!aiFeature) throw new Error("AI feature not found")

      // Update file status to processing
      setFiles((prev) =>
        prev.map((file) =>
          fileIds.includes(file.id) ? { ...file, status: feature === "summarize" ? "summarizing" : "analyzing" } : file,
        ),
      )

      // Call n8n webhook
      const response = await fetch(aiFeature.webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileIds,
          feature,
          files: files
            .filter((f) => fileIds.includes(f.id))
            .map((f) => ({
              id: f.id,
              name: f.name,
              type: f.type,
              content: f.preview || "",
              metadata: f.metadata,
            })),
        }),
      })

      if (!response.ok) throw new Error("AI processing failed")

      const result = await response.json()

      // Update files with AI results
      setFiles((prev) =>
        prev.map((file) => {
          if (!fileIds.includes(file.id)) return file

          const fileResult = result.results?.find((r: any) => r.fileId === file.id)
          if (!fileResult) return { ...file, status: "ready" }

          return {
            ...file,
            status: "ready",
            aiSummary: fileResult.summary || file.aiSummary,
            keyInsights: fileResult.insights || file.keyInsights,
            extractedEntities: fileResult.entities || file.extractedEntities,
            sentiment: fileResult.sentiment || file.sentiment,
            relatedFiles: fileResult.relatedFiles || file.relatedFiles,
            confidence: fileResult.confidence || file.confidence,
          }
        }),
      )

      // Show success notification
      console.log(`AI ${feature} completed successfully`)
    } catch (error) {
      console.error("AI processing error:", error)
      // Revert file status on error
      setFiles((prev) => prev.map((file) => (fileIds.includes(file.id) ? { ...file, status: "error" } : file)))
    } finally {
      setIsProcessingAI(false)
      setShowAIDialog(false)
    }
  }

  const handleBulkAIAction = (feature: string) => {
    if (selectedFiles.length === 0) return
    processWithAI(selectedFiles, feature)
  }

  // Enhanced search with AI-powered suggestions
  const performAISearch = async (query: string) => {
    try {
      const response = await fetch("/webhook/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          fileIds: files.map((f) => f.id),
          searchFilters,
        }),
      })

      const results = await response.json()
      return results.suggestions || []
    } catch (error) {
      console.error("AI search error:", error)
      return []
    }
  }

  // Collection management
  const createCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection: KnowledgeCollection = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCollectionName,
      description: newCollectionDescription,
      fileIds: selectedFiles,
      color: "purple",
      createdAt: new Date(),
      isShared: false,
    }

    setKnowledgeCollections((prev) => [...prev, newCollection])
    setNewCollectionName("")
    setNewCollectionDescription("")
    setSelectedFiles([])
    setShowCollectionDialog(false)
  }

  // File operations
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const event = {
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>
      handleFileUpload(event)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    setIsUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const newFile: KnowledgeFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        status: "processing",
        source: "upload",
        tags: [],
        metadata: {
          wordCount: file.type.includes("text") ? Math.floor(Math.random() * 5000) + 1000 : undefined,
          pages: file.type.includes("pdf") ? Math.floor(Math.random() * 50) + 1 : undefined,
          duration:
            file.type.includes("video") || file.type.includes("audio")
              ? Math.floor(Math.random() * 3600) + 60
              : undefined,
          language: "en",
          author: "Unknown",
        },
        annotations: [],
        collections: [],
        version: 1,
        collaborators: [],
        extractedEntities: [],
      }

      setFiles((prev) => [...prev, newFile])
      setUploadProgress(((i + 1) / selectedFiles.length) * 100)

      try {
        // Upload to processing webhook
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileId", newFile.id)

        await fetch("/webhook/process-upload", {
          method: "POST",
          body: formData,
        })

        setFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "ready" } : f)))
      } catch (error) {
        setFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "error" } : f)))
      }
    }

    setIsUploading(false)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) return

    setIsUploading(true)
    const newFile: KnowledgeFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: urlInput,
      type: "text/html",
      size: 0,
      uploadedAt: new Date(),
      status: "processing",
      source: "link",
      tags: [],
      annotations: [],
      collections: [],
      version: 1,
      collaborators: [],
      extractedEntities: [],
    }

    setFiles((prev) => [...prev, newFile])

    try {
      await fetch("/webhook/process-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput, fileId: newFile.id }),
      })

      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id ? { ...f, status: "ready", size: Math.floor(Math.random() * 50000) + 10000 } : f,
        ),
      )
    } catch (error) {
      setFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "error" } : f)))
    }

    setIsUploading(false)
    setUrlInput("")
    setUploadMethod(null)
    setShowUploadDialog(false)
  }

  // Chat functionality with RAG
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsChatLoading(true)

    try {
      const response = await fetch("/webhook/rag-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: inputMessage,
          fileIds: files.filter((f) => f.status === "ready").map((f) => f.id),
          conversationHistory: chatMessages.slice(-5),
        }),
      })

      const result = await response.json()

      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        type: "assistant",
        content: result.answer || "I couldn't find relevant information in your knowledge base.",
        timestamp: new Date(),
        sources: result.sources || [],
        confidence: result.confidence || 0,
        suggestions: result.suggestions || [],
        relatedQueries: result.relatedQueries || [],
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        type: "assistant",
        content: "I apologize, but I encountered an error processing your request.",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    }

    setIsChatLoading(false)
  }

  // Utility functions
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith("video/")) return <Video className="h-4 w-4" />
    if (type.startsWith("audio/")) return <Music className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "processing":
      case "summarizing":
      case "analyzing":
        return <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "drive":
        return <Cloud className="h-3 w-3 text-blue-400" />
      case "dropbox":
        return <Database className="h-3 w-3 text-blue-500" />
      case "notion":
        return <BookOpen className="h-3 w-3 text-gray-400" />
      case "link":
        return <Globe className="h-3 w-3 text-green-400" />
      case "youtube":
        return <Video className="h-3 w-3 text-red-400" />
      default:
        return <Upload className="h-3 w-3 text-purple-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      file.aiSummary?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterBy === "all" || file.status === filterBy || file.source === filterBy
    const matchesTab = activeTab === "all" || file.source === activeTab

    // Advanced search filters
    const matchesFileType = searchFilters.fileType === "all" || file.type.startsWith(searchFilters.fileType)
    const matchesSource = searchFilters.source === "all" || file.source === searchFilters.source
    const matchesStatus = searchFilters.status === "all" || file.status === searchFilters.status

    return matchesSearch && matchesFilter && matchesTab && matchesFileType && matchesSource && matchesStatus
  })

  const totalFiles = files.length
  const readyFiles = files.filter((f) => f.status === "ready").length
  const processingFiles = files.filter((f) => ["processing", "summarizing", "analyzing"].includes(f.status)).length
  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const sourcesCount = [...new Set(files.map((f) => f.source))].length

  const stats = [
    { label: "Total Files", value: totalFiles.toString(), icon: FileText, color: "blue" },
    { label: "Ready", value: readyFiles.toString(), icon: CheckCircle, color: "green" },
    { label: "Processing", value: processingFiles.toString(), icon: Cpu, color: "orange" },
    { label: "Total Size", value: formatFileSize(totalSize), icon: Database, color: "purple" },
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="w-full flex-shrink-0 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Base</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-400">AI-powered insights active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIDialog(true)}
                  disabled={selectedFiles.length === 0}
                  className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Actions ({selectedFiles.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowUploadDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Source
                </Button>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        stat.color === "blue"
                          ? "bg-blue-500/20 text-blue-400"
                          : stat.color === "green"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : stat.color === "orange"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      <stat.icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search across all content, summaries, and insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-purple-500/50"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCollectionDialog(true)}
                  disabled={selectedFiles.length === 0}
                  className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                >
                  <FolderPlus className="w-3 h-3 mr-2" />
                  Create Collection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setChatModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30"
                >
                  <MessageSquare className="w-3 h-3 mr-2" />
                  Ask AI
                </Button>
              </div>
            </div>

            {/* Advanced Search Filters */}
            {showAdvancedSearch && (
              <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">File Type</label>
                    <Select
                      value={searchFilters.fileType}
                      onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, fileType: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="application">Documents</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Source</label>
                    <Select
                      value={searchFilters.source}
                      onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, source: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="upload">Local Upload</SelectItem>
                        <SelectItem value="drive">Google Drive</SelectItem>
                        <SelectItem value="dropbox">Dropbox</SelectItem>
                        <SelectItem value="notion">Notion</SelectItem>
                        <SelectItem value="link">Web Links</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Status</label>
                    <Select
                      value={searchFilters.status}
                      onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSearchFilters({
                          fileType: "all",
                          dateRange: "all",
                          source: "all",
                          status: "all",
                          tags: [],
                        })
                      }
                      className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Collections Bar */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              {collections.map((collection) => (
                <Button
                  key={collection.id}
                  variant={activeCollection === collection.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCollection(collection.id)}
                  className={cn(
                    "flex-shrink-0",
                    activeCollection === collection.id
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10",
                  )}
                >
                  <collection.icon className="w-3 h-3 mr-2" />
                  {collection.name}
                  {collection.count > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">{collection.count}</span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full overflow-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Bulk Actions Bar */}
            {selectedFiles.length > 0 && (
              <div className="mb-6 p-4 bg-purple-600/20 border border-purple-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{selectedFiles.length} files selected</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFiles([])}
                      className="text-gray-300 hover:text-white"
                    >
                      Clear selection
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {aiFeatures.map((feature) => (
                      <Button
                        key={feature.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAIAction(feature.id)}
                        disabled={isProcessingAI}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <feature.icon className="w-3 h-3 mr-2" />
                        {feature.name}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCollectionDialog(true)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <FolderPlus className="w-3 h-3 mr-2" />
                      Add to Collection
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Files Grid/List */}
            {filteredFiles.length > 0 ? (
              <div
                className={cn(
                  "gap-6",
                  viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4",
                )}
              >
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      "bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer",
                      selectedFiles.includes(file.id) && "ring-2 ring-purple-500/50 bg-purple-600/20",
                      viewMode === "list" && "flex items-center gap-4",
                    )}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className={cn("flex items-center gap-3", viewMode === "list" ? "flex-1" : "mb-3")}>
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        {getSourceIcon(file.source)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">{file.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(file.status)}
                          <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
                          {file.confidence && (
                            <Badge variant="outline" className="text-xs">
                              {file.confidence}% confidence
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {viewMode === "grid" && (
                      <>
                        {file.aiSummary && (
                          <div className="mb-3 p-3 bg-white/5 rounded-lg">
                            <p className="text-xs text-gray-300 line-clamp-3">{file.aiSummary}</p>
                          </div>
                        )}

                        {file.keyInsights && file.keyInsights.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-400 mb-2">Key Insights:</p>
                            <div className="flex flex-wrap gap-1">
                              {file.keyInsights.slice(0, 3).map((insight, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {insight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{file.uploadedAt.toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            {file.isFavorite && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                            {file.annotations && file.annotations.length > 0 && (
                              <span>{file.annotations.length} notes</span>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {viewMode === "list" && (
                      <div className="flex items-center gap-4">
                        {file.aiSummary && (
                          <div className="flex-1 max-w-md">
                            <p className="text-xs text-gray-300 line-clamp-2">{file.aiSummary}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedFileForDetails(file.id)
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle download
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl">
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {searchQuery ? "No matching files found" : "No knowledge sources yet"}
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {searchQuery
                      ? "Try adjusting your search terms or filters to find what you're looking for."
                      : "Upload files to start building your AI-powered knowledge base and unlock intelligent insights."}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => setShowUploadDialog(true)}
                      className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Source
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none" />

          <DialogHeader className="pb-8 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-white text-3xl font-bold tracking-tight">Add Knowledge Source</DialogTitle>
                <p className="text-gray-300 mt-3 text-lg">
                  Choose how you'd like to add content to your knowledge base
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadDialog(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full h-10 w-10 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {!uploadMethod ? (
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {uploadSources.map((source, index) => (
                  <div
                    key={source.id}
                    className="group relative overflow-hidden rounded-2xl bg-gray-800/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setUploadMethod(source.id)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative p-8 h-full flex flex-col">
                      {/* Icon container */}
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
                          source.bgColor,
                          source.hoverBg,
                        )}
                      >
                        <div className="text-white transition-all duration-300 group-hover:scale-110">
                          {source.icon}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300">
                          {source.name}
                        </h3>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed text-sm line-clamp-3 flex-1">
                          {source.description}
                        </p>
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <ArrowLeft className="h-4 w-4 text-white rotate-180" />
                        </div>
                      </div>

                      {/* Subtle glow effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl",
                          source.color.replace("from-", "bg-").replace(" to-", "").split(" ")[0],
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom info */}
              <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI-Powered Processing</h4>
                    <p className="text-gray-400 text-sm">
                      All uploaded content is automatically processed with AI for summaries, insights, and searchability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-8">
              <div className="flex items-center space-x-4 pb-6 border-b border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadMethod(null)}
                  className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl px-4 py-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sources
                </Button>
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "p-4 rounded-2xl transition-all duration-300",
                      uploadSources.find((s) => s.id === uploadMethod)?.bgColor,
                    )}
                  >
                    {uploadSources.find((s) => s.id === uploadMethod)?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {uploadSources.find((s) => s.id === uploadMethod)?.name}
                    </h3>
                    <p className="text-gray-300 mt-1">
                      {uploadSources.find((s) => s.id === uploadMethod)?.description}
                    </p>
                  </div>
                </div>
              </div>

              {uploadMethod === "local" && (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 bg-gray-800/20 backdrop-blur-sm",
                    dragActive
                      ? "border-purple-400 bg-purple-400/10 scale-[1.02]"
                      : "border-white/20 hover:border-white/30",
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Drop files here or click to browse</h4>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Supports PDF, DOC, TXT, images, videos, and more. Files will be automatically processed with AI.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.wav"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Files
                  </Button>
                </div>
              )}

              {uploadMethod === "url" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <Link className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Add Website Content</h4>
                        <p className="text-gray-400">Extract and process content from any webpage</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Website URL</label>
                        <Input
                          placeholder="https://example.com/article"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-xl h-12 text-lg"
                        />
                      </div>
                      <Button
                        onClick={handleUrlUpload}
                        disabled={!urlInput.trim() || isUploading}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 rounded-xl font-semibold"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing Website...
                          </>
                        ) : (
                          <>
                            <Link className="w-5 h-5 mr-2" />
                            Add Website Content
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {uploadMethod === "notion" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gray-600/20 flex items-center justify-center">
                        <img src="/logos/notion.png" alt="Notion" className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Connect Notion Workspace</h4>
                        <p className="text-gray-400">Import pages and databases from your Notion workspace</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Notion Workspace URL</label>
                        <Input
                          placeholder="Enter your Notion workspace URL"
                          value={notionWorkspace}
                          onChange={(e) => setNotionWorkspace(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-xl h-12 text-lg"
                        />
                      </div>
                      <Button
                        disabled={!notionWorkspace.trim()}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white h-12 rounded-xl font-semibold"
                      >
                        <img src="/logos/notion.png" alt="Notion" className="h-5 w-5 mr-2" />
                        Connect to Notion
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {uploadMethod === "youtube" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <img src="/logos/youtube.png" alt="YouTube" className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Extract YouTube Content</h4>
                        <p className="text-gray-400">Get transcripts and content from YouTube videos</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">YouTube Video URL</label>
                        <Input
                          placeholder="https://youtube.com/watch?v=..."
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-xl h-12 text-lg"
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white h-12 rounded-xl font-semibold">
                        <img src="/logos/youtube.png" alt="YouTube" className="h-5 w-5 mr-2" />
                        Extract Video Content
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {uploadMethod === "drive" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <img src="/logos/google-drive.png" alt="Google Drive" className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Connect Google Drive</h4>
                        <p className="text-gray-400">Import files directly from your Google Drive</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-xl font-semibold">
                      <img src="/logos/google-drive.png" alt="Google Drive" className="h-5 w-5 mr-2" />
                      Connect to Google Drive
                    </Button>
                  </div>
                </div>
              )}

              {uploadMethod === "dropbox" && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                        <img src="/logos/dropbox.png" alt="Dropbox" className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Connect Dropbox</h4>
                        <p className="text-gray-400">Connect and sync files from your Dropbox account</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 rounded-xl font-semibold">
                      <img src="/logos/dropbox.png" alt="Dropbox" className="h-5 w-5 mr-2" />
                      Connect to Dropbox
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Actions Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">AI-Powered Actions</DialogTitle>
            <p className="text-gray-300">Choose an AI action to perform on {selectedFiles.length} selected files</p>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {aiFeatures.map((feature) => (
              <Button
                key={feature.id}
                variant="ghost"
                className="h-auto p-6 flex flex-col items-start space-y-3 hover:scale-[1.02] transition-all duration-300 group border border-white/10 hover:border-purple-400/40 rounded-xl bg-gray-800/40 hover:bg-gray-700/60"
                onClick={() => {
                  setSelectedAIFeature(feature.id)
                  processWithAI(selectedFiles, feature.id)
                }}
                disabled={isProcessingAI}
              >
                <div
                  className={cn(
                    "p-3 rounded-lg bg-gradient-to-br transition-all duration-300 group-hover:scale-105",
                    `${feature.color}/20 group-hover:${feature.color}/30`,
                  )}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white group-hover:text-purple-100 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors mt-1">
                    {feature.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>

          {isProcessingAI && (
            <div className="mt-6 p-4 bg-purple-600/20 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                <span className="text-white">Processing files with AI...</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Collection Dialog */}
      <Dialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
        <DialogContent className="max-w-md bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Create Collection</DialogTitle>
            <p className="text-gray-300">Organize your selected files into a collection</p>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Collection Name</label>
              <Input
                placeholder="Enter collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description (Optional)</label>
              <Textarea
                placeholder="Describe this collection"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm text-gray-400">{selectedFiles.length} files selected</span>
              <Button
                onClick={createCollection}
                disabled={!newCollectionName.trim()}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                Create Collection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Chat Modal */}
      <Dialog open={chatModalOpen} onOpenChange={setChatModalOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-0 overflow-hidden">
          <div className="flex flex-col h-[80vh]">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">AI Knowledge Assistant</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-gray-400">
                        RAG-powered • {readyFiles} sources ready • Advanced reasoning
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {chatMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center space-y-6 max-w-lg">
                    <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-600/20 w-20 h-20 mx-auto flex items-center justify-center backdrop-blur-xl border border-purple-400/20">
                      <Brain className="w-8 h-8 text-purple-400/60" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white mb-3">Ask anything about your knowledge</h3>
                      <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        I can analyze documents, find connections, summarize content, and provide insights across your
                        entire knowledge base.
                      </p>
                    </div>
                    {readyFiles > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Suggested queries:</p>
                        <div className="space-y-2">
                          {[
                            "What are the key themes across my documents?",
                            "Find connections between my uploaded files",
                            "Summarize the most important insights",
                            "What questions can I ask based on my content?",
                          ].map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className="text-xs text-gray-400 hover:text-white hover:bg-white/10 h-auto p-3 text-left justify-start w-full rounded-lg border border-white/10"
                              onClick={() => {
                                setInputMessage(suggestion)
                                setTimeout(() => {
                                  const input = document.querySelector(
                                    'input[placeholder*="Ask anything"]',
                                  ) as HTMLInputElement
                                  if (input) input.focus()
                                }, 100)
                              }}
                            >
                              <MessageSquare className="w-3 h-3 mr-2 flex-shrink-0" />"{suggestion}"
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl",
                          message.type === "user"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4"
                            : "bg-gray-800/60 backdrop-blur-sm text-gray-100 border border-white/10 p-4",
                        )}
                      >
                        <p className="text-sm leading-relaxed mb-2">{message.content}</p>

                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-gray-400 mb-2">Sources:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.sources.map((source, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {source}
                                </Badge>
                              ))}
                            </div>
                            {message.confidence && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${message.confidence}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">{message.confidence}%</span>
                              </div>
                            )}
                          </div>
                        )}

                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-gray-400 mb-2">Follow-up suggestions:</p>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, idx) => (
                                <Button
                                  key={idx}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-gray-300 hover:text-white hover:bg-white/10 h-auto p-2 text-left justify-start w-full"
                                  onClick={() => setInputMessage(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {message.relatedQueries && message.relatedQueries.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-gray-400 mb-2">Related queries:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.relatedQueries.map((query, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-6 px-2 bg-transparent"
                                  onClick={() => setInputMessage(query)}
                                >
                                  {query}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-4 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                          <span className="text-sm text-gray-300">Analyzing your knowledge base...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ask anything about your knowledge base..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    className="bg-gray-800/40 border-white/20 text-white placeholder-gray-400 focus:border-purple-400/60 pr-20"
                    disabled={isChatLoading}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white h-8 w-8 p-0"
                      onClick={() => setIsRecording(!isRecording)}
                      disabled={isChatLoading}
                    >
                      <Mic className={cn("h-4 w-4", isRecording && "text-red-400 animate-pulse")} />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isChatLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Press Enter to send • Shift+Enter for new line</span>
                <div className="flex items-center gap-4">
                  <span>Voice input available</span>
                  <span>Powered by RAG + AI</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Details Modal */}
      {selectedFileForDetails && (
        <Dialog open={!!selectedFileForDetails} onOpenChange={() => setSelectedFileForDetails(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
            {(() => {
              const file = files.find((f) => f.id === selectedFileForDetails)
              if (!file) return null

              return (
                <>
                  <DialogHeader className="pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <DialogTitle className="text-white text-xl font-bold">{file.name}</DialogTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(file.status)}
                            <span className="text-sm text-gray-400">{formatFileSize(file.size)}</span>
                            {getSourceIcon(file.source)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                          <Download className="w-3 h-3 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                          <Share2 className="w-3 h-3 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>

                  <Tabs defaultValue="overview" className="flex-1">
                    <TabsList className="grid w-full grid-cols-4 bg-white/5">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="insights">AI Insights</TabsTrigger>
                      <TabsTrigger value="connections">Connections</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">File Information</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Size:</span>
                                <span className="text-white">{formatFileSize(file.size)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white">{file.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Source:</span>
                                <span className="text-white capitalize">{file.source}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Uploaded:</span>
                                <span className="text-white">{file.uploadedAt.toLocaleDateString()}</span>
                              </div>
                              {file.metadata?.pages && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Pages:</span>
                                  <span className="text-white">{file.metadata.pages}</span>
                                </div>
                              )}
                              {file.metadata?.wordCount && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Words:</span>
                                  <span className="text-white">{file.metadata.wordCount.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {file.tags.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
                              <div className="flex flex-wrap gap-2">
                                {file.tags.map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          {file.aiSummary && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">AI Summary</h3>
                              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-sm text-gray-300 leading-relaxed">{file.aiSummary}</p>
                              </div>
                            </div>
                          )}

                          {file.extractedEntities && file.extractedEntities.length > 0 && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-400 mb-2">Extracted Entities</h3>
                              <div className="flex flex-wrap gap-2">
                                {file.extractedEntities.map((entity, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {entity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="content" className="mt-6">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-white">Content Preview</h3>
                          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                            <Eye className="w-3 h-3 mr-2" />
                            Full View
                          </Button>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed">
                          {file.preview || "Content preview not available for this file type."}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="insights" className="mt-6 space-y-6">
                      {file.keyInsights && file.keyInsights.length > 0 ? (
                        <div>
                          <h3 className="text-lg font-medium text-white mb-4">Key Insights</h3>
                          <div className="space-y-3">
                            {file.keyInsights.map((insight, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg"
                              >
                                <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-300">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">No AI insights generated yet</p>
                          <Button
                            className="mt-4 bg-gradient-to-r from-purple-600 to-violet-600"
                            onClick={() => processWithAI([file.id], "extract-insights")}
                          >
                            Generate Insights
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="connections" className="mt-6">
                      {file.relatedFiles && file.relatedFiles.length > 0 ? (
                        <div>
                          <h3 className="text-lg font-medium text-white mb-4">Related Files</h3>
                          <div className="space-y-3">
                            {file.relatedFiles.map((relatedId, idx) => {
                              const relatedFile = files.find((f) => f.id === relatedId)
                              if (!relatedFile) return null

                              return (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 cursor-pointer"
                                >
                                  {getFileIcon(relatedFile.type)}
                                  <div className="flex-1">
                                    <p className="text-white font-medium">{relatedFile.name}</p>
                                    <p className="text-xs text-gray-400">{formatFileSize(relatedFile.size)}</p>
                                  </div>
                                  <Network className="w-4 h-4 text-purple-400" />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">No connections found yet</p>
                          <Button
                            className="mt-4 bg-gradient-to-r from-purple-600 to-violet-600"
                            onClick={() => processWithAI([file.id], "find-connections")}
                          >
                            Find Connections
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              )
            })()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
