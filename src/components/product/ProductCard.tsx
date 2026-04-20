"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon, CloseIcon } from "../ui/Icons";
import SaveToProjectPopover from "./SaveToProjectPopover";
import type { Product } from "@/data/mock";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const aspectClass = product.aspectRatio === "1:1" ? "aspect-square" : "aspect-[2/3]";

  const handleClosePopover = useCallback(() => {
    setShowPopover(false);
  }, []);

  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col items-start w-full group transition-transform duration-200 hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        /* Keep popover open even when mouse leaves card */
      }}
    >
      {/* Product thumbnail */}
      <div className={`relative w-full ${aspectClass} bg-[var(--color-grey-50)] overflow-hidden`}>
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Bookmark / Close button on hover */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || showPopover ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-0 left-0 p-3 backdrop-blur-[7.5px] bg-white/50 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPopover((prev) => !prev);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {showPopover ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <CloseIcon className="size-6 text-[var(--color-text-default)]" />
              </motion.div>
            ) : (
              <motion.div
                key="bookmark"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <BookmarkIcon className="size-6 text-[var(--color-text-default)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Save-to-Project Popover */}
        {showPopover && (
          <div className="absolute top-12 left-0 z-50" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <SaveToProjectPopover onClose={handleClosePopover} />
          </div>
        )}

        {/* Dimensions on hover */}
        {product.dimensions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-0 left-0 p-3 backdrop-blur-[7.5px] bg-white/50"
          >
            <span className="text-sm leading-[1.25] text-[var(--color-text-subtle)]">
              {product.dimensions}
            </span>
          </motion.div>
        )}

        {/* Out of stock badge */}
        {product.outOfStock && (
          <div className="absolute top-0 right-0 size-12 bg-[var(--color-text-default)] text-white flex items-center justify-center text-[10px] font-medium uppercase">
            Sold
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex items-start py-3 w-full">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0 text-[var(--color-text-default)]">
          <p className="font-semibold text-sm leading-[1.25] uppercase w-full">
            {product.title}
          </p>
          <div className="flex items-center gap-2 w-full">
            <p className="flex-1 min-w-0 text-xs leading-[1.25]">
              {product.seller}
            </p>
            <p className="text-sm font-medium leading-[1.25] whitespace-nowrap">
              <span className="font-sans">$</span>
              <span className="font-mono">{product.price.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
