"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScourLogo, SearchIcon, MenuIcon, CloseIcon, FilterIcon } from "../ui/Icons";
import MenuPopover from "./MenuPopover";
import CategoriesDropdown from "./CategoriesDropdown";
import SearchPanel from "./SearchPanel";

const navItems = [
  { label: "Categories", href: "#categories" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "My Projects", href: "/projects" },
];

type HeaderProps = {
  onFilterClick?: () => void;
};

export default function Header({ onFilterClick }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoriesClick = () => {
    setCategoriesOpen((prev) => !prev);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
    setCategoriesOpen(false);
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
    setCategoriesOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white flex flex-col">
        {/* Row 1: Logo + nav + actions */}
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href="/" className="flex items-center px-3 md:px-5 py-4 shrink-0">
            <ScourLogo className="h-5 md:h-7" />
          </Link>

          {/* Center nav — hidden on mobile, visible on md+ */}
          <nav className="absolute left-1/2 top-[30px] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = item.href !== "#categories" && pathname === item.href;
              const isCategories = item.href === "#categories";

              return isCategories ? (
                <button
                  key={item.label}
                  onClick={handleCategoriesClick}
                  className={`font-bold text-base leading-none uppercase py-2 transition-colors cursor-pointer ${
                    categoriesOpen
                      ? "text-[var(--color-text-default)] border-b-2 border-[var(--color-text-default)]"
                      : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-bold text-base leading-none uppercase py-2 transition-colors ${
                    isActive
                      ? "text-[var(--color-text-default)] border-b-2 border-[var(--color-text-default)]"
                      : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 p-5 shrink-0">
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-1.5 h-5 cursor-pointer"
            >
              <SearchIcon className="size-5 text-[var(--color-text-subtle)]" />
              <span className="text-base text-[var(--color-text-subtle)]">Search</span>
            </button>
            <button
              onClick={handleMenuClick}
              className="cursor-pointer"
            >
              {menuOpen ? (
                <CloseIcon className="size-5 text-[var(--color-text-default)]" />
              ) : (
                <MenuIcon className="size-5 text-[var(--color-text-default)]" />
              )}
            </button>
          </div>

          {/* Mobile right: just hamburger */}
          <div className="flex md:hidden items-center p-5 shrink-0">
            <button onClick={handleMenuClick} className="cursor-pointer">
              {menuOpen ? (
                <CloseIcon className="size-5 text-[var(--color-text-default)]" />
              ) : (
                <MenuIcon className="size-5 text-[var(--color-text-default)]" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Mobile search + filters — only on mobile */}
        <div className="flex md:hidden items-center bg-white border-t border-[var(--color-border)]">
          <button onClick={handleSearchClick} className="flex-1 flex items-center gap-1.5 px-4 py-2.5 cursor-pointer">
            <SearchIcon className="size-5 text-[var(--color-text-subtle)]" />
            <span className="text-base text-[var(--color-text-subtle)]">Search 100,00+ items</span>
          </button>
          <button onClick={onFilterClick} className="flex items-center gap-2 px-4 py-2.5 shrink-0 cursor-pointer">
            <span className="text-sm font-medium text-[var(--color-text-subtle)]">Filters</span>
            <FilterIcon className="size-5 text-[var(--color-text-subtle)]" />
          </button>
        </div>
      </header>

      <CategoriesDropdown isOpen={categoriesOpen} onClose={() => setCategoriesOpen(false)} />
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MenuPopover isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
