import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { platform, username, displayName, accessToken, refreshToken, apiKey, apiSecret, clientId, clientSecret } =
      body

    // Insert the new social channel
    const { data, error } = await supabase
      .from("social_channels")
      .insert({
        user_id: user.id,
        platform,
        username,
        display_name: displayName || username,
        access_token: accessToken,
        refresh_token: refreshToken,
        api_key: apiKey,
        api_secret: apiSecret,
        client_id: clientId,
        client_secret: clientSecret,
        is_connected: true,
        last_sync: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating social channel:", error)
      return NextResponse.json({ error: "Failed to create social channel" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error in social channels API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("social_channels")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching social channels:", error)
      return NextResponse.json({ error: "Failed to fetch social channels" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error in social channels API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
