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
    return NextResponse.json(
      { error: "OMDB API key not configured" },
      { status: 500 }
    );
  }

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

    const response = await fetch(`${OMDB_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`OMDB API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      return NextResponse.json(
        { error: data.Error || "Movie not found" },
        { status: 404 }
      );
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
