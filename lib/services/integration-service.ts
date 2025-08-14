import { createClient } from "@/lib/supabase/server"

export interface Integration {
  id: string
  organization_id: string
  name: string
  display_name: string
  type: "webhook" | "api" | "oauth"
  status: "connected" | "disconnected" | "error"
  config: Record<string, any>
  webhook_url?: string
  last_sync?: string
  created_at: string
  updated_at: string
}

export interface IntegrationTemplate {
  name: string
  display_name: string
  description: string
  type: "webhook" | "api" | "oauth"
  icon: string
  category: string
  auth_fields?: Array<{
    name: string
    label: string
    type: "text" | "password" | "url"
    required: boolean
    placeholder?: string
  }>
  webhook_events?: string[]
}

// Available integration templates
export const INTEGRATION_TEMPLATES: IntegrationTemplate[] = [
  {
    name: "stripe",
    display_name: "Stripe",
    description: "Connect your Stripe account to track payments and subscriptions",
    type: "api",
    icon: "CreditCard",
    category: "payments",
    auth_fields: [
      { name: "api_key", label: "Secret Key", type: "password", required: true, placeholder: "sk_..." },
      { name: "webhook_secret", label: "Webhook Secret", type: "password", required: false, placeholder: "whsec_..." },
    ],
  },
  {
    name: "typeform",
    display_name: "Typeform",
    description: "Capture form submissions and trigger automations",
    type: "webhook",
    icon: "FileText",
    category: "forms",
    webhook_events: ["form_response"],
  },
  {
    name: "slack",
    display_name: "Slack",
    description: "Send notifications and messages to Slack channels",
    type: "oauth",
    icon: "MessageSquare",
    category: "communication",
  },
  {
    name: "mailchimp",
    display_name: "Mailchimp",
    description: "Manage email campaigns and subscriber lists",
    type: "api",
    icon: "Mail",
    category: "email",
    auth_fields: [
      { name: "api_key", label: "API Key", type: "password", required: true, placeholder: "your-api-key" },
      { name: "server_prefix", label: "Server Prefix", type: "text", required: true, placeholder: "us1" },
    ],
  },
  {
    name: "google-calendar",
    display_name: "Google Calendar",
    description: "Schedule meetings and manage calendar events",
    type: "oauth",
    icon: "Calendar",
    category: "productivity",
  },
  {
    name: "shopify",
    display_name: "Shopify",
    description: "Sync products, orders, and customer data",
    type: "api",
    icon: "ShoppingBag",
    category: "ecommerce",
    auth_fields: [
      {
        name: "shop_domain",
        label: "Shop Domain",
        type: "text",
        required: true,
        placeholder: "your-shop.myshopify.com",
      },
      { name: "access_token", label: "Access Token", type: "password", required: true, placeholder: "shpat_..." },
    ],
  },
]

export class IntegrationService {
  private supabase = createClient()

  async getIntegrations(organizationId: string): Promise<Integration[]> {
    const { data, error } = await this.supabase
      .from("integrations")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getIntegration(id: string): Promise<Integration | null> {
    const { data, error } = await this.supabase.from("integrations").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  async createIntegration(integration: Omit<Integration, "id" | "created_at" | "updated_at">): Promise<Integration> {
    const { data, error } = await this.supabase.from("integrations").insert(integration).select().single()

    if (error) throw error
    return data
  }

  async updateIntegration(id: string, updates: Partial<Integration>): Promise<Integration> {
    const { data, error } = await this.supabase.from("integrations").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  async deleteIntegration(id: string): Promise<void> {
    const { error } = await this.supabase.from("integrations").delete().eq("id", id)

    if (error) throw error
  }

  async testConnection(integration: Integration): Promise<boolean> {
    // This would implement actual connection testing logic
    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.random() > 0.2), 1000)
    })
  }

  getTemplate(name: string): IntegrationTemplate | undefined {
    return INTEGRATION_TEMPLATES.find((template) => template.name === name)
  }

  getTemplates(): IntegrationTemplate[] {
    return INTEGRATION_TEMPLATES
  }
}
