import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { AutomationService } from "@/lib/services/automation-service"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's organization
    const { data: profile } = await supabase.from("user_profiles").select("organization_id").eq("id", user.id).single()

    if (!profile?.organization_id) {
      return NextResponse.json({ error: "No organization found" }, { status: 400 })
    }

    const automationService = new AutomationService()
    const automations = await automationService.getAutomations(profile.organization_id)

    return NextResponse.json({ automations })
  } catch (error) {
    console.error("Error fetching automations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's organization
    const { data: profile } = await supabase.from("user_profiles").select("organization_id").eq("id", user.id).single()

    if (!profile?.organization_id) {
      return NextResponse.json({ error: "No organization found" }, { status: 400 })
    }

    const body = await request.json()
    const { template_id, name, description, config } = body

    const automationService = new AutomationService()

    // Check if required integrations are connected
    const integrationCheck = await automationService.checkRequiredIntegrations(template_id, profile.organization_id)

    if (!integrationCheck.satisfied) {
      return NextResponse.json(
        {
          error: "Missing required integrations",
          missing_integrations: integrationCheck.missing,
        },
        { status: 400 },
      )
    }

    const automation = await automationService.createAutomation({
      organization_id: profile.organization_id,
      template_id,
      name,
      description,
      status: "inactive",
      config: config || {},
      created_by: user.id,
    })

    return NextResponse.json({ automation })
  } catch (error) {
    console.error("Error creating automation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
