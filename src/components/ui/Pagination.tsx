"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "./Icons";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;
  const totalItems = 248;
  const itemsPerPage = 50;

  const visiblePages = [1, 2, 3, null, 12, 13, 14];

  /* On mobile, show only prev / current / next */
  const mobilePages = [
    currentPage > 1 ? currentPage - 1 : null,
    currentPage,
    currentPage < totalPages ? currentPage + 1 : null,
  ].filter((p): p is number => p !== null);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 w-full">
      {/* Left side - items per page + count — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm leading-[1.5] text-[var(--color-text-subtle)]">
            Items per page
          </span>
          <button className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm leading-[1.5] text-[var(--color-text-default)]">
              {itemsPerPage}
            </span>
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
        <div className="w-0 h-5 flex items-center justify-center">
          <div className="w-px h-5 bg-[var(--color-border)]" />
        </div>
        <span className="text-sm leading-[1.5] text-[var(--color-text-subtle)]">
          Showing 1 – {Math.min(itemsPerPage, totalItems)} of {totalItems} items
        </span>
      </div>

      {/* Mobile item count */}
      <span className="sm:hidden text-xs text-[var(--color-text-subtle)]">
        Showing 1 – {Math.min(itemsPerPage, totalItems)} of {totalItems}
      </span>

      {/* Right side - page numbers */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Previous */}
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="size-8 md:size-9 flex items-center justify-center border border-[var(--color-border)] cursor-pointer"
        >
          <ArrowLeftIcon className="size-4" />
        </button>

        {/* Desktop page numbers */}
        <div className="hidden sm:flex items-center gap-2 md:gap-3">
          {visiblePages.map((page, i) =>
            page === null ? (
              <span key={`ellipsis-${i}`} className="text-base text-[var(--color-text-default)]">...</span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`size-8 md:size-9 flex items-center justify-center text-[13px] font-medium uppercase cursor-pointer transition-all duration-200 ${
                  currentPage === page
                    ? "bg-[var(--color-action-primary)] text-white"
                    : "border border-[var(--color-action-primary)] text-[var(--color-action-primary)] bg-white"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile page numbers — prev, current, next only */}
        <div className="flex sm:hidden items-center gap-2">
          {mobilePages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`size-8 flex items-center justify-center text-[13px] font-medium uppercase cursor-pointer transition-all duration-200 ${
                currentPage === page
                  ? "bg-[var(--color-action-primary)] text-white"
                  : "border border-[var(--color-action-primary)] text-[var(--color-action-primary)] bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="size-8 md:size-9 flex items-center justify-center border border-[var(--color-border)] cursor-pointer"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
