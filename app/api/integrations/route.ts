import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { IntegrationService } from "@/lib/services/integration-service"

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

    const integrationService = new IntegrationService()
    const integrations = await integrationService.getIntegrations(profile.organization_id)

    return NextResponse.json({ integrations })
  } catch (error) {
    console.error("Error fetching integrations:", error)
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
    const { name, display_name, type, config, credentials } = body

    const integrationService = new IntegrationService()
    const integration = await integrationService.createIntegration({
      organization_id: profile.organization_id,
      name,
      display_name,
      type,
      status: "disconnected",
      config: config || {},
      credentials: credentials || {},
    })

    return NextResponse.json({ integration })
  } catch (error) {
    console.error("Error creating integration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
