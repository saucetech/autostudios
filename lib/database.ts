import { sql } from "@vercel/postgres"

export interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source: string
  submitted_at: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

export interface CreateLeadData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source: string
  ip_address?: string
  user_agent?: string
}

export async function saveLead(leadData: CreateLeadData): Promise<Lead> {
  try {
    const result = await sql`
      INSERT INTO leads (name, email, phone, company, message, source, ip_address, user_agent)
      VALUES (
        ${leadData.name},
        ${leadData.email},
        ${leadData.phone || null},
        ${leadData.company || null},
        ${leadData.message},
        ${leadData.source},
        ${leadData.ip_address || null},
        ${leadData.user_agent || null}
      )
      RETURNING *
    `

    const lead = result.rows[0] as Lead
    console.log("New lead saved to database:", { id: lead.id, email: lead.email })

    return lead
  } catch (error) {
    console.error("Error saving lead to database:", error)
    throw new Error("Failed to save lead")
  }
}

export async function getAllLeads(limit = 100, offset = 0): Promise<{ leads: Lead[]; total: number }> {
  try {
    // Get total count
    const countResult = await sql`SELECT COUNT(*) as total FROM leads`
    const total = Number.parseInt(countResult.rows[0].total)

    // Get leads with pagination
    const result = await sql`
      SELECT * FROM leads 
      ORDER BY submitted_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `

    return {
      leads: result.rows as Lead[],
      total,
    }
  } catch (error) {
    console.error("Error fetching leads:", error)
    throw new Error("Failed to fetch leads")
  }
}

export async function getLeadById(id: number): Promise<Lead | null> {
  try {
    const result = await sql`
      SELECT * FROM leads WHERE id = ${id}
    `

    return (result.rows[0] as Lead) || null
  } catch (error) {
    console.error("Error fetching lead by ID:", error)
    throw new Error("Failed to fetch lead")
  }
}

export async function getLeadsByEmail(email: string): Promise<Lead[]> {
  try {
    const result = await sql`
      SELECT * FROM leads 
      WHERE LOWER(email) = LOWER(${email})
      ORDER BY submitted_at DESC
    `

    return result.rows as Lead[]
  } catch (error) {
    console.error("Error fetching leads by email:", error)
    throw new Error("Failed to fetch leads by email")
  }
}

export async function searchLeads(query: string, limit = 50): Promise<Lead[]> {
  try {
    const searchTerm = `%${query}%`
    const result = await sql`
      SELECT * FROM leads 
      WHERE 
        LOWER(name) LIKE LOWER(${searchTerm}) OR
        LOWER(email) LIKE LOWER(${searchTerm}) OR
        LOWER(company) LIKE LOWER(${searchTerm}) OR
        LOWER(message) LIKE LOWER(${searchTerm})
      ORDER BY submitted_at DESC
      LIMIT ${limit}
    `

    return result.rows as Lead[]
  } catch (error) {
    console.error("Error searching leads:", error)
    throw new Error("Failed to search leads")
  }
}

export async function getLeadStats(): Promise<{
  total: number
  thisMonth: number
  thisWeek: number
  today: number
  topCompanies: { company: string; count: number }[]
}> {
  try {
    // Total leads
    const totalResult = await sql`SELECT COUNT(*) as count FROM leads`
    const total = Number.parseInt(totalResult.rows[0].count)

    // This month
    const monthResult = await sql`
      SELECT COUNT(*) as count FROM leads 
      WHERE submitted_at >= DATE_TRUNC('month', NOW())
    `
    const thisMonth = Number.parseInt(monthResult.rows[0].count)

    // This week
    const weekResult = await sql`
      SELECT COUNT(*) as count FROM leads 
      WHERE submitted_at >= DATE_TRUNC('week', NOW())
    `
    const thisWeek = Number.parseInt(weekResult.rows[0].count)

    // Today
    const todayResult = await sql`
      SELECT COUNT(*) as count FROM leads 
      WHERE submitted_at >= DATE_TRUNC('day', NOW())
    `
    const today = Number.parseInt(todayResult.rows[0].count)

    // Top companies
    const companiesResult = await sql`
      SELECT company, COUNT(*) as count 
      FROM leads 
      WHERE company IS NOT NULL AND company != ''
      GROUP BY company 
      ORDER BY count DESC 
      LIMIT 5
    `
    const topCompanies = companiesResult.rows.map((row) => ({
      company: row.company,
      count: Number.parseInt(row.count),
    }))

    return {
      total,
      thisMonth,
      thisWeek,
      today,
      topCompanies,
    }
  } catch (error) {
    console.error("Error fetching lead stats:", error)
    throw new Error("Failed to fetch lead statistics")
  }
}

export async function updateLeadStatus(id: number, status: string, notes?: string): Promise<Lead> {
  try {
    const result = await sql`
      UPDATE leads 
      SET 
        source = ${status},
        message = CASE 
          WHEN ${notes} IS NOT NULL THEN message || E'\n\n--- Status Update ---\n' || ${notes}
          ELSE message
        END,
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.rows.length === 0) {
      throw new Error("Lead not found")
    }

    return result.rows[0] as Lead
  } catch (error) {
    console.error("Error updating lead status:", error)
    throw new Error("Failed to update lead status")
  }
}

export function exportLeadsAsCSV(leads: Lead[]): string {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Message",
    "Source",
    "Submitted At",
    "IP Address",
    "Created At",
    "Updated At",
  ]

  const csvRows = [
    headers.join(","),
    ...leads.map((lead) =>
      [
        lead.id,
        `"${lead.name.replace(/"/g, '""')}"`,
        lead.email,
        lead.phone || "",
        `"${(lead.company || "").replace(/"/g, '""')}"`,
        `"${lead.message.replace(/"/g, '""')}"`,
        `"${lead.source.replace(/"/g, '""')}"`,
        lead.submitted_at,
        lead.ip_address || "",
        lead.created_at,
        lead.updated_at,
      ].join(","),
    ),
  ]

  return csvRows.join("\n")
}

// Database health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
