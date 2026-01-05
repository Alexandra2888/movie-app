import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { getTrendingContent, allContent } from "@/lib/data";
import Link from "next/link";

const trendingMovies = getTrendingContent();
const recommendedMovies = allContent.filter((item) => !item.isTrending);

export default function Home() {
  return (
    <div className="flex min-h-screen bg-blue-950">
      <Navigation />
      <main className="flex-1 lg:ml-24 pt-20 lg:pt-0 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10">
        <h1 className="text-preset-1 text-white mb-4 md:mb-6 lg:mb-8">Home</h1>
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SearchBar />
        </div>

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
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="shrink-0 w-[240px] md:w-[470px]">
                <MovieCard
                  title={movie.title}
                  year={movie.year}
                  category={movie.category}
                  rating={movie.rating}
                  thumbnail={movie.thumbnail}
                  isBookmarked={movie.isBookmarked}
                  variant="horizontal"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-preset-2-light text-white mb-3 md:mb-4 lg:mb-6">
            Recommended for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {recommendedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={movie.year}
                category={movie.category}
                rating={movie.rating}
                thumbnail={movie.thumbnail}
                isBookmarked={movie.isBookmarked}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
