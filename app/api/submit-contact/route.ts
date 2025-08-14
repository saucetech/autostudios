import { type NextRequest, NextResponse } from "next/server"
import { saveLead } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Get client information
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Save to database
    const lead = await saveLead({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || undefined,
      company: formData.company?.trim() || undefined,
      message: formData.message.trim(),
      source: "Contact Form - Autonomous Studios Website",
      ip_address: clientIP,
      user_agent: userAgent,
    })

    // Send notification email (optional)
    await sendNotificationEmail(lead)

    // Send to external services (optional)
    await Promise.allSettled([sendToGoogleSheets(lead), sendSlackNotification(lead), sendToGoHighLevel(lead)])

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      leadId: lead.id,
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json(
      {
        error: "We're experiencing technical difficulties. Please try again or contact us directly.",
      },
      { status: 500 },
    )
  }
}

// Optional: Send notification email using Resend
async function sendNotificationEmail(lead: any) {
  try {
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "leads@autonomousstudios.com", // Replace with your verified domain
          to: [process.env.NOTIFICATION_EMAIL],
          subject: `🚀 New Lead: ${lead.name} from ${lead.company || "Unknown Company"}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #8b5cf6;">New Contact Form Submission</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${lead.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
                <p><strong>Phone:</strong> ${lead.phone ? `<a href="tel:${lead.phone}">${lead.phone}</a>` : "Not provided"}</p>
                <p><strong>Company:</strong> ${lead.company || "Not provided"}</p>
              </div>
              
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${lead.message}</p>
              </div>
              
              <div style="font-size: 12px; color: #64748b; margin-top: 20px;">
                <p><strong>Submitted:</strong> ${new Date(lead.submitted_at).toLocaleString()}</p>
                <p><strong>IP Address:</strong> ${lead.ip_address}</p>
                <p><strong>Lead ID:</strong> ${lead.id}</p>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #8b5cf6; border-radius: 8px;">
                <p style="color: white; margin: 0;">
                  <a href="${process.env.VERCEL_URL || "https://your-domain.com"}/admin/leads" 
                     style="color: white; text-decoration: none;">
                    👉 View in Admin Dashboard
                  </a>
                </p>
              </div>
            </div>
          `,
        }),
      })

      if (!response.ok) {
        console.error("Failed to send notification email:", await response.text())
      } else {
        console.log("Notification email sent successfully")
      }
    }
  } catch (error) {
    console.error("Email notification error:", error)
  }
}

// Optional: Send to Google Sheets
async function sendToGoogleSheets(lead: any) {
  try {
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone || "",
          company: lead.company || "",
          message: lead.message,
          submittedAt: lead.submitted_at,
          ipAddress: lead.ip_address,
        }),
      })
      console.log("Lead sent to Google Sheets")
    }
  } catch (error) {
    console.error("Google Sheets error:", error)
  }
}

// Optional: Send Slack notification
async function sendSlackNotification(lead: any) {
  try {
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🚀 New Lead Alert!`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Contact Form Submission*\n\n*Name:* ${lead.name}\n*Email:* ${lead.email}\n*Company:* ${lead.company || "Not provided"}\n*Phone:* ${lead.phone || "Not provided"}`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Message:*\n${lead.message}`,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Lead ID: ${lead.id} | Submitted: ${new Date(lead.submitted_at).toLocaleString()}`,
                },
              ],
            },
          ],
        }),
      })
      console.log("Slack notification sent")
    }
  } catch (error) {
    console.error("Slack notification error:", error)
  }
}

// Optional: Send to GoHighLevel (for future use)
async function sendToGoHighLevel(lead: any) {
  try {
    if (process.env.GOHIGHLEVEL_WEBHOOK_URL) {
      await fetch(process.env.GOHIGHLEVEL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || "",
          company: lead.company || "",
          message: lead.message,
          source: lead.source,
          customFields: {
            lead_id: lead.id.toString(),
            submitted_at: lead.submitted_at,
            ip_address: lead.ip_address,
          },
        }),
      })
      console.log("Lead sent to GoHighLevel")
    }
  } catch (error) {
    console.error("GoHighLevel error:", error)
  }
}
