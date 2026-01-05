"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/lib/hooks";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    } else {
      onSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-white" />
      <input
        type="text"
        placeholder="Search for movies or TV series"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent border-b border-blue-500 pb-3 md:pb-4 pl-8 md:pl-12 pr-4 text-preset-4 md:text-preset-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
