import { type NextRequest, NextResponse } from "next/server"
import { n8nService, getN8NWorkflowId } from "@/lib/n8n"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { action } = await request.json() // 'activate' or 'deactivate'

    // Get the N8N workflow ID from our mapping
    const n8nWorkflowId = getN8NWorkflowId(id)

    if (!n8nWorkflowId) {
      return NextResponse.json({ error: "Workflow not found or not configured" }, { status: 404 })
    }

    let success = false
    if (action === "activate") {
      success = await n8nService.activateWorkflow(n8nWorkflowId)
    } else if (action === "deactivate") {
      success = await n8nService.deactivateWorkflow(n8nWorkflowId)
    }

    if (!success) {
      return NextResponse.json({ error: `Failed to ${action} workflow` }, { status: 500 })
    }

    return NextResponse.json({ success: true, action })
  } catch (error) {
    console.error("Workflow toggle error:", error)
    return NextResponse.json({ error: "Failed to toggle workflow" }, { status: 500 })
  }
}
