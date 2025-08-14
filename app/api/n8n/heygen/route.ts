import { type NextRequest, NextResponse } from "next/server"
import { n8nService } from "@/lib/n8n"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { script, title, contentId, type, metadata } = body

    if (!script) {
      return NextResponse.json({ error: "Script content is required" }, { status: 400 })
    }

    // Trigger n8n workflow for Heygen AI Avatar generation
    const response = await n8nService.triggerWebhook("heygen-avatar-generator", {
      script,
      title,
      contentId,
      type,
      metadata,
    })

    return NextResponse.json({
      success: true,
      executionId: response?.executionId || "unknown",
      message: "AI Avatar generation started successfully",
    })
  } catch (error) {
    console.error("Failed to trigger Heygen workflow:", error)
    return NextResponse.json({ error: "Failed to start AI Avatar generation" }, { status: 500 })
  }
}
