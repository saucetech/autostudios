import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { competitorId, platform, username } = await request.json()

    if (!competitorId || !platform || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Trigger n8n workflow for competitor video scraping
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_BASE_URL + "/webhook/scrape-competitor-videos"

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.N8N_API_KEY}`,
      },
      body: JSON.stringify({
        competitorId,
        platform,
        username,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: "Video scraping initiated successfully",
      workflowId: result.workflowId,
    })
  } catch (error) {
    console.error("Error triggering video scraping:", error)
    return NextResponse.json({ error: "Failed to initiate video scraping" }, { status: 500 })
  }
}
