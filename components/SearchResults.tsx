"use client";

import { OMDBMovie } from "@/lib/omdb";
import MovieCard from "./MovieCard";

interface SearchResultsProps {
  results: OMDBMovie[];
  query: string;
  isLoading?: boolean;
}

export default function SearchResults({
  results,
  query,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="search-results-loading">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12" data-testid="search-results-empty">
        <p className="text-preset-3 text-white/75">
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <section data-testid="search-results">
      <h2 className="text-preset-2-light text-white mb-3 md:mb-4 lg:mb-6" data-testid="search-results-heading">
        Found {results.length} result{results.length !== 1 ? "s" : ""} for
        &quot;{query}&quot;
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6" data-testid="search-results-grid">
        {results.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={parseInt(movie.Year) || 0}
            category={movie.Type === "movie" ? "Movie" : "TV Series"}
            rating={movie.Rated || "N/A"}
            thumbnail={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%231e3a8a' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E"
            }
            imdbID={movie.imdbID}
            movieData={movie}
          />
        ))}
      </div>
    </section>
  );
}
