"use client";

import { useState, useRef, useCallback } from "react";

type RangeSliderProps = {
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  prefix?: string;
  onValuesChange?: (minVal: number, maxVal: number) => void;
};

export default function RangeSlider({
  min,
  max,
  minLabel = "Min",
  maxLabel = "Max",
  prefix = "$",
  onValuesChange,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);
  const [editMinText, setEditMinText] = useState("");
  const [editMaxText, setEditMaxText] = useState("");
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"min" | "max" | null>(null);

  const getPercent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const updateValues = (newMin: number, newMax: number) => {
    setMinVal(newMin);
    setMaxVal(newMax);
    onValuesChange?.(newMin, newMax);
  };

  const handleMouseDown = (handle: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = handle;

    const onMouseMove = (e: MouseEvent) => {
      if (!trackRef.current || !draggingRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const value = Math.round(min + (percent / 100) * (max - min));

      if (draggingRef.current === "min") {
        const clamped = Math.min(value, maxVal - 1);
        setMinVal(clamped);
        onValuesChange?.(clamped, maxVal);
      } else {
        const clamped = Math.max(value, minVal + 1);
        setMaxVal(clamped);
        onValuesChange?.(minVal, clamped);
      }
    };

    const onMouseUp = () => {
      draggingRef.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const startEditMin = () => {
    setEditMinText(String(minVal));
    setEditingMin(true);
  };

  const commitEditMin = () => {
    setEditingMin(false);
    const parsed = parseInt(editMinText, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(parsed, maxVal - 1));
      updateValues(clamped, maxVal);
    }
  };

  const startEditMax = () => {
    setEditMaxText(String(maxVal));
    setEditingMax(true);
  };

  const commitEditMax = () => {
    setEditingMax(false);
    const parsed = parseInt(editMaxText, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(parsed, minVal + 1));
      updateValues(minVal, clamped);
    }
  };

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className="flex flex-col gap-3">
      {/* Slider track — px-2.5 gives handles room so they don't clip */}
      <div className="px-2.5">
        <div ref={trackRef} className="relative h-5 flex items-center overflow-visible">
          {/* Background track */}
          <div className="absolute w-full h-px bg-[#e8e7e6]" />
          {/* Active track between handles */}
          <div
            className="absolute h-px bg-[#333]"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          />
          {/* Min handle */}
          <div
            className="absolute size-5 rounded-full border-2 border-[#333] bg-white cursor-grab active:cursor-grabbing -translate-x-1/2 z-10 transition-transform duration-150 hover:scale-110"
            style={{ left: `${minPercent}%` }}
            onMouseDown={handleMouseDown("min")}
          />
          {/* Max handle */}
          <div
            className="absolute size-5 rounded-full border-2 border-[#333] bg-white cursor-grab active:cursor-grabbing -translate-x-1/2 z-10 transition-transform duration-150 hover:scale-110"
            style={{ left: `${maxPercent}%` }}
            onMouseDown={handleMouseDown("max")}
          />
        </div>
      </div>

      {/* Min/Max display boxes with inline editing */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">{minLabel}</label>
          <div className="relative">
            <div
              className={`border-b pb-1.5 text-[12px] text-[var(--color-text-default)] transition-opacity duration-150 ${
                editingMin ? "opacity-0 pointer-events-none" : "opacity-100 cursor-text"
              } border-[var(--color-border)]`}
              onClick={startEditMin}
            >
              {prefix && <span className="font-sans">{prefix}</span>}{minVal.toLocaleString()}
            </div>
            {editingMin && (
              <input
                autoFocus
                type="text"
                value={editMinText}
                onChange={(e) => setEditMinText(e.target.value)}
                onBlur={commitEditMin}
                onKeyDown={(e) => e.key === "Enter" && commitEditMin()}
                className="absolute inset-0 w-full border-b border-[var(--color-text-default)] pb-1.5 text-[12px] text-[var(--color-text-default)] outline-none bg-transparent animate-[fadeIn_0.15s_ease-in-out]"
              />
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">{maxLabel}</label>
          <div className="relative">
            <div
              className={`border-b pb-1.5 text-[12px] text-[var(--color-text-default)] transition-opacity duration-150 ${
                editingMax ? "opacity-0 pointer-events-none" : "opacity-100 cursor-text"
              } border-[var(--color-border)]`}
              onClick={startEditMax}
            >
              {prefix && <span className="font-sans">{prefix}</span>}{maxVal.toLocaleString()}
            </div>
            {editingMax && (
              <input
                autoFocus
                type="text"
                value={editMaxText}
                onChange={(e) => setEditMaxText(e.target.value)}
                onBlur={commitEditMax}
                onKeyDown={(e) => e.key === "Enter" && commitEditMax()}
                className="absolute inset-0 w-full border-b border-[var(--color-text-default)] pb-1.5 text-[12px] text-[var(--color-text-default)] outline-none bg-transparent animate-[fadeIn_0.15s_ease-in-out]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
