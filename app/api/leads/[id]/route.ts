import { type NextRequest, NextResponse } from "next/server"
import { getLeadById, updateLeadStatus } from "@/lib/database"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

function authenticate(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  const password = authHeader?.replace("Bearer ", "")
  return password === ADMIN_PASSWORD
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const leadId = Number.parseInt(params.id)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    const lead = await getLeadById(leadId)
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      lead,
    })
  } catch (error) {
    console.error("Error fetching lead:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const leadId = Number.parseInt(params.id)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    const { status, notes } = await request.json()
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const updatedLead = await updateLeadStatus(leadId, status, notes)

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      message: "Lead status updated successfully",
    })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
