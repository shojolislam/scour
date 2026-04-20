"use client";

import { motion, AnimatePresence } from "framer-motion";

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
          {/* Cream overlay */}
          <motion.div
            className="fixed inset-0 top-[60px] z-40 bg-[rgba(220,216,198,0.5)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* White panel */}
          <motion.div
            className="fixed top-[60px] left-0 right-0 z-50 bg-white p-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-8 gap-8">
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
        </>
      )}
    </AnimatePresence>
  );
}
