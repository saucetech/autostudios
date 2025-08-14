import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { AutomationService } from "@/lib/services/automation-service"

export async function GET() {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automationService = new AutomationService()
    const templates = await automationService.getTemplates()

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Error fetching automation templates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
