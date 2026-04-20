"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../ui/Icons";

type CategoriesDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categoriesData = [
  {
    heading: "Seating",
    items: ["Arm Chairs", "Bar Stools", "Benches", "Chases", "Daybeds", "Dining Chairs", "Office Chairs", "Ottomans", "Sofas", "Stools"],
  },
  {
    heading: "Tables",
    items: ["Dinning Tables", "Desks", "Console Tables", "Coffee Tables", "Side Tables"],
  },
  {
    heading: "Storage",
    items: ["Bar & Media Cabinets", "Bookcases", "Cabinets", "Chests of Drawers", "Modular & Wall Storage", "Nightstands", "Shelving", "Sideboards & Credenzas", "Wardrobes"],
  },
  {
    heading: "Lighting",
    items: ["Ceiling Lights", "Chandeliers", "Floor Lamps", "Pendents", "Table Lamps", "Wall Lights"],
  },
  {
    heading: "Decorative Objects",
    items: ["Candle Holders", "Ceramics", "Clocks", "Cutting Boards", "Baskets & Boxes", "Kitchenware", "Mortars", "Objects", "Pots & Vessels", "Room Dividers", "Trays", "Vases"],
  },
  {
    heading: "Mirrors",
    items: ["Wall Mirrors", "Floor Mirrors", "Table Mirrors"],
  },
  {
    heading: "Outdoor",
    items: ["Outdoor Seating", "Outdoor Tables", "Outdoor Lighting", "Planters", "Garden Sculptures"],
  },
  {
    heading: "Textiles",
    items: ["Bedding", "Blankets", "Throws", "Pillows", "Rugs", "Tapestries"],
  },
];

export default function CategoriesDropdown({ isOpen, onClose }: CategoriesDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Cream overlay — desktop only (mobile uses full-screen panel) */}
          <motion.div
            className="fixed inset-0 top-[60px] z-40 bg-[rgba(220,216,198,0.5)] hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Desktop panel — 8-column grid */}
          <motion.div
            className="fixed top-[60px] left-0 right-0 z-50 bg-white p-5 hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8">
              {categoriesData.map((category) => (
                <div key={category.heading} className="flex flex-col gap-4">
                  <h3 className="font-semibold text-[16px] uppercase text-[var(--color-text-default)]">
                    {category.heading}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {category.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="font-semibold text-[16px] uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)] transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile full-screen overlay */}
          <motion.div
            className="fixed inset-0 top-[60px] z-50 bg-white overflow-y-auto md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <span className="text-sm font-bold uppercase text-[var(--color-text-default)]">Categories</span>
              <button onClick={onClose} className="cursor-pointer">
                <CloseIcon className="size-5 text-[var(--color-text-default)]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 p-4">
              {categoriesData.map((category) => (
                <div key={category.heading} className="flex flex-col gap-3">
                  <h3 className="font-semibold text-[14px] uppercase text-[var(--color-text-default)]">
                    {category.heading}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {category.items.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="font-semibold text-[14px] uppercase text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)] transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
