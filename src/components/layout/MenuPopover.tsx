"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "../ui/Icons";

type MenuPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Settings", hasChevron: false },
  { label: "Log Out", hasChevron: false },
  { label: "More", hasChevron: true },
];

export default function MenuPopover({ isOpen, onClose }: MenuPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed top-[60px] right-5 z-50 w-[305px] bg-white border border-[#e8e7e6] rounded-[4px] overflow-hidden origin-top-right"
        >
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`flex items-center justify-between w-full px-5 py-3.5 text-[14px] font-medium uppercase text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors cursor-pointer ${
                index < menuItems.length - 1 ? "border-b border-[#e8e7e6]" : ""
              }`}
            >
              <span>{item.label}</span>
              {item.hasChevron && (
                <ChevronDownIcon className="size-3.5 text-[var(--color-text-default)]" />
              )}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
