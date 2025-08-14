import { WebhookConfigManager } from "@/components/webhooks/webhook-config-manager"

export default function WebhooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light text-white mb-3 tracking-tight">Webhooks</h1>
        <p className="text-gray-200 text-lg">Configure webhook endpoints for third-party integrations</p>
      </div>

      <WebhookConfigManager />
    </div>
  )
}
