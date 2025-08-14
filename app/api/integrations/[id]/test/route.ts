import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { IntegrationService } from "@/lib/services/integration-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const integrationService = new IntegrationService()
    const integration = await integrationService.getIntegration(params.id)

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 })
    }

    const isConnected = await integrationService.testConnection(integration)

    // Update integration status based on test result
    await integrationService.updateIntegration(params.id, {
      status: isConnected ? "connected" : "error",
      last_sync: new Date().toISOString(),
    })

    return NextResponse.json({
      success: isConnected,
      message: isConnected ? "Connection successful" : "Connection failed",
    })
  } catch (error) {
    console.error("Error testing integration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
