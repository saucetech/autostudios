"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import { ConnectIntegrationDialog } from "./connect-integration-dialog"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  authType: "api_key" | "oauth" | "webhook"
  icon: string
  popular: boolean
}

const availableIntegrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and subscription management",
    category: "Payments",
    authType: "api_key",
    icon: "💳",
    popular: true,
  },
  {
    id: "typeform",
    name: "Typeform",
    description: "Form builder and survey platform",
    category: "Forms",
    authType: "webhook",
    icon: "📝",
    popular: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration",
    category: "Communication",
    authType: "oauth",
    icon: "💬",
    popular: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM and marketing automation platform",
    category: "CRM",
    authType: "api_key",
    icon: "🎯",
    popular: false,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and automation",
    category: "Email",
    authType: "api_key",
    icon: "📧",
    popular: false,
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Spreadsheet and data management",
    category: "Productivity",
    authType: "oauth",
    icon: "📊",
    popular: true,
  },
]

export function AddIntegrationDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(availableIntegrations.map((i) => i.category)))]

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularIntegrations = filteredIntegrations.filter((i) => i.popular)
  const otherIntegrations = filteredIntegrations.filter((i) => !i.popular)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="primary-button px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card-strong border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-white">Add Integration</DialogTitle>
          <DialogDescription className="text-gray-200 text-lg">
            Connect your favorite tools and services to power your automations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-12 py-4 text-white placeholder-gray-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "primary-button"
                    : "glass-card-subtle border-white/20 text-gray-200 hover:bg-white/10 hover:text-white"
                }
              >
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>

          {/* Popular Integrations */}
          {popularIntegrations.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Popular Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularIntegrations.map((integration) => (
                  <Card key={integration.id} className="dashboard-card hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-4">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <div className="text-lg font-semibold">{integration.name}</div>
                          <CardDescription className="text-gray-300 font-medium">
                            {integration.category}
                          </CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-200 text-sm mb-6 leading-relaxed">{integration.description}</p>
                      <ConnectIntegrationDialog
                        integration={integration}
                        trigger={
                          <Button className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                            Connect
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other Integrations */}
          {otherIntegrations.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Other Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherIntegrations.map((integration) => (
                  <Card key={integration.id} className="dashboard-card hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-4">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <div className="text-lg font-semibold">{integration.name}</div>
                          <CardDescription className="text-gray-300 font-medium">
                            {integration.category}
                          </CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-200 text-sm mb-6 leading-relaxed">{integration.description}</p>
                      <ConnectIntegrationDialog
                        integration={integration}
                        trigger={
                          <Button className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                            Connect
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No integrations found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
