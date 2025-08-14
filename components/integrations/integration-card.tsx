"use client"

import { useState } from "react"
import type { Integration, IntegrationTemplate } from "@/lib/services/integration-service"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  FileText,
  MessageSquare,
  Mail,
  Calendar,
  ShoppingBag,
  Settings,
  Trash2,
  TestTube,
} from "lucide-react"
import { ConnectIntegrationDialog } from "./connect-integration-dialog"

const iconMap = {
  CreditCard,
  FileText,
  MessageSquare,
  Mail,
  Calendar,
  ShoppingBag,
}

interface IntegrationCardProps {
  template: IntegrationTemplate
  integration?: Integration
  onUpdate: () => void
}

export function IntegrationCard({ template, integration, onUpdate }: IntegrationCardProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [showConnectDialog, setShowConnectDialog] = useState(false)

  const Icon = iconMap[template.icon as keyof typeof iconMap] || Settings

  const handleTest = async () => {
    if (!integration) return

    setIsTesting(true)
    try {
      const response = await fetch(`/api/integrations/${integration.id}/test`, {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        onUpdate() // Refresh the integrations list
      }
    } catch (error) {
      console.error("Error testing integration:", error)
    } finally {
      setIsTesting(false)
    }
  }

  const handleDisconnect = async () => {
    if (!integration) return

    try {
      const response = await fetch(`/api/integrations/${integration.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onUpdate() // Refresh the integrations list
      }
    } catch (error) {
      console.error("Error disconnecting integration:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <>
      <div className="dashboard-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors">
                {template.display_name}
              </h3>
              <Badge variant="outline" className="text-xs text-gray-300 border-gray-500/30 mt-1">
                {template.category}
              </Badge>
            </div>
          </div>
          {integration && (
            <Badge className={`text-xs font-medium ${getStatusColor(integration.status)}`}>{integration.status}</Badge>
          )}
        </div>

        <p className="text-gray-200 text-sm mb-6 leading-relaxed">{template.description}</p>

        <div className="flex items-center space-x-3">
          {integration ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={handleTest}
                disabled={isTesting}
                className="flex-1 glass-card-subtle border-white/20 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300 bg-transparent"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? "Testing..." : "Test"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDisconnect}
                className="glass-card-subtle border-red-500/30 text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => setShowConnectDialog(true)}
              disabled={isConnecting}
              className="w-full primary-button py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>
      </div>

      <ConnectIntegrationDialog
        template={template}
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        onSuccess={onUpdate}
      />
    </>
  )
}
