"use client";

import { InstagramIcon, TikTokIcon, ChevronDownIcon } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-5">
      <div className="flex items-center w-full">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <p className="flex-1 min-w-0 text-sm leading-none uppercase text-[var(--color-text-disabled)] font-medium">
            Copyright &copy; 2026 | All Rights reserved
          </p>
          <InstagramIcon className="size-4 text-[var(--color-text-default)] shrink-0" />
          <TikTokIcon className="size-4 text-[var(--color-text-default)] shrink-0" />
          <button className="flex items-center gap-1 shrink-0 cursor-pointer">
            <span className="text-sm leading-none uppercase font-medium text-[var(--color-text-default)]">
              $ USD
            </span>
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
