"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "../ui/Icons";

type FilterAccordionProps = {
  label: string;
  activeCount?: number;
  children?: React.ReactNode;
};

export default function FilterAccordion({ label, activeCount = 0, children }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-[18px] border-b border-[var(--color-border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[13px] leading-[1.25] uppercase text-[var(--color-text-default)] px-0.5">
            {label}
          </span>
          <AnimatePresence>
            {activeCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="bg-[var(--color-action-primary)] text-white text-[11px] font-medium flex items-center justify-center size-[18px]"
              >
                {activeCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="size-4 text-[var(--color-text-default)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-3 px-0.5">
              {children || (
                <p className="text-sm text-[var(--color-text-subtle)]">
                  Filter options coming soon
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
