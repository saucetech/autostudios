import { type NextRequest, NextResponse } from "next/server"
import { getAllLeads, exportLeadsAsCSV, getLeadStats, searchLeads } from "@/lib/database"

// Simple authentication - replace with proper auth in production
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

function authenticate(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  const password = authHeader?.replace("Bearer ", "")
  return password === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search")
    const stats = searchParams.get("stats") === "true"

    // Return statistics
    if (stats) {
      const statistics = await getLeadStats()
      return NextResponse.json({
        success: true,
        stats: statistics,
      })
    }

    // Handle search
    if (search) {
      const leads = await searchLeads(search, limit)
      return NextResponse.json({
        success: true,
        leads,
        count: leads.length,
        search: search,
      })
    }

    // Get paginated leads
    const offset = (page - 1) * limit
    const { leads, total } = await getAllLeads(limit, offset)

    // Return CSV format
    if (format === "csv") {
      const csv = exportLeadsAsCSV(leads)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    // Return JSON format
    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
