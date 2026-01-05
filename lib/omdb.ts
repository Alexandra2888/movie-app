export interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  BoxOffice?: string;
}

export interface OMDBSearchResponse {
  Search?: OMDBMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface OMDBSingleResponse {
  Response: string;
  Error?: string;
}

export async function searchMovies(
  query: string,
  type?: "movie" | "series" | "episode",
  page: number = 1
): Promise<OMDBSearchResponse> {
  const params = new URLSearchParams({
    s: query,
    page: page.toString(),
    ...(type ? { type } : {}),
  });

  const response = await fetch(`/api/movies?${params.toString()}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(
      error.error || `Failed to search movies: ${response.statusText}`
    );
  }

  return response.json();
}

export async function getMovieById(imdbId: string): Promise<OMDBMovie> {
  const response = await fetch(`/api/movies?i=${imdbId}`);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(
      error.error || `Failed to get movie: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}
