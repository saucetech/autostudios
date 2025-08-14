import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { AutomationService } from "@/lib/services/automation-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automationService = new AutomationService()
    const automation = await automationService.toggleAutomation(params.id)

    return NextResponse.json({ automation })
  } catch (error) {
    console.error("Error toggling automation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
