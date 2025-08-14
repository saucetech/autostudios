import { createClient } from "@/lib/supabase/server"

export interface AutomationTemplate {
  id: string
  name: string
  display_name: string
  description: string
  category: string
  icon: string
  required_integrations: string[]
  config_schema: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Automation {
  id: string
  organization_id: string
  template_id: string
  name: string
  description?: string
  status: "active" | "inactive" | "error"
  config: Record<string, any>
  n8n_workflow_instance_id?: string
  created_by: string
  created_at: string
  updated_at: string
  template?: AutomationTemplate
}

export class AutomationService {
  private supabase = createClient()

  async getTemplates(): Promise<AutomationTemplate[]> {
    const { data, error } = await this.supabase
      .from("automation_templates")
      .select("*")
      .eq("is_active", true)
      .order("display_name")

    if (error) throw error
    return data || []
  }

  async getTemplate(id: string): Promise<AutomationTemplate | null> {
    const { data, error } = await this.supabase.from("automation_templates").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  async getAutomations(organizationId: string): Promise<Automation[]> {
    const { data, error } = await this.supabase
      .from("automations")
      .select(`
        *,
        template:automation_templates(*)
      `)
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getAutomation(id: string): Promise<Automation | null> {
    const { data, error } = await this.supabase
      .from("automations")
      .select(`
        *,
        template:automation_templates(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  async createAutomation(
    automation: Omit<Automation, "id" | "created_at" | "updated_at" | "template">,
  ): Promise<Automation> {
    const { data, error } = await this.supabase
      .from("automations")
      .insert(automation)
      .select(`
        *,
        template:automation_templates(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  async updateAutomation(id: string, updates: Partial<Automation>): Promise<Automation> {
    const { data, error } = await this.supabase
      .from("automations")
      .update(updates)
      .eq("id", id)
      .select(`
        *,
        template:automation_templates(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  async deleteAutomation(id: string): Promise<void> {
    const { error } = await this.supabase.from("automations").delete().eq("id", id)

    if (error) throw error
  }

  async toggleAutomation(id: string): Promise<Automation> {
    // First get the current automation
    const automation = await this.getAutomation(id)
    if (!automation) throw new Error("Automation not found")

    const newStatus = automation.status === "active" ? "inactive" : "active"
    return this.updateAutomation(id, { status: newStatus })
  }

  async checkRequiredIntegrations(
    templateId: string,
    organizationId: string,
  ): Promise<{
    satisfied: boolean
    missing: string[]
    available: string[]
  }> {
    const template = await this.getTemplate(templateId)
    if (!template) throw new Error("Template not found")

    // Get connected integrations for the organization
    const { data: integrations } = await this.supabase
      .from("integrations")
      .select("name")
      .eq("organization_id", organizationId)
      .eq("status", "connected")

    const connectedIntegrations = integrations?.map((i) => i.name) || []
    const requiredIntegrations = template.required_integrations || []

    const missing = requiredIntegrations.filter((req) => !connectedIntegrations.includes(req))
    const available = requiredIntegrations.filter((req) => connectedIntegrations.includes(req))

    return {
      satisfied: missing.length === 0,
      missing,
      available,
    }
  }
}
