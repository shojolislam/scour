"use client";

import { motion, AnimatePresence } from "framer-motion";

type FilterRadioProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function FilterRadio({ label, checked = false, onChange }: FilterRadioProps) {
  const handleClick = () => {
    onChange?.(!checked);
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-2 cursor-pointer w-full">
      <div className={`size-[14px] border flex items-center justify-center shrink-0 transition-colors duration-150 ${
        checked ? "border-[var(--color-text-default)]" : "border-[var(--color-border)]"
      }`}>
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="size-[8px] bg-[var(--color-text-default)]"
            />
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm leading-[1.25]">{label}</span>
    </button>
  );
}
