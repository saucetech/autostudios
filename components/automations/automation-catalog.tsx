"use client"

import { useState, useEffect } from "react"
import type { AutomationTemplate } from "@/lib/services/automation-service"
import { AutomationTemplateCard } from "./automation-template-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function AutomationCatalog() {
  const [templates, setTemplates] = useState<AutomationTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/automations/templates")
      const data = await response.json()
      setTemplates(data.templates || [])
    } catch (error) {
      console.error("Error fetching templates:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = Array.from(new Set(templates.map((t) => t.category)))

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-lg p-6 border border-white/10 animate-pulse">
              <div className="h-12 w-12 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategory === null ? "bg-purple-600 text-white" : "border-gray-600 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer capitalize ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace("-", " ")}
            </Badge>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <AutomationTemplateCard key={template.id} template={template} onDeploy={fetchTemplates} />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No automations found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
