import { type NextRequest, NextResponse } from "next/server"
import { n8nService, getN8NWorkflowId } from "@/lib/n8n"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Get the N8N workflow ID from our mapping
    const n8nWorkflowId = getN8NWorkflowId(id)

    if (!n8nWorkflowId) {
      return NextResponse.json({ error: "Workflow not found or not configured" }, { status: 404 })
    }

    // Get workflow status from N8N
    const workflow = await n8nService.getWorkflow(n8nWorkflowId)

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found in N8N" }, { status: 404 })
    }

    // Get recent executions
    const executions = await n8nService.getExecutions(n8nWorkflowId)
    const recentExecutions = executions.slice(0, 5)

    return NextResponse.json({
      id: workflow.id,
      name: workflow.name,
      active: workflow.active,
      lastUpdated: workflow.updatedAt,
      recentExecutions,
    })
  } catch (error) {
    console.error("Workflow status error:", error)
    return NextResponse.json({ error: "Failed to get workflow status" }, { status: 500 })
  }
}
