import { NextRequest, NextResponse } from "next/server";

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = "http://www.omdbapi.com/";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("s"); // Search query
  const type = searchParams.get("type"); // movie, series, or empty
  const page = searchParams.get("page") || "1";
  const imdbId = searchParams.get("i"); // IMDb ID for specific movie

  if (!OMDB_API_KEY) {
    console.error("OMDB_API_KEY is missing from environment variables");
    return NextResponse.json(
      {
        error:
          "OMDB API key not configured. Please add OMDB_API_KEY to your .env.local file.",
      },
      { status: 500 }
    );
  }

  console.log(
    "OMDB_API_KEY exists:",
    OMDB_API_KEY ? "Yes (length: " + OMDB_API_KEY.length + ")" : "No"
  );

  // At least one of search or imdbId is required
  if (!search && !imdbId) {
    return NextResponse.json(
      { error: "Either search query (s) or IMDb ID (i) is required" },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      ...(imdbId ? { i: imdbId } : {}),
      ...(search ? { s: search } : {}),
      ...(type ? { type } : {}),
      ...(page ? { page } : {}),
      r: "json",
    });

    const url = `${OMDB_BASE_URL}?${params.toString()}`;
    console.log(
      "OMDb API Request URL (without key):",
      url.replace(/apikey=[^&]+/, "apikey=***")
    );

    const response = await fetch(url);

    const data = await response.json();

    // Check for API errors first (even if response.ok is true)
    if (data.Response === "False") {
      console.error("OMDb API Error Response:", data.Error);
      // If it's an authentication error, return 401
      if (
        data.Error?.toLowerCase().includes("invalid") ||
        data.Error?.toLowerCase().includes("key")
      ) {
        return NextResponse.json(
          {
            error: `OMDb API authentication failed: ${data.Error}. Please check your API key.`,
          },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: data.Error || "Movie not found" },
        { status: 404 }
      );
    }

    if (!response.ok) {
      console.error(
        "OMDb API HTTP Error:",
        response.status,
        response.statusText
      );
      throw new Error(`OMDB API error: ${response.statusText}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("OMDB API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
