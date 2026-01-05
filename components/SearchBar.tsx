import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-white" />
      <input
        type="text"
        placeholder="Search for movies or TV series"
        className="w-full bg-transparent border-b border-blue-500 pb-3 md:pb-4 pl-8 md:pl-12 pr-4 text-preset-4 md:text-preset-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
      />
    </div>
  );
}

