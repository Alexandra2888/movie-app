import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

const trendingMovies = [
  {
    id: 1,
    title: "Beyond Earth",
    year: 2019,
    category: "Movie" as const,
    rating: "PG",
    thumbnail: "/thumbnails/beyond-earth.jpg",
  },
  {
    id: 2,
    title: "Bottom Gear",
    year: 2021,
    category: "Movie" as const,
    rating: "PG",
    thumbnail: "/thumbnails/bottom-gear.jpg",
  },
  {
    id: 3,
    title: "Undiscovered Cities",
    year: 2019,
    category: "Movie" as const,
    rating: "E",
    thumbnail: "/thumbnails/undiscovered-cities.jpg",
  },
];

const recommendedMovies = [
  {
    id: 4,
    title: "The Great Lands",
    year: 2019,
    category: "Movie" as const,
    rating: "PG",
    thumbnail: "/thumbnails/the-great-lands.jpg",
  },
  {
    id: 5,
    title: "The Diary",
    year: 2019,
    category: "TV Series" as const,
    rating: "PG",
    thumbnail: "/thumbnails/the-diary.jpg",
  },
  {
    id: 6,
    title: "Earth's Untouched",
    year: 2017,
    category: "Movie" as const,
    rating: "18+",
    thumbnail: "/thumbnails/earths-untouched.jpg",
  },
  {
    id: 7,
    title: "No Land Beyond",
    year: 2019,
    category: "Movie" as const,
    rating: "PG",
    thumbnail: "/thumbnails/no-land-beyond.jpg",
  },
  {
    id: 8,
    title: "Autosport The Series",
    year: 2016,
    category: "TV Series" as const,
    rating: "PG",
    thumbnail: "/thumbnails/autosport.jpg",
  },
  {
    id: 9,
    title: "Same Answer II",
    year: 2017,
    category: "Movie" as const,
    rating: "E",
    thumbnail: "/thumbnails/same-answer-ii.jpg",
  },
  {
    id: 10,
    title: "Below Echo",
    year: 2016,
    category: "TV Series" as const,
    rating: "PG",
    thumbnail: "/thumbnails/below-echo.jpg",
  },
];

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
          <h2 className="text-preset-2-light text-white mb-3 md:mb-4 lg:mb-6">
            Trending
          </h2>
          <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[240px] md:w-[470px]"
              >
                <MovieCard {...movie} variant="horizontal" />
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
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
