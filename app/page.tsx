"use client";

import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import SearchResults from "@/components/SearchResults";
import { searchMovies, OMDBMovie } from "@/lib/omdb";
import { useTrendingContent, usePopularMovies } from "@/lib/hooks";
import Link from "next/link";
import { useState, useCallback } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<OMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch real trending and popular movies from OMDb
  const { content: trendingMovies, isLoading: isLoadingTrending } =
    useTrendingContent();
  const { movies: recommendedMovies, isLoading: isLoadingRecommended } =
    usePopularMovies();

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchMovies(query);
      if (results.Response === "True" && results.Search) {
        setSearchResults(results.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="flex min-h-screen bg-blue-950">
      <Navigation />
      <main
        className="flex-1 lg:ml-24 pt-20 lg:pt-0 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10"
        suppressHydrationWarning
      >
        <h1 className="text-preset-1 text-white mb-4 md:mb-6 lg:mb-8">Home</h1>
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {showSearchResults ? (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            isLoading={isSearching}
          />
        ) : (
          <>
            <section className="mb-6 md:mb-8 lg:mb-10">
              <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
                <h2 className="text-preset-2-light text-white">Trending</h2>
                <Link
                  href="/trending"
                  className="text-preset-4 text-white/75 hover:text-white transition-colors"
                >
                  See all
                </Link>
              </div>
              {isLoadingTrending ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                  {trendingMovies.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="shrink-0 w-[240px] md:w-[470px]"
                    >
                      <MovieCard
                        title={movie.Title}
                        year={parseInt(movie.Year) || 0}
                        category={
                          movie.Type === "movie" ? "Movie" : "TV Series"
                        }
                        rating={movie.Rated || "N/A"}
                        thumbnail={
                          movie.Poster && movie.Poster !== "N/A"
                            ? movie.Poster
                            : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%231e3a8a' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E"
                        }
                        imdbID={movie.imdbID}
                        movieData={movie}
                        variant="horizontal"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-preset-2-light text-white mb-3 md:mb-4 lg:mb-6">
                Recommended for you
              </h2>
              {isLoadingRecommended ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                  {recommendedMovies.map((movie) => (
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
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
