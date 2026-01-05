import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/lib/data";

export default function MoviesPage() {
  const movies = getMovies();

  return (
    <div className="flex min-h-screen bg-blue-950">
      <Navigation />
      <main className="flex-1 lg:ml-24 pt-20 lg:pt-0 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10">
        <h1 className="text-preset-1 text-white mb-4 md:mb-6 lg:mb-8">
          Movies
        </h1>
        <div className="mb-6 md:mb-8 lg:mb-10">
          <SearchBar />
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {movies.map((item) => (
              <MovieCard
                key={item.id}
                title={item.title}
                year={item.year}
                category={item.category}
                rating={item.rating}
                thumbnail={item.thumbnail}
                isBookmarked={item.isBookmarked}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

