import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoUrl, platform, contentId, title, hook, viralFramework, metrics } = body

    // Trigger n8n workflow for video analysis
    const n8nResponse = await fetch(`${process.env.NEXT_PUBLIC_N8N_BASE_URL}/webhook/analyze-video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.N8N_API_KEY}`,
      },
      body: JSON.stringify({
        videoUrl,
        platform,
        contentId,
        title,
        hook,
        viralFramework,
        metrics,
        analysisType: "detailed_viral_analysis",
        requestedAnalysis: [
          "hook_breakdown",
          "viral_framework_analysis",
          "engagement_triggers",
          "viral_success_factors",
          "content_structure",
          "audience_psychology",
          "replication_strategy",
        ],
      }),
    })

    if (!n8nResponse.ok) {
      throw new Error("Failed to trigger n8n workflow")
    }

    const result = await n8nResponse.json()

    return NextResponse.json({
      success: true,
      message: "Video analysis started successfully",
      workflowId: result.workflowId || "unknown",
    })
  } catch (error) {
    console.error("Error in analyze-video API:", error)
    return NextResponse.json({ error: "Failed to analyze video" }, { status: 500 })
  }
}
