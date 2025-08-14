import { type NextRequest, NextResponse } from "next/server"
import { n8nService, getN8NWorkflowId } from "@/lib/n8n"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    // Get the N8N workflow ID from our mapping
    const n8nWorkflowId = getN8NWorkflowId(id)

    if (!n8nWorkflowId) {
      return NextResponse.json({ error: "Workflow not found or not configured" }, { status: 404 })
    }

    // Trigger the N8N workflow
    const result = await n8nService.triggerWorkflow(n8nWorkflowId, body)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Workflow trigger error:", error)
    return NextResponse.json({ error: "Failed to trigger workflow" }, { status: 500 })
  }
}
