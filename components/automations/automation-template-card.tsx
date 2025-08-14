"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Users, TrendingUp } from "lucide-react"

interface AutomationTemplate {
  id: string
  name: string
  description: string
  category: string
  requiredIntegrations: string[]
  estimatedTime: string
  complexity: "beginner" | "intermediate" | "advanced"
}

interface AutomationTemplateCardProps {
  template: AutomationTemplate
  onDeploy: (template: AutomationTemplate) => void
}

export function AutomationTemplateCard({ template, onDeploy }: AutomationTemplateCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "lead generation":
        return <Users className="w-5 h-5" />
      case "social media":
        return <TrendingUp className="w-5 h-5" />
      case "email automation":
        return <Zap className="w-5 h-5" />
      default:
        return <Bot className="w-5 h-5" />
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">{getCategoryIcon(template.category)}</div>
            <div>
              <CardTitle className="text-white text-lg">{template.name}</CardTitle>
              <CardDescription className="text-gray-400">{template.category}</CardDescription>
            </div>
          </div>
          <Badge className={getComplexityColor(template.complexity)}>{template.complexity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm">{template.description}</p>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Required Integrations:</p>
          <div className="flex flex-wrap gap-2">
            {template.requiredIntegrations.map((integration) => (
              <Badge key={integration} variant="outline" className="border-white/20 text-gray-300">
                {integration}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-400">Est. {template.estimatedTime}</span>
          <Button onClick={() => onDeploy(template)} className="bg-purple-600 hover:bg-purple-700 text-white">
            Deploy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
