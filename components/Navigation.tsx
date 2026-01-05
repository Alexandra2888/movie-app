"use client";

import { Film, LayoutGrid, Tv, Bookmark, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "home", icon: LayoutGrid, label: "Home", href: "/" },
  { id: "movies", icon: Film, label: "Movies", href: "/movies" },
  { id: "tv", icon: Tv, label: "TV Series", href: "/tv-series" },
  {
    id: "bookmarked",
    icon: Bookmark,
    label: "Bookmarked",
    href: "/bookmarked",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: Vertical Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[96px] bg-blue-950 flex-col items-center py-8 z-10 overflow-hidden">
        <Link href="/" className="mb-16" data-testid="nav-logo">
          <Film className="w-8 h-8 text-red-500" />
        </Link>
        <nav className="flex flex-col gap-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative group flex items-center justify-center w-full"
                aria-label={item.label}
                data-testid={`nav-${item.id}`}
              >
                {isActive && (
                  <div
                    className="absolute left-0 w-1 h-8 rounded-r-full"
                    style={{ backgroundColor: "var(--ds-purple)" }}
                  />
                )}
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-white" : "text-blue-500"
                  } group-hover:text-white`}
                />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Tablet/Mobile: Horizontal Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-blue-950 flex items-center justify-between px-4 md:px-6 z-10">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" data-testid="nav-logo-mobile">
            <Film className="w-6 h-6 md:w-8 md:h-8 text-red-500 shrink-0" />
          </Link>
          <nav className="flex items-center gap-4 md:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="relative group flex items-center justify-center"
                  aria-label={item.label}
                  data-testid={`nav-${item.id}-mobile`}
                >
                  <Icon
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                      isActive ? "text-white" : "text-blue-500"
                    } group-hover:text-white`}
                  />
                  {isActive && (
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5 md:h-1 rounded-full"
                      style={{ backgroundColor: "var(--ds-purple)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center"
          aria-label="User profile"
          data-testid="user-profile-btn"
        >
          <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </button>
      </header>
    </>
  );
}
