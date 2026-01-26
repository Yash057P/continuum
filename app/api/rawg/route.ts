import { rawgClient } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    
    const endpoint = searchParams.get("endpoint");
    
    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint parameter is required" },
        { status: 400 }
      );
    }
    
    // Use the RAWG client to forward the request
    const response = await rawgClient.get(endpoint);
    

    // Return the data as JSON
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("[RAWG Route] Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { error: "Failed to fetch data from RAWG API", details: errorMessage },
      { status: 500 }
    );
  }
}