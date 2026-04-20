"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "../ui/Icons";

type FilterCheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function FilterCheckbox({ label, checked: controlledChecked, onChange }: FilterCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 w-full cursor-pointer group"
    >
      <div
        className={`size-4 border flex items-center justify-center shrink-0 transition-colors duration-150 ${
          checked
            ? "bg-[var(--color-action-primary)] border-[var(--color-action-primary)]"
            : "border-[var(--color-border)] group-hover:border-[var(--color-text-subtle)]"
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon className="size-3 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-[13px] text-[var(--color-text-default)]">{label}</span>
    </button>
  );
}
