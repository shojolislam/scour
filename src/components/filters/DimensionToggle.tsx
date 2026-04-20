"use client";

import { useState } from "react";
import FilterRadio from "./FilterRadio";

export default function DimensionToggle() {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  return (
    <div className="flex items-center gap-4 mb-3">
      <FilterRadio label="IN" checked={unit === "in"} onChange={() => setUnit("in")} />
      <FilterRadio label="CM" checked={unit === "cm"} onChange={() => setUnit("cm")} />
    </div>
  );
}
