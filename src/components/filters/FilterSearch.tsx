"use client";

import { SearchIcon } from "../ui/Icons";

export default function FilterSearch() {
  return (
    <div className="flex items-center gap-2 border border-[var(--color-border)] rounded px-2 py-1.5 mb-3">
      <SearchIcon className="size-3.5 text-[var(--color-text-subtle)] shrink-0" />
      <input
        type="text"
        placeholder="Search"
        className="text-[12px] text-[var(--color-text-default)] placeholder:text-[var(--color-text-subtle)] bg-transparent outline-none w-full"
      />
    </div>
  );
}
