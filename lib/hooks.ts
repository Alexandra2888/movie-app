import { useEffect, useState } from "react";
import { searchMovies, OMDBMovie } from "./omdb";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Popular movie/TV series titles to fetch
const POPULAR_MOVIES = [
  "The Dark Knight",
  "Inception",
  "Interstellar",
  "The Matrix",
  "Pulp Fiction",
  "Fight Club",
  "Forrest Gump",
  "The Shawshank Redemption",
  "The Godfather",
  "Avatar",
  "Titanic",
  "Jurassic Park",
];

const POPULAR_TV_SERIES = [
  "Game of Thrones",
  "Breaking Bad",
  "The Office",
  "Stranger Things",
  "The Crown",
  "The Mandalorian",
  "The Witcher",
  "House of Cards",
];

export function usePopularMovies() {
  const [movies, setMovies] = useState<OMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const results: OMDBMovie[] = [];

      for (const title of POPULAR_MOVIES) {
        try {
          const response = await searchMovies(title, "movie", 1);
          if (
            response.Response === "True" &&
            response.Search &&
            response.Search.length > 0
          ) {
            results.push(response.Search[0]);
          }
          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Failed to fetch ${title}:`, error);
        }
      }

      setMovies(results);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  return { movies, isLoading };
}

export function usePopularTVSeries() {
  const [series, setSeries] = useState<OMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      const results: OMDBMovie[] = [];

      for (const title of POPULAR_TV_SERIES) {
        try {
          const response = await searchMovies(title, "series", 1);
          if (
            response.Response === "True" &&
            response.Search &&
            response.Search.length > 0
          ) {
            results.push(response.Search[0]);
          }
          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Failed to fetch ${title}:`, error);
        }
      }

      setSeries(results);
      setIsLoading(false);
    };

    fetchSeries();
  }, []);

  return { series, isLoading };
}

export function useTrendingContent() {
  const [content, setContent] = useState<OMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      const trendingTitles = [
        "Avengers Endgame",
        "Spider-Man",
        "The Dark Knight",
        "Inception",
        "Interstellar",
      ];
      const results: OMDBMovie[] = [];

      for (const title of trendingTitles) {
        try {
          const response = await searchMovies(title, "movie", 1);
          if (
            response.Response === "True" &&
            response.Search &&
            response.Search.length > 0
          ) {
            results.push(response.Search[0]);
          }
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Failed to fetch ${title}:`, error);
        }
      }

      setContent(results);
      setIsLoading(false);
    };

    fetchTrending();
  }, []);

  return { content, isLoading };
}

export function useMoviePosters(
  movies: Array<{ title: string; year: number }>
) {
  const [posters, setPosters] = useState<Record<string, string>>({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // Only fetch once
    if (fetched || movies.length === 0) return;

    const fetchPosters = async () => {
      const posterMap: Record<string, string> = {};

      // Fetch posters for each movie with a small delay to avoid rate limiting
      for (const movie of movies) {
        try {
          const response = await fetch(
            `/api/movies?t=${encodeURIComponent(movie.title)}&y=${movie.year}`
          );

          // Handle both success and expected errors (400/404 for movies that don't exist)
          if (response.ok) {
            const data = await response.json();
            if (
              data.Response === "True" &&
              data.Poster &&
              data.Poster !== "N/A"
            ) {
              const key = `${movie.title}-${movie.year}`;
              posterMap[key] = data.Poster;
            }
          } else if (response.status === 400 || response.status === 404) {
            // Movie doesn't exist in OMDb - this is expected for fictional movies
            // Silently skip
          } else {
            // Other errors - log but don't spam
            console.warn(
              `Failed to fetch poster for ${movie.title}: ${response.status}`
            );
          }

          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          // Network errors - skip silently
        }
      }

      setPosters(posterMap);
      setFetched(true);
    };

    fetchPosters();
  }, [movies, fetched]);

  return posters;
}
