"use client";

import { InstagramIcon, TikTokIcon, ChevronDownIcon } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-3 md:px-4 py-4 md:py-5">
      <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full">
        <p className="w-full md:w-auto md:flex-1 min-w-0 text-xs md:text-sm leading-normal uppercase text-[var(--color-text-disabled)] font-medium">
          Copyright &copy; 2026 | All Rights reserved
        </p>
        <div className="flex items-center gap-4 md:gap-6">
          <InstagramIcon className="size-4 text-[var(--color-text-default)] shrink-0" />
          <TikTokIcon className="size-4 text-[var(--color-text-default)] shrink-0" />
          <button className="flex items-center gap-1 shrink-0 cursor-pointer">
            <span className="text-xs md:text-sm leading-none uppercase font-medium text-[var(--color-text-default)]">
              $ USD
            </span>
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
