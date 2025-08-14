"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Key, Webhook } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  authType: "api_key" | "oauth" | "webhook"
  icon: string
}

interface IntegrationTemplate {
  id: string
  display_name: string
  description: string
  auth_type: "api_key" | "oauth" | "webhook"
  icon: string
  category: string
}

interface ConnectIntegrationDialogProps {
  integration?: Integration
  template?: IntegrationTemplate
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess?: () => void
}

export function ConnectIntegrationDialog({
  integration,
  template,
  trigger,
  open,
  onOpenChange,
  onSuccess,
}: ConnectIntegrationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  const integrationData =
    integration ||
    (template
      ? {
          id: template.id,
          name: template.display_name,
          description: template.description,
          authType: template.auth_type as "api_key" | "oauth" | "webhook",
          icon: template.icon,
        }
      : null)

  if (!integrationData) {
    return null
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error connecting integration:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleOAuthConnect = () => {
    // Redirect to OAuth provider
    window.open(`/api/auth/${integrationData.id}`, "_blank")
  }

  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="glass-card-strong border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-xl">
              <Settings className="w-6 h-6" />
              <span>Connect {integrationData.name}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-200 text-base">{integrationData.description}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={integrationData.authType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card-subtle">
              <TabsTrigger
                value="api_key"
                disabled={integrationData.authType !== "api_key"}
                className="data-[state=active]:bg-white/10"
              >
                API Key
              </TabsTrigger>
              <TabsTrigger
                value="oauth"
                disabled={integrationData.authType !== "oauth"}
                className="data-[state=active]:bg-white/10"
              >
                OAuth
              </TabsTrigger>
              <TabsTrigger
                value="webhook"
                disabled={integrationData.authType !== "webhook"}
                className="data-[state=active]:bg-white/10"
              >
                Webhook
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api_key" className="space-y-4">
              <Card className="glass-card-subtle border-white/20">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center space-x-2 text-white">
                    <Key className="w-4 h-4" />
                    <span>API Key Authentication</span>
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Enter your API key to connect this integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="api-key" className="text-gray-200 font-medium">
                      API Key
                    </Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="glass-input mt-2 text-white placeholder-gray-300"
                    />
                  </div>
                  <Button
                    onClick={handleConnect}
                    disabled={!apiKey || isConnecting}
                    className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="oauth" className="space-y-4">
              <Card className="glass-card-subtle border-white/20">
                <CardContent className="pt-6">
                  <Button
                    onClick={handleOAuthConnect}
                    className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Connect with {integrationData.name}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhook" className="space-y-4">
              <Card className="glass-card-subtle border-white/20">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center space-x-2 text-white">
                    <Webhook className="w-4 h-4" />
                    <span>Webhook Configuration</span>
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    Configure webhook URL for this integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url" className="text-gray-200 font-medium">
                      Webhook URL
                    </Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-app.com/webhooks/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="glass-input mt-2 text-white placeholder-gray-300"
                    />
                  </div>
                  <Button
                    onClick={handleConnect}
                    disabled={!webhookUrl || isConnecting}
                    className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isConnecting ? "Configuring..." : "Configure Webhook"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-card-strong border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            <Settings className="w-6 h-6" />
            <span>Connect {integrationData.name}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-200 text-base">{integrationData.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={integrationData.authType} className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card-subtle">
            <TabsTrigger
              value="api_key"
              disabled={integrationData.authType !== "api_key"}
              className="data-[state=active]:bg-white/10"
            >
              API Key
            </TabsTrigger>
            <TabsTrigger
              value="oauth"
              disabled={integrationData.authType !== "oauth"}
              className="data-[state=active]:bg-white/10"
            >
              OAuth
            </TabsTrigger>
            <TabsTrigger
              value="webhook"
              disabled={integrationData.authType !== "webhook"}
              className="data-[state=active]:bg-white/10"
            >
              Webhook
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api_key" className="space-y-4">
            <Card className="glass-card-subtle border-white/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2 text-white">
                  <Key className="w-4 h-4" />
                  <span>API Key Authentication</span>
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Enter your API key to connect this integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="api-key" className="text-gray-200 font-medium">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="glass-input mt-2 text-white placeholder-gray-300"
                  />
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={!apiKey || isConnecting}
                  className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="oauth" className="space-y-4">
            <Card className="glass-card-subtle border-white/20">
              <CardContent className="pt-6">
                <Button
                  onClick={handleOAuthConnect}
                  className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Connect with {integrationData.name}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhook" className="space-y-4">
            <Card className="glass-card-subtle border-white/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2 text-white">
                  <Webhook className="w-4 h-4" />
                  <span>Webhook Configuration</span>
                </CardTitle>
                <CardDescription className="text-gray-200">Configure webhook URL for this integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url" className="text-gray-200 font-medium">
                    Webhook URL
                  </Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://your-app.com/webhooks/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="glass-input mt-2 text-white placeholder-gray-300"
                  />
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={!webhookUrl || isConnecting}
                  className="w-full primary-button py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isConnecting ? "Configuring..." : "Configure Webhook"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
