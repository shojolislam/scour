"use client";

type FilterRangeInputsProps = {
  minLabel?: string;
  maxLabel?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
};

export default function FilterRangeInputs({
  minLabel = "Min",
  maxLabel = "Max",
  minPlaceholder = "0",
  maxPlaceholder = "10000",
}: FilterRangeInputsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">{minLabel}</label>
        <input
          type="text"
          placeholder={minPlaceholder}
          className="w-full border border-[#e8e7e6] px-2 py-1.5 text-[12px] text-[var(--color-text-default)] outline-none"
        />
      </div>
      <span className="text-[12px] text-[var(--color-text-subtle)] pt-4">to</span>
      <div className="flex-1">
        <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">{maxLabel}</label>
        <input
          type="text"
          placeholder={maxPlaceholder}
          className="w-full border border-[#e8e7e6] px-2 py-1.5 text-[12px] text-[var(--color-text-default)] outline-none"
        />
      </div>
    </div>
  );
}
