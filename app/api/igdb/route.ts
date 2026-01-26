import { igdbClient } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fields, search, limit = 10 } = body;

    // Build the query body for IGDB
    let query = `fields ${fields || "name,rating,summary,cover.url,release_dates.human"}; limit ${limit};`;
    
    if (search) {
      query += ` search "${search}";`;
    }

    // Make the request to IGDB API using the client with interceptors
    const response = await igdbClient.post("/games", query);

    // Return the games data
    return NextResponse.json(
      { games: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("[IGDB Route] Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { error: "Failed to fetch data from IGDB API", details: errorMessage },
      { status: 500 }
    );
  }
}
