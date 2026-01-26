import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    // Validate required credentials
    if (!clientId || !clientSecret) {
      console.error("[Twitch Auth] Missing credentials");
      return NextResponse.json(
        { error: "Missing Twitch credentials" },
        { status: 400 }
      );
    }

    // Request access token from Twitch
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    console.log("[Twitch Auth] Successfully obtained access token");

    // Return the access token and expiration info
    return NextResponse.json(
      { access_token, expires_in },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "[Twitch Auth] Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { error: "Failed to authenticate with Twitch" },
      { status: 500 }
    );
  }
}
