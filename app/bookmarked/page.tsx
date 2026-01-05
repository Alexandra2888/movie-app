"use client";

import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import SearchResults from "@/components/SearchResults";
import { searchMovies, OMDBMovie } from "@/lib/omdb";
import { useState, useCallback } from "react";

export default function BookmarkedPage() {
  // For now, bookmarked is empty - can be enhanced with localStorage later
  const bookmarkedContent: OMDBMovie[] = [];
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<OMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
        <h1 className="text-preset-1 text-white mb-4 md:mb-6 lg:mb-8">
          Bookmarked
        </h1>
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
          <section>
            {bookmarkedContent.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {bookmarkedContent.map((item) => (
                  <MovieCard
                    key={item.imdbID}
                    title={item.Title}
                    year={parseInt(item.Year) || 0}
                    category={item.Type === "movie" ? "Movie" : "TV Series"}
                    rating={item.Rated || "N/A"}
                    thumbnail={
                      item.Poster && item.Poster !== "N/A"
                        ? item.Poster
                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%231e3a8a' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E"
                    }
                    isBookmarked={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-preset-3 text-white/75">
                  No bookmarked content yet
                </p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
