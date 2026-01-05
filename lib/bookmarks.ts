import { OMDBMovie } from "./omdb";

const BOOKMARKS_KEY = "movie-app-bookmarks";

export function getBookmarks(): OMDBMovie[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
}

export function addBookmark(movie: OMDBMovie): void {
  if (typeof window === "undefined") return;

  try {
    const bookmarks = getBookmarks();
    if (!bookmarks.find((b) => b.imdbID === movie.imdbID)) {
      bookmarks.push(movie);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("bookmarks-changed"));
    }
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
}

export function removeBookmark(imdbID: string): void {
  if (typeof window === "undefined") return;

  try {
    const bookmarks = getBookmarks().filter((b) => b.imdbID !== imdbID);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("bookmarks-changed"));
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
}

export function isBookmarked(imdbID: string): boolean {
  if (typeof window === "undefined") return false;

  const bookmarks = getBookmarks();
  return bookmarks.some((b) => b.imdbID === imdbID);
}

export function toggleBookmark(movie: OMDBMovie): void {
  if (isBookmarked(movie.imdbID)) {
    removeBookmark(movie.imdbID);
  } else {
    addBookmark(movie);
  }
}
