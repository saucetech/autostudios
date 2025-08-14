import { IntegrationsGrid } from "@/components/integrations/integrations-grid"
import { AddIntegrationDialog } from "@/components/integrations/add-integration-dialog"

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-white mb-3 tracking-tight">Integrations</h1>
          <p className="text-gray-200 text-lg">Connect your favorite tools and services to power your automations.</p>
        </div>
        <AddIntegrationDialog />
      </div>

      {/* Integrations Grid */}
      <IntegrationsGrid />
    </div>
  )
}
