import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Cpu,
  Database,
  DollarSign,
  Facebook,
  Filter,
  ImageIcon,
  Instagram,
  Linkedin,
  Mail,
  Mic,
  Phone,
  Plus,
  Search,
  Share2,
  TrendingUp,
  Twitter,
  User,
  Users,
  Video,
  Wand2,
  Zap,
} from "lucide-react"

const agentCards = [
  {
    id: "lead-gen",
    category: "Lead Generation",
    title: "Prospect Discovery",
    description: "Automatically finds, enriches, and qualifies high-value prospects using advanced AI algorithms.",
    valueMetric: { value: "40+", unit: "hrs/wk", label: "Saved", icon: <Clock className="w-4 h-4" /> },
    theme: {
      gradient: "from-blue-400 to-purple-400",
      text: "text-blue-300",
      border: "border-blue-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="leadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#leadGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M60,40 L120,40 L120,70 L180,70"></path>
            <path className="connector" d="M180,70 L220,70 L220,100 L280,100"></path>
            <path className="connector" d="M120,70 L120,110 L180,110"></path>
            <circle cx="60" cy="40" r="3" fill="#3b82f6"></circle>
            <circle cx="180" cy="70" r="3" fill="#06b6d4"></circle>
            <circle cx="280" cy="100" r="3" fill="#10b981"></circle>
          </g>
        </svg>
        <div className="absolute top-3 left-6 ai-node-float">
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-blue-400/30 ai-glow">
            <Search className="w-4 h-4 text-blue-400" />
          </div>
        </div>
        <div className="absolute top-12 right-6 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-cyan-400/30">
            <Filter className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
        <div className="absolute bottom-6 right-8 ai-node-float" style={{ animationDelay: "-2s" }}>
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-green-400/30">
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "lead-enrich",
    category: "Lead Enrichment",
    title: "Data Intelligence",
    description: "Enriches prospect profiles with comprehensive data from multiple sources and APIs.",
    valueMetric: { value: "95%", unit: "Accuracy", label: "Data", icon: <CheckCircle className="w-4 h-4" /> },
    theme: {
      gradient: "from-purple-400 to-pink-400",
      text: "text-purple-300",
      border: "border-purple-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="enrichGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#enrichGradient)" strokeWidth="1.5" fill="none">
            <circle cx="160" cy="90" r="40" className="connector"></circle>
            <path className="connector" d="M80,90 L120,90"></path>
            <path className="connector" d="M200,90 L240,90"></path>
            <circle cx="80" cy="90" r="3" fill="#8b5cf6"></circle>
            <circle cx="240" cy="90" r="3" fill="#c084fc"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ai-pulse">
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-purple-400/30 ai-glow">
            <Database className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="absolute top-6 left-6 ai-node-float">
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-purple-300/30">
            <User className="w-3 h-3 text-purple-300" />
          </div>
        </div>
        <div className="absolute bottom-6 right-6 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-purple-300/30">
            <Building className="w-3 h-3 text-purple-300" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "lead-outreach",
    category: "Lead Outreach",
    title: "Deal Accelerator",
    description: "Personalized outreach across email, LinkedIn, and phone with intelligent sequencing.",
    valueMetric: { value: "3x", unit: "Pipeline", label: "Growth", icon: <TrendingUp className="w-4 h-4" /> },
    theme: {
      gradient: "from-pink-400 to-orange-400",
      text: "text-pink-300",
      border: "border-pink-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="outreachGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#f97316" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#outreachGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M80,90 L120,60 L200,60"></path>
            <path className="connector" d="M80,90 L120,90 L200,90"></path>
            <path className="connector" d="M80,90 L120,120 L200,120"></path>
            <circle cx="80" cy="90" r="3" fill="#ec4899"></circle>
            <circle cx="200" cy="60" r="3" fill="#f97316"></circle>
            <circle cx="200" cy="90" r="3" fill="#f97316"></circle>
            <circle cx="200" cy="120" r="3" fill="#eab308"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 animate-ai-pulse">
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-pink-400/30 ai-glow">
            <Mail className="w-4 h-4 text-pink-400" />
          </div>
        </div>
        <div className="absolute top-3 right-6 ai-node-float">
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-orange-400/30">
            <Linkedin className="w-3 h-3 text-orange-400" />
          </div>
        </div>
        <div className="absolute bottom-3 right-6 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-yellow-400/30">
            <Phone className="w-3 h-3 text-yellow-400" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "viral-research",
    category: "Content Research",
    title: "Viral Content Analysis",
    description: "Analyzes trending content patterns and identifies viral opportunities across platforms.",
    valueMetric: { value: "80%", unit: "Time", label: "Saved", icon: <Clock className="w-4 h-4" /> },
    theme: {
      gradient: "from-emerald-400 to-cyan-400",
      text: "text-emerald-300",
      border: "border-emerald-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="researchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#researchGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M160,40 L100,80 L160,120 L220,80 Z"></path>
            <circle cx="160" cy="40" r="3" fill="#10b981"></circle>
            <circle cx="100" cy="80" r="3" fill="#06b6d4"></circle>
            <circle cx="220" cy="80" r="3" fill="#06b6d4"></circle>
            <circle cx="160" cy="120" r="3" fill="#3b82f6"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-content-spin">
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-emerald-400/30 ai-glow">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 ai-node-float">
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-emerald-300/30">
            <Search className="w-3 h-3 text-emerald-300" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "content-creation",
    category: "Content Creation",
    title: "GenMedia: AI Content Studio",
    description: "Creates high-quality video, image, and text content optimized for maximum engagement.",
    valueMetric: { value: "10x", unit: "Faster", label: "Creation", icon: <Zap className="w-4 h-4" /> },
    theme: {
      gradient: "from-amber-400 to-red-400",
      text: "text-amber-300",
      border: "border-amber-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="creationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#f97316" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#creationGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M80,90 L120,50 L200,50 L240,90 L200,130 L120,130 Z"></path>
            <circle cx="160" cy="90" r="25" className="connector"></circle>
            <circle cx="160" cy="90" r="3" fill="#f97316"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ai-pulse">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-amber-400/30 ai-glow">
            <Wand2 className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div className="absolute top-6 left-6 ai-node-float">
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-orange-400/30">
            <ImageIcon className="w-3 h-3 text-orange-400" />
          </div>
        </div>
        <div className="absolute bottom-6 right-6 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-6 h-6 glass rounded-lg flex items-center justify-center border border-red-400/30">
            <Video className="w-3 h-3 text-red-400" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "omnichannel",
    category: "Organic Growth",
    title: "Omnichannel Social Distribution",
    description: "Create once, publish everywhere. Convert and optimize content for all social platforms.",
    valueMetric: { value: "500%", unit: "Reach", label: "Increased", icon: <Share2 className="w-4 h-4" /> },
    theme: {
      gradient: "from-violet-400 to-purple-400",
      text: "text-violet-300",
      border: "border-violet-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="omniGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#omniGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M160,90 L120,50"></path>
            <path className="connector" d="M160,90 L200,50"></path>
            <path className="connector" d="M160,90 L120,130"></path>
            <path className="connector" d="M160,90 L200,130"></path>
            <path className="connector" d="M160,90 L160,50"></path>
            <path className="connector" d="M160,90 L160,130"></path>
            <circle cx="160" cy="90" r="8" fill="#8b5cf6"></circle>
            <circle cx="120" cy="50" r="3" fill="#a855f7"></circle>
            <circle cx="200" cy="50" r="3" fill="#a855f7"></circle>
            <circle cx="160" cy="50" r="3" fill="#a855f7"></circle>
            <circle cx="120" cy="130" r="3" fill="#7c3aed"></circle>
            <circle cx="200" cy="130" r="3" fill="#7c3aed"></circle>
            <circle cx="160" cy="130" r="3" fill="#7c3aed"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-omni-spread">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-violet-400/30 ai-glow">
            <Share2 className="w-5 h-5 text-violet-400" />
          </div>
        </div>
        <div className="absolute top-3 left-6 ai-node-float">
          <div className="w-5 h-5 glass rounded-lg flex items-center justify-center border border-violet-300/30">
            <Facebook className="w-2.5 h-2.5 text-violet-300" />
          </div>
        </div>
        <div className="absolute top-3 right-6 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-5 h-5 glass rounded-lg flex items-center justify-center border border-violet-300/30">
            <Twitter className="w-2.5 h-2.5 text-violet-300" />
          </div>
        </div>
        <div className="absolute bottom-3 left-6 ai-node-float" style={{ animationDelay: "-2s" }}>
          <div className="w-5 h-5 glass rounded-lg flex items-center justify-center border border-violet-300/30">
            <Instagram className="w-2.5 h-2.5 text-violet-300" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "voice-ai",
    category: "Sales & Appointment Setting",
    title: "Conversational Voice AI",
    description: "Handles calls and books qualified appointments with natural, human-like conversations.",
    valueMetric: { value: "$25k+", unit: "/mo", label: "Saved", icon: <DollarSign className="w-4 h-4" /> },
    theme: {
      gradient: "from-cyan-400 to-sky-400",
      text: "text-cyan-300",
      border: "border-cyan-400/30",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"></stop>
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#voiceGradient)" strokeWidth="2" fill="none">
            <path className="connector" d="M50,90 Q80,60 110,90 T170,90 Q200,120 230,90 T290,90"></path>
            <circle cx="50" cy="90" r="3" fill="#06b6d4"></circle>
            <circle cx="160" cy="90" r="3" fill="#0ea5e9"></circle>
            <circle cx="290" cy="90" r="3" fill="#3b82f6"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-cyan-400/30 ai-glow">
            <Mic className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="voice-bars">
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "concierge",
    category: "Customer Support",
    title: "24/7 Client Concierge",
    description: "Provide a white glove service experience for your clients from onboarding to ongoing support.",
    valueMetric: { value: "98%", unit: "CSAT", label: "Score", icon: <Crown className="w-4 h-4" /> },
    theme: {
      gradient: "from-purple-400 to-violet-400",
      text: "text-purple-200",
      border: "border-purple-400/40",
      bg: "bg-gradient-to-br from-purple-900/20 to-violet-900/20",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="conciergeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1"></stop>
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="1"></stop>
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="1"></stop>
              <stop offset="75%" stopColor="#6d28d9" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#5b21b6" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#conciergeGradient)" strokeWidth="2" fill="none">
            <circle cx="160" cy="90" r="50" className="connector" opacity="0.8"></circle>
            <circle cx="160" cy="90" r="30" className="connector" opacity="0.6"></circle>
            <circle cx="160" cy="90" r="15" className="connector" opacity="0.4"></circle>
            <circle cx="160" cy="90" r="5" fill="#a855f7"></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ai-pulse">
          <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-2 border-purple-400/50 ai-glow shadow-2xl">
            <Crown className="w-6 h-6 text-purple-300" />
          </div>
        </div>
        <div className="absolute top-6 left-8 ai-node-float">
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-purple-300/40">
            <Briefcase className="w-3 h-3 text-purple-200" />
          </div>
        </div>
        <div className="absolute top-6 right-8 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-purple-300/40">
            <Calendar className="w-3 h-3 text-purple-200" />
          </div>
        </div>
        <div className="absolute bottom-6 left-8 ai-node-float" style={{ animationDelay: "-2s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-purple-300/40">
            <Users className="w-3 h-3 text-purple-200" />
          </div>
        </div>
        <div className="absolute bottom-6 right-8 ai-node-float" style={{ animationDelay: "-3s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-purple-300/40">
            <Zap className="w-3 h-3 text-purple-200" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "custom-solutions",
    category: "Bespoke Development",
    title: "Custom AI Solutions",
    description:
      "Our expert developers build custom AI solutions for any business need. Get in touch to explore the possibilities.",
    valueMetric: { value: "Contact", unit: "Us", label: "for a quote", icon: <Mail className="w-4 h-4" /> },
    theme: {
      gradient: "from-gray-400 to-white",
      text: "text-gray-200",
      border: "border-gray-400/30",
      bg: "bg-gradient-to-br from-gray-800/20 to-gray-900/20",
    },
    visual: (
      <>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          <defs>
            <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.8"></stop>
              <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.8"></stop>
            </linearGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="url(#customGradient)"
                strokeWidth="0.5"
                opacity="0.3"
              ></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
          <g stroke="url(#customGradient)" strokeWidth="1.5" fill="none">
            <path className="connector" d="M80,90 L240,90"></path>
            <path className="connector" d="M160,50 L160,130"></path>
          </g>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ai-pulse">
          <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-2 border-gray-400/50 ai-glow shadow-2xl">
            <Cpu className="w-6 h-6 text-gray-300" />
          </div>
        </div>
        <div className="absolute top-6 left-8 ai-node-float">
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-gray-300/40">
            <Plus className="w-3 h-3 text-gray-200" />
          </div>
        </div>
        <div className="absolute top-6 right-8 ai-node-float" style={{ animationDelay: "-1s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-gray-300/40">
            <Plus className="w-3 h-3 text-gray-200" />
          </div>
        </div>
        <div className="absolute bottom-6 left-8 ai-node-float" style={{ animationDelay: "-2s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-gray-300/40">
            <Plus className="w-3 h-3 text-gray-200" />
          </div>
        </div>
        <div className="absolute bottom-6 right-8 ai-node-float" style={{ animationDelay: "-3s" }}>
          <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-gray-300/40">
            <Plus className="w-3 h-3 text-gray-200" />
          </div>
        </div>
      </>
    ),
  },
]

const AgentCard = ({ card, index }: { card: (typeof agentCards)[0]; index: number }) => (
  <div className="w-full relative">
    <div
      className="relative card-border overflow-hidden rounded-2xl flex flex-col animate-float hover:scale-105 transition-all duration-500"
      style={{ animationDelay: `-${index}s` }}
    >
      <div className="p-4 flex justify-center relative">
        <div className="w-full h-48 rounded-xl gradient-border ai-glow overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full animate-pulse"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px)",
                backgroundSize: "15px 15px",
              }}
            ></div>
          </div>
          <div className="absolute inset-0 w-full h-full">{card.visual}</div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className={`p-4 flex-grow flex flex-col ${card.theme.bg || ""}`}>
        <span
          className={`inline-block px-3 py-1 glass ${card.theme.text} rounded-full text-xs font-medium mb-3 self-start`}
        >
          {card.category}
        </span>
        <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
        <p className="text-white/70 mb-4 leading-relaxed text-xs flex-grow">{card.description}</p>
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3 text-white">
            <div className={`p-2 rounded-full glass ${card.theme.border} ${card.theme.text}`}>
              {card.valueMetric.icon}
            </div>
            <div>
              <span className="text-xl font-bold">{card.valueMetric.value}</span>
              <span className="text-sm text-white/80 ml-1">{card.valueMetric.unit}</span>
              <p className="text-xs text-white/60">{card.valueMetric.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export function AgentSuite() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 text-sm font-medium text-blue-300 glass rounded-full mb-6 border border-blue-400/30">
          AI Agent Solutions
        </span>
        <h2 className="md:text-5xl text-4xl font-light tracking-tight mb-6">
          Complete AI{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Agent Suite
          </span>
        </h2>
        <p className="max-w-3xl text-xl text-gray-300 mx-auto">
          Interconnected AI agents that work together to deliver an autonomous business and drive revenue while you
          focus on strategy
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agentCards.map((card, index) => (
          <AgentCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  )
}
