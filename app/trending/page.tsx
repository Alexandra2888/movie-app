import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { getTrendingContent } from "@/lib/data";

export default function TrendingPage() {
  const trendingContent = getTrendingContent();

  return (
    <div className="flex min-h-screen bg-blue-950">
      <Navigation />
      <main className="flex-1 lg:ml-24 pt-20 lg:pt-0 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10">
        <h1 className="text-preset-1 text-white mb-4 md:mb-6 lg:mb-8">
          All Trending Content
        </h1>
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SearchBar />
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {trendingContent.map((item) => (
              <MovieCard
                key={item.id}
                title={item.title}
                year={item.year}
                category={item.category}
                rating={item.rating}
                thumbnail={item.thumbnail}
                isBookmarked={item.isBookmarked}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

