"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  X,
  Save,
  Sparkles,
  TrendingUp,
  Search,
  CheckCircle,
  Volume2,
  Clock,
  BarChart3,
  Target,
  Zap,
  FileText,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

interface ContentEditorProps {
  title: string
  initialContent: string
  onSave: (content: string, title: string) => void
  onClose: () => void
  metadata?: {
    type: string
    status: string
    priority: string
    tags: string[]
    viral_hook?: string
    predicted_engagement?: number
    viral_analysis_score?: number
    platforms?: string[]
  }
  className?: string
}

interface AITool {
  id: string
  name: string
  description: string
  icon: any
  color: string
  prompt: string
}

const aiTools: AITool[] = [
  {
    id: "improve-hook",
    name: "Improve Hook",
    description: "Make your opening more engaging and attention-grabbing",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    prompt: "Improve the hook/opening of this content to make it more engaging and attention-grabbing:",
  },
  {
    id: "expand-content",
    name: "Expand Content",
    description: "Add more depth, examples, and detailed explanations",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    prompt: "Expand this content with more details, examples, and comprehensive explanations:",
  },
  {
    id: "seo-optimize",
    name: "SEO Optimize",
    description: "Optimize for search engines and improve discoverability",
    icon: Search,
    color: "from-green-500 to-emerald-500",
    prompt: "Optimize this content for SEO, adding relevant keywords and improving structure:",
  },
  {
    id: "add-cta",
    name: "Add Call-to-Action",
    description: "Include compelling calls-to-action to drive engagement",
    icon: Target,
    color: "from-purple-500 to-violet-500",
    prompt: "Add compelling call-to-action elements to this content to drive engagement:",
  },
  {
    id: "fact-check",
    name: "Fact Check",
    description: "Verify information accuracy and add credible sources",
    icon: CheckCircle,
    color: "from-emerald-500 to-teal-500",
    prompt: "Review this content for factual accuracy and suggest improvements with credible sources:",
  },
  {
    id: "adjust-tone",
    name: "Adjust Tone",
    description: "Modify the tone to match your brand voice and audience",
    icon: Volume2,
    color: "from-pink-500 to-rose-500",
    prompt: "Adjust the tone of this content to be more professional and engaging for business audiences:",
  },
]

export function ContentEditor({ title, initialContent, onSave, onClose, metadata, className }: ContentEditorProps) {
  const [currentTitle, setCurrentTitle] = useState(title)
  const [content, setContent] = useState(initialContent)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeAITool, setActiveAITool] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)

  // Calculate content statistics
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length
    const characters = content.length
    const avgWordsPerMinute = 200
    const minutes = Math.ceil(words / avgWordsPerMinute)

    setWordCount(words)
    setCharacterCount(characters)
    setReadingTime(minutes)
  }, [content])

  const handleSave = () => {
    onSave(content, currentTitle)
    toast.success("Content saved successfully!")
  }

  const handleAIAssist = async (tool: AITool) => {
    setIsProcessing(true)
    setActiveAITool(tool.id)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI enhancement based on tool type
      let enhancedContent = content

      switch (tool.id) {
        case "improve-hook":
          enhancedContent = `🚀 **ATTENTION:** ${content.split("\n")[0]}\n\n${content.substring(content.indexOf("\n") + 1)}`
          break
        case "expand-content":
          enhancedContent =
            content +
            "\n\n## Additional Insights\n\nThis approach has been proven effective across multiple industries, with case studies showing significant improvements in engagement and conversion rates.\n\n### Key Benefits:\n- Increased efficiency by 40%\n- Reduced operational costs\n- Improved customer satisfaction\n- Faster time-to-market\n\n### Implementation Tips:\n1. Start with a pilot program\n2. Train your team thoroughly\n3. Monitor results closely\n4. Iterate based on feedback"
          break
        case "seo-optimize":
          enhancedContent =
            content.replace(/# /g, "# SEO-Optimized: ") +
            "\n\n---\n\n**SEO Keywords:** AI automation, business efficiency, digital transformation, workflow optimization\n\n**Meta Description:** Discover how AI transforms business operations with proven strategies, real-world case studies, and actionable insights for immediate implementation.\n\n**Related Topics:** artificial intelligence, business automation, digital innovation, process optimization"
          break
        case "add-cta":
          enhancedContent =
            content +
            "\n\n---\n\n## Ready to Transform Your Business?\n\n🎯 **Take Action Now:**\n\n✅ **Download our free implementation guide** - Get step-by-step instructions\n\n✅ **Schedule a consultation with our experts** - Personalized strategy session\n\n✅ **Join thousands of successful businesses** - Start your AI journey today\n\n[**Get Started Today →**](https://example.com/get-started)\n\n*Don't wait - your competitors are already implementing AI solutions. Stay ahead of the curve!*"
          break
        case "fact-check":
          enhancedContent =
            content +
            "\n\n---\n\n## Sources & Verification ✅\n\n**This content has been fact-checked and verified:**\n\n📊 **Statistics sourced from:**\n- McKinsey Global Institute AI Reports\n- Harvard Business Review Studies\n- Industry-leading research organizations\n\n🏢 **Case studies verified from:**\n- Fortune 500 company implementations\n- Peer-reviewed business journals\n- Independent third-party audits\n\n👨‍💼 **Expert insights from:**\n- Certified AI professionals\n- Industry thought leaders\n- Academic researchers\n\n*All data current as of 2024 and regularly updated.*"
          break
        case "adjust-tone":
          enhancedContent = content
            .replace(/!/g, ".")
            .replace(/\?/g, " - let's explore this further.")
            .replace(/amazing/gi, "exceptional")
            .replace(/awesome/gi, "outstanding")
            .replace(/great/gi, "excellent")
          break
      }

      setContent(enhancedContent)
      toast.success(`Content enhanced with ${tool.name}!`)
    } catch (error) {
      toast.error("Failed to enhance content. Please try again.")
    } finally {
      setIsProcessing(false)
      setActiveAITool(null)
    }
  }

  const handleGenerateContent = async () => {
    setIsProcessing(true)

    try {
      // Simulate content generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const generatedContent = `# ${currentTitle}

## 🚀 Hook
Ready to transform your business with cutting-edge AI solutions? Here's everything you need to know to get started today...

## 🎯 The Challenge
Most businesses today are struggling with:
- **Manual processes** that waste valuable time and resources
- **Inconsistent customer experiences** that hurt brand reputation
- **Difficulty scaling operations** without exponential cost increases
- **Limited data insights** that prevent informed decision-making
- **Competitive pressure** from more technologically advanced rivals

## ✨ Our AI-Powered Solution
Our comprehensive AI platform addresses these challenges head-on by providing:

### 1. 🤖 Intelligent Automation
- **Streamline repetitive tasks** with 99.9% accuracy
- **Reduce human error** by up to 95%
- **Save 20+ hours per week** on manual processes
- **Scale operations** without hiring additional staff

### 2. 🎨 Enhanced Customer Experience
- **24/7 intelligent support** that never sleeps
- **Personalized interactions** based on customer history
- **Faster response times** - average 30 seconds vs 24 hours
- **Consistent service quality** across all touchpoints

### 3. 📊 Data-Driven Insights
- **Real-time analytics** and performance dashboards
- **Predictive modeling** to forecast trends and opportunities
- **Actionable recommendations** based on AI analysis
- **ROI tracking** to measure success and optimize performance

## 🏆 Success Stories
> **"Since implementing this AI solution, we've seen a 40% increase in efficiency and our customers are happier than ever. The ROI was evident within the first month."** 
> 
> *- Sarah Johnson, CEO of TechCorp*

### Key Results Achieved:
- 📈 **300% efficiency increase** in core processes
- 💰 **$150,000 annual savings** in operational costs
- ⏰ **20 hours/week time savings** for key personnel
- 😊 **98% customer satisfaction** rating
- 🚀 **40% revenue growth** year-over-year

## 🛠️ Implementation Process
Our proven 4-step implementation ensures success:

### Step 1: 🔍 Assessment (Week 1)
- Comprehensive analysis of your current processes
- Identification of automation opportunities
- Custom solution design and planning
- ROI projections and timeline development

### Step 2: 🔧 Customization (Week 2)
- Tailored solution development for your specific needs
- Integration planning with existing systems
- Security and compliance configuration
- User interface customization

### Step 3: 🚀 Integration (Week 3)
- Seamless setup with your existing systems
- Data migration and system testing
- Security protocols implementation
- Performance optimization

### Step 4: 🎓 Training & Launch (Week 4)
- Comprehensive team onboarding and training
- Go-live support and monitoring
- Performance tracking setup
- Ongoing optimization and support

## 💡 Why Choose Our Solution?

### ✅ **Proven Track Record**
- Over 1,000 successful implementations
- 99.9% uptime guarantee
- Industry-leading security standards
- 24/7 expert support

### ✅ **Rapid ROI**
- Average payback period: 3-6 months
- Typical ROI: 300-500% in first year
- Immediate efficiency gains
- Scalable pricing model

### ✅ **Future-Proof Technology**
- Continuous AI model improvements
- Regular feature updates
- Scalable architecture
- Integration with emerging technologies

## 🎯 Ready to Transform Your Business?

Don't let your competitors get ahead. The businesses that adopt AI today will dominate their markets tomorrow.

### 🚀 **Take Action Now:**

1. **📞 Schedule a Free Consultation**
   - Get personalized recommendations
   - See a custom demo of our platform
   - Receive a detailed ROI analysis
   - No obligation, just insights

2. **📊 Use Our ROI Calculator**
   - Calculate your potential savings
   - See projected efficiency gains
   - Get a custom implementation timeline
   - Download detailed reports

3. **📚 Download Our Implementation Guide**
   - Step-by-step planning checklist
   - Best practices from successful clients
   - Common pitfalls to avoid
   - Expert tips and strategies

### 🔥 **Limited Time Offer**
Book your consultation this month and receive:
- **50% off** implementation fees
- **Free** 3-month premium support
- **Complimentary** team training sessions
- **Bonus** performance optimization review

[**🚀 Get Started Today - Book Your Free Consultation →**](https://example.com/consultation)

---

*Don't wait - your competitors are already implementing AI solutions. Join the leaders who are transforming their industries with intelligent automation.*

**Questions?** Contact our AI experts at [support@example.com](mailto:support@example.com) or call 1-800-AI-TRANSFORM.`

      setContent(generatedContent)
      toast.success("Content generated successfully!")
    } catch (error) {
      toast.error("Failed to generate content. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div
      className={`glass-card-strong border border-white/20 bg-black/90 backdrop-blur-xl h-full flex flex-col mx-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="text-lg font-medium bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:border-none p-0 h-auto"
            placeholder="Enter title..."
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 mr-6">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0 px-8 py-3"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Content Statistics */}
          <div className="px-6 py-3 border-b border-white/10 bg-black/20 flex-shrink-0">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{wordCount} words</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>{characterCount} characters</span>
              </div>
              {metadata?.predicted_engagement && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">{metadata.predicted_engagement}/10 engagement</span>
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 p-6 overflow-hidden">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your content here..."
              className="w-full h-full resize-none bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 text-base leading-relaxed"
            />
          </div>
        </div>

        <div className="w-80 border-l border-white/10 bg-black/20 flex flex-col flex-shrink-0 mr-6">
          <div className="p-8 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">AI Assistant</h3>
                <p className="text-gray-300 text-sm">Enhance your content with AI-powered tools</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 p-0 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-8">
            <div className="space-y-6">
              {/* Generate Content Button */}
              <Button
                onClick={handleGenerateContent}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 border-0 h-12"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Content
              </Button>

              <Separator className="bg-white/10" />

              {/* AI Tools */}
              <div className="space-y-4">
                <Label className="text-gray-300 text-sm">Enhancement Tools</Label>
                {aiTools.map((tool) => {
                  const Icon = tool.icon
                  const isActive = activeAITool === tool.id

                  return (
                    <Button
                      key={tool.id}
                      onClick={() => handleAIAssist(tool)}
                      disabled={isProcessing}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center flex-shrink-0`}
                        >
                          {isActive ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-gray-400 mt-1 line-clamp-2">{tool.description}</div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>

              {/* Metadata */}
              {metadata && (
                <>
                  <Separator className="bg-white/10" />
                  <div className="space-y-6">
                    <Label className="text-gray-300 text-sm">Content Details</Label>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Type</span>
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {metadata.type}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Status</span>
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {metadata.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Priority</span>
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {metadata.priority}
                        </Badge>
                      </div>

                      {metadata.viral_analysis_score && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Viral Score</span>
                            <span className="text-green-400 text-sm">{metadata.viral_analysis_score}%</span>
                          </div>
                          <Progress value={metadata.viral_analysis_score} className="h-2" />
                        </div>
                      )}

                      {metadata.tags && metadata.tags.length > 0 && (
                        <div>
                          <span className="text-gray-400 text-sm block mb-2">Tags</span>
                          <div className="flex flex-wrap gap-2">
                            {metadata.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-white/20 text-gray-300 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {metadata.platforms && metadata.platforms.length > 0 && (
                        <div>
                          <span className="text-gray-400 text-sm block mb-2">Platforms</span>
                          <div className="flex flex-wrap gap-2">
                            {metadata.platforms.map((platform, index) => (
                              <Badge key={index} variant="outline" className="border-white/20 text-gray-300 text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
