"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Copy, Plus, Trash2, Settings, Webhook, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebhookConfig {
  id: string
  name: string
  url: string
  service: string
  status: "active" | "inactive"
  lastTriggered?: string
  totalTriggers: number
  secret?: string
}

export function WebhookConfigManager() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: "1",
      name: "Stripe Payments",
      url: "https://your-app.com/api/webhooks/stripe",
      service: "stripe",
      status: "active",
      lastTriggered: "2024-01-15T10:30:00Z",
      totalTriggers: 45,
      secret: "whsec_1234567890abcdef",
    },
    {
      id: "2",
      name: "Typeform Submissions",
      url: "https://your-app.com/api/webhooks/typeform",
      service: "typeform",
      status: "active",
      lastTriggered: "2024-01-14T15:20:00Z",
      totalTriggers: 23,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    service: "",
    url: "",
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleWebhook = (id: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, status: webhook.status === "active" ? "inactive" : "active" } : webhook,
      ),
    )
  }

  const deleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id))
  }

  const addWebhook = () => {
    const webhook: WebhookConfig = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      service: newWebhook.service,
      status: "active",
      totalTriggers: 0,
    }
    setWebhooks((prev) => [...prev, webhook])
    setNewWebhook({ name: "", service: "", url: "" })
    setIsAddDialogOpen(false)
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "stripe":
        return "💳"
      case "typeform":
        return "📝"
      case "slack":
        return "💬"
      default:
        return "🔗"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Webhook Configurations</h2>
          <p className="text-gray-200">Manage webhook endpoints for third-party integrations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="primary-button px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card-strong border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Webhook</DialogTitle>
              <DialogDescription className="text-gray-200">
                Configure a new webhook endpoint for your integration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-name" className="text-gray-200 font-medium">
                  Name
                </Label>
                <Input
                  id="webhook-name"
                  placeholder="e.g., Stripe Payments"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook((prev) => ({ ...prev, name: e.target.value }))}
                  className="glass-input mt-2 text-white placeholder-gray-300"
                />
              </div>
              <div>
                <Label htmlFor="webhook-service" className="text-gray-200 font-medium">
                  Service
                </Label>
                <Select
                  value={newWebhook.service}
                  onValueChange={(value) => setNewWebhook((prev) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger className="glass-card-subtle border-white/20 text-white mt-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="glass-card-strong border-white/20">
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="typeform">Typeform</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="webhook-url" className="text-gray-200 font-medium">
                  Webhook URL
                </Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-app.com/api/webhooks/..."
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook((prev) => ({ ...prev, url: e.target.value }))}
                  className="glass-input mt-2 text-white placeholder-gray-300"
                />
              </div>
              <Button
                onClick={addWebhook}
                disabled={!newWebhook.name || !newWebhook.service || !newWebhook.url}
                className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Webhook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="dashboard-card hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{getServiceIcon(webhook.service)}</div>
                  <div>
                    <CardTitle className="text-white flex items-center space-x-3">
                      <span className="text-lg">{webhook.name}</span>
                      <Badge
                        className={
                          webhook.status === "active"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                        }
                      >
                        {webhook.status === "active" ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-gray-200 capitalize font-medium">
                      {webhook.service} webhook
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteWebhook(webhook.id)}
                    className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-200 text-sm font-medium">Webhook URL</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input value={webhook.url} readOnly className="glass-input text-white font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(webhook.url)}
                    className="glass-card-subtle border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {webhook.secret && (
                <div>
                  <Label className="text-gray-200 text-sm font-medium">Webhook Secret</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={webhook.secret}
                      readOnly
                      type="password"
                      className="glass-input text-white font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(webhook.secret!)}
                      className="glass-card-subtle border-white/20 text-white hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-200 font-medium">Last Triggered</p>
                  <p className="text-white">
                    {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : "Never"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-200 font-medium">Total Triggers</p>
                  <p className="text-white font-semibold">{webhook.totalTriggers}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <Switch checked={webhook.status === "active"} onCheckedChange={() => toggleWebhook(webhook.id)} />
                  <span className="text-sm text-gray-200 font-medium">
                    {webhook.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-card-subtle border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {webhooks.length === 0 && (
        <Card className="dashboard-card">
          <CardContent className="p-12 text-center">
            <Webhook className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-white font-semibold text-xl mb-3">No webhooks configured</h3>
            <p className="text-gray-200 text-lg mb-6">
              Add your first webhook to start receiving events from third-party services.
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="primary-button px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Webhook
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
