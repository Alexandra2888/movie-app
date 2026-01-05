"use client";

import { Bookmark, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface MovieCardProps {
  title: string;
  year: number;
  category: "Movie" | "TV Series";
  rating: string;
  thumbnail: string;
  isBookmarked?: boolean;
  variant?: "vertical" | "horizontal";
}

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%231e3a8a' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";

function getImageSrc(thumbnail: string): string {
  if (!thumbnail || thumbnail === "N/A") {
    return PLACEHOLDER_IMAGE;
  }
  // If it's a local thumbnail path that likely doesn't exist, use placeholder
  if (thumbnail.startsWith("/thumbnails/")) {
    return PLACEHOLDER_IMAGE;
  }
  return thumbnail;
}

function isExternalImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export default function MovieCard({
  title,
  year,
  category,
  rating,
  thumbnail,
  isBookmarked = false,
  variant = "vertical",
}: MovieCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [imageSrc, setImageSrc] = useState(() => getImageSrc(thumbnail));
  const [hasError, setHasError] = useState(false);

  // Update image source when thumbnail changes and validate external images
  useEffect(() => {
    const newSrc = getImageSrc(thumbnail);
    setImageSrc(newSrc);
    setHasError(false);

    // Pre-validate external images
    if (isExternalImage(newSrc)) {
      const img = new window.Image();
      img.onerror = () => {
        setHasError(true);
        setImageSrc(PLACEHOLDER_IMAGE);
      };
      img.onload = () => {
        setHasError(false);
      };
      img.src = newSrc;
    }
  }, [thumbnail]);

  if (variant === "horizontal") {
    return (
      <div className="relative group cursor-pointer">
        <div className="relative w-full h-[140px] md:h-[230px] rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 240px, 470px"
            unoptimized={
              isExternalImage(imageSrc) || imageSrc.startsWith("data:")
            }
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          {/* Hover overlay with play button */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
              <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
              <span className="text-preset-4 text-white font-medium">Play</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBookmarked(!bookmarked);
            }}
            className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 rounded-full bg-blue-900/50 hover:bg-white/20 flex items-center justify-center transition-colors z-30"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark
              className={`w-4 h-4 ${
                bookmarked ? "fill-white text-white" : "text-white"
              }`}
            />
          </button>
          <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6">
            <div className="text-preset-5 text-white/75 flex items-center gap-2 mb-1 md:mb-2">
              <span>{year}</span>
              <span>•</span>
              <span>{category}</span>
              <span>•</span>
              <span>{rating}</span>
            </div>
            <h3 className="text-preset-3 md:text-preset-2-medium text-white">
              {title}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer">
      <div className="relative w-full aspect-2/3 rounded-lg overflow-hidden mb-2">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized={
            isExternalImage(imageSrc) || imageSrc.startsWith("data:")
          }
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBookmarked(!bookmarked);
          }}
          className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-900/50 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark
            className={`w-3 h-3 md:w-4 md:h-4 ${
              bookmarked ? "fill-white text-white" : "text-white"
            }`}
          />
        </button>
      </div>
      <div className="text-preset-5 text-white/75 flex items-center gap-1.5 md:gap-2 mb-1">
        <span>{year}</span>
        <span>•</span>
        <span>{category}</span>
        <span>•</span>
        <span>{rating}</span>
      </div>
      <h3 className="text-preset-4 md:text-preset-3 text-white">{title}</h3>
    </div>
  );
}
