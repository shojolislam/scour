"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "../ui/Icons";

type MenuPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navLinks = [
  { label: "Categories", href: "/" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "My Projects", href: "/projects" },
];

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
          className="fixed top-[60px] right-3 md:right-5 z-50 w-[calc(100vw-24px)] md:w-[305px] bg-white border border-[#e8e7e6] rounded-[4px] overflow-hidden origin-top-right"
        >
          {/* Navigation links — visible on all sizes, critical for mobile where nav is hidden */}
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="flex items-center w-full px-5 py-3.5 text-[14px] font-medium uppercase text-[var(--color-text-default)] hover:bg-[var(--color-grey-50)] transition-colors border-b border-[#e8e7e6]"
            >
              {link.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="h-px bg-[#e8e7e6]" />

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
