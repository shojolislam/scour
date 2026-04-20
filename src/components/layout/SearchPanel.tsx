"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, CloseIcon } from "../ui/Icons";

type SearchPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Cream overlay */}
          <motion.div
            className="fixed inset-0 top-[60px] z-40 bg-[rgba(220,216,198,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Search bar */}
          <motion.div
            className="fixed top-[60px] left-0 right-0 z-50 bg-white border-t border-[var(--color-border)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-5">
              <SearchIcon className="size-5 text-[var(--color-text-default)] shrink-0" />
              <input
                type="text"
                placeholder="Search by maker, type, location..."
                className="flex-1 text-[14px] md:text-[16px] text-[var(--color-text-default)] placeholder:text-[var(--color-text-subtle)] bg-transparent outline-none"
                autoFocus
              />
              <button onClick={onClose} className="shrink-0 cursor-pointer">
                <CloseIcon className="size-5 text-[var(--color-text-default)]" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
