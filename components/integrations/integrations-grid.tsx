"use client"

import { useState, useEffect } from "react"
import { type Integration, INTEGRATION_TEMPLATES } from "@/lib/services/integration-service"
import { IntegrationCard } from "./integration-card"

export function IntegrationsGrid() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      const response = await fetch("/api/integrations")
      const data = await response.json()
      setIntegrations(data.integrations || [])
    } catch (error) {
      console.error("Error fetching integrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const getConnectedIntegration = (templateName: string): Integration | undefined => {
    return integrations.find((integration) => integration.name === templateName)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dashboard-card p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-700 rounded-xl mb-4"></div>
            <div className="h-5 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-700 rounded mb-4"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {INTEGRATION_TEMPLATES.map((template) => {
        const connectedIntegration = getConnectedIntegration(template.name)
        return (
          <IntegrationCard
            key={template.name}
            template={template}
            integration={connectedIntegration}
            onUpdate={fetchIntegrations}
          />
        )
      })}
    </div>
  )
}
