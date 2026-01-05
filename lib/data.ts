export interface ContentItem {
  id: number;
  title: string;
  year: number;
  category: "Movie" | "TV Series";
  rating: string;
  thumbnail: string;
  isTrending?: boolean;
  isBookmarked?: boolean;
}

export const allContent: ContentItem[] = [
  {
    id: 1,
    title: "Beyond Earth",
    year: 2019,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/beyond-earth.jpg",
    isTrending: true,
  },
  {
    id: 2,
    title: "Bottom Gear",
    year: 2021,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/bottom-gear.jpg",
    isTrending: true,
  },
  {
    id: 3,
    title: "Undiscovered Cities",
    year: 2019,
    category: "Movie",
    rating: "E",
    thumbnail: "/thumbnails/undiscovered-cities.jpg",
    isTrending: true,
  },
  {
    id: 4,
    title: "The Great Lands",
    year: 2019,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/the-great-lands.jpg",
  },
  {
    id: 5,
    title: "The Diary",
    year: 2019,
    category: "TV Series",
    rating: "PG",
    thumbnail: "/thumbnails/the-diary.jpg",
  },
  {
    id: 6,
    title: "Earth's Untouched",
    year: 2017,
    category: "Movie",
    rating: "18+",
    thumbnail: "/thumbnails/earths-untouched.jpg",
  },
  {
    id: 7,
    title: "No Land Beyond",
    year: 2019,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/no-land-beyond.jpg",
  },
  {
    id: 8,
    title: "Autosport The Series",
    year: 2016,
    category: "TV Series",
    rating: "PG",
    thumbnail: "/thumbnails/autosport.jpg",
  },
  {
    id: 9,
    title: "Same Answer II",
    year: 2017,
    category: "Movie",
    rating: "E",
    thumbnail: "/thumbnails/same-answer-ii.jpg",
  },
  {
    id: 10,
    title: "Below Echo",
    year: 2016,
    category: "TV Series",
    rating: "PG",
    thumbnail: "/thumbnails/below-echo.jpg",
  },
  {
    id: 11,
    title: "During the Hunt",
    year: 2016,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/during-the-hunt.jpg",
  },
  {
    id: 12,
    title: "The Dark Side",
    year: 2018,
    category: "TV Series",
    rating: "18+",
    thumbnail: "/thumbnails/the-dark-side.jpg",
  },
  {
    id: 13,
    title: "Mission: Saturn",
    year: 2017,
    category: "Movie",
    rating: "PG",
    thumbnail: "/thumbnails/mission-saturn.jpg",
  },
  {
    id: 14,
    title: "The Heiress",
    year: 2021,
    category: "TV Series",
    rating: "PG",
    thumbnail: "/thumbnails/the-heiress.jpg",
  },
  {
    id: 15,
    title: "1998",
    year: 2021,
    category: "Movie",
    rating: "18+",
    thumbnail: "/thumbnails/1998.jpg",
  },
  {
    id: 16,
    title: "Dark Side of the Moon",
    year: 2018,
    category: "TV Series",
    rating: "PG",
    thumbnail: "/thumbnails/dark-side-moon.jpg",
  },
];

export const getTrendingContent = (): ContentItem[] => {
  return allContent.filter((item) => item.isTrending);
};

export const getTVSeries = (): ContentItem[] => {
  return allContent.filter((item) => item.category === "TV Series");
};

export const getMovies = (): ContentItem[] => {
  return allContent.filter((item) => item.category === "Movie");
};

