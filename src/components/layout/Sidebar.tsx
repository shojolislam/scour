"use client";

import { useState } from "react";
import FilterAccordion from "../filters/FilterAccordion";
import FilterCheckbox from "../filters/FilterCheckbox";
import FilterRadio from "../filters/FilterRadio";
import FilterSearch from "../filters/FilterSearch";
import FilterRangeInputs from "../filters/FilterRangeInputs";
import DimensionToggle from "../filters/DimensionToggle";
import RangeSlider from "../filters/RangeSlider";

export default function Sidebar() {
  /* ── Sort by (radio / single select) ── */
  const [sortBy, setSortBy] = useState("default");

  /* ── Price (radio + custom slider) ── */
  const [priceRange, setPriceRange] = useState("any");
  const [priceSliderChanged, setPriceSliderChanged] = useState(false);

  /* ── Ships from (checkboxes) ── */
  const [shipsFrom, setShipsFrom] = useState<Record<string, boolean>>({});
  const shipsFromCount = Object.values(shipsFrom).filter(Boolean).length;
  const toggleShipsFrom = (label: string, checked: boolean) =>
    setShipsFrom((prev) => ({ ...prev, [label]: checked }));

  /* ── Material & Finish (checkboxes) ── */
  const [materials, setMaterials] = useState<Record<string, boolean>>({});
  const materialsCount = Object.values(materials).filter(Boolean).length;
  const toggleMaterial = (label: string, checked: boolean) =>
    setMaterials((prev) => ({ ...prev, [label]: checked }));

  /* ── Color (checkboxes) ── */
  const [colors, setColors] = useState<Record<string, boolean>>({});
  const colorsCount = Object.values(colors).filter(Boolean).length;
  const toggleColor = (label: string, checked: boolean) =>
    setColors((prev) => ({ ...prev, [label]: checked }));

  /* ── Stores (checkboxes) ── */
  const [stores, setStores] = useState<Record<string, boolean>>({});
  const storesCount = Object.values(stores).filter(Boolean).length;
  const toggleStore = (label: string, checked: boolean) =>
    setStores((prev) => ({ ...prev, [label]: checked }));

  /* ── Production (multi-select checkboxes) ── */
  const [production, setProduction] = useState<Record<string, boolean>>({});
  const productionCount = Object.values(production).filter(Boolean).length;
  const toggleProduction = (label: string, checked: boolean) =>
    setProduction((prev) => ({ ...prev, [label]: checked }));

  /* ── Quantity (range slider) ── */
  const [quantityChanged, setQuantityChanged] = useState(false);

  /* ── Age (multi-select checkboxes) ── */
  const [age, setAge] = useState<Record<string, boolean>>({});
  const ageCount = Object.values(age).filter(Boolean).length;
  const toggleAge = (label: string, checked: boolean) =>
    setAge((prev) => ({ ...prev, [label]: checked }));

  /* ── Derived active counts ── */
  const sortByCount = sortBy !== "default" ? 1 : 0;
  const priceCount = priceRange !== "any" ? 1 : 0;
  const quantityCount = quantityChanged ? 1 : 0;

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-[256px] overflow-y-auto bg-white z-30">
      {/* Sort by — radio buttons (single select) */}
      <FilterAccordion label="Sort by" activeCount={sortByCount}>
        <div className="flex flex-col gap-2.5">
          <FilterRadio label="Default" checked={sortBy === "default"} onChange={() => setSortBy("default")} />
          <FilterRadio label="Trending" checked={sortBy === "trending"} onChange={() => setSortBy("trending")} />
          <FilterRadio label="Price High to Low" checked={sortBy === "price-desc"} onChange={() => setSortBy("price-desc")} />
          <FilterRadio label="Price Low to High" checked={sortBy === "price-asc"} onChange={() => setSortBy("price-asc")} />
          <FilterRadio label="Newest to Oldest" checked={sortBy === "newest"} onChange={() => setSortBy("newest")} />
          <FilterRadio label="Oldest to Newest" checked={sortBy === "oldest"} onChange={() => setSortBy("oldest")} />
        </div>
      </FilterAccordion>

      {/* Price — radio buttons + custom slider */}
      <FilterAccordion label="Price" activeCount={priceCount}>
        <div className="flex flex-col gap-2.5">
          <FilterRadio label="Any Price" checked={priceRange === "any"} onChange={() => setPriceRange("any")} />
          <FilterRadio label="Under $2,000" checked={priceRange === "under-2k"} onChange={() => setPriceRange("under-2k")} />
          <FilterRadio label="Under $6,000" checked={priceRange === "under-6k"} onChange={() => setPriceRange("under-6k")} />
          <FilterRadio label="Under $10,000" checked={priceRange === "under-10k"} onChange={() => setPriceRange("under-10k")} />
          <FilterRadio label="$10,000+" checked={priceRange === "10k-plus"} onChange={() => setPriceRange("10k-plus")} />
          <FilterRadio label="Custom" checked={priceRange === "custom"} onChange={() => setPriceRange("custom")} />
        </div>
        {priceRange === "custom" && (
          <div className="mt-3">
            <RangeSlider
              min={100}
              max={10000}
              minLabel="Min"
              maxLabel="Max"
              prefix="$"
              onValuesChange={() => setPriceSliderChanged(true)}
            />
          </div>
        )}
      </FilterAccordion>

      {/* Ships from — search + checkboxes */}
      <FilterAccordion label="Ships from" activeCount={shipsFromCount}>
        <FilterSearch />
        <div className="flex flex-col gap-2.5">
          <FilterCheckbox label="USA" checked={!!shipsFrom["USA"]} onChange={(c) => toggleShipsFrom("USA", c)} />
          <FilterCheckbox label="Europe" checked={!!shipsFrom["Europe"]} onChange={(c) => toggleShipsFrom("Europe", c)} />
          <FilterCheckbox label="Asia" checked={!!shipsFrom["Asia"]} onChange={(c) => toggleShipsFrom("Asia", c)} />
        </div>
      </FilterAccordion>

      {/* Dimensions — radio toggle IN/CM + range inputs */}
      <FilterAccordion label="Dimensions">
        <DimensionToggle />
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">Height</label>
            <FilterRangeInputs minPlaceholder="0" maxPlaceholder="100" />
          </div>
          <div>
            <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">Width</label>
            <FilterRangeInputs minPlaceholder="0" maxPlaceholder="100" />
          </div>
          <div>
            <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">Depth</label>
            <FilterRangeInputs minPlaceholder="0" maxPlaceholder="100" />
          </div>
          <div>
            <label className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-1 block">Seat Height</label>
            <FilterRangeInputs minPlaceholder="0" maxPlaceholder="50" />
          </div>
        </div>
      </FilterAccordion>

      {/* Material & Finish — search + checkboxes */}
      <FilterAccordion label="Material & Finish" activeCount={materialsCount}>
        <FilterSearch />
        <div className="flex flex-col gap-2.5">
          <FilterCheckbox label="Fabric" checked={!!materials["Fabric"]} onChange={(c) => toggleMaterial("Fabric", c)} />
          <FilterCheckbox label="Wood" checked={!!materials["Wood"]} onChange={(c) => toggleMaterial("Wood", c)} />
          <FilterCheckbox label="Animal Skin" checked={!!materials["Animal Skin"]} onChange={(c) => toggleMaterial("Animal Skin", c)} />
          <FilterCheckbox label="Leather" checked={!!materials["Leather"]} onChange={(c) => toggleMaterial("Leather", c)} />
          <FilterCheckbox label="Upholstery" checked={!!materials["Upholstery"]} onChange={(c) => toggleMaterial("Upholstery", c)} />
        </div>
      </FilterAccordion>

      {/* Color — 2-column checkbox grid */}
      <FilterAccordion label="Color" activeCount={colorsCount}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {["Black","White","Brown","Beige","Gray","Gold","Silver","Blue","Green","Red","Pink","Orange","Yellow","Multi"].map((c) => (
            <FilterCheckbox key={c} label={c} checked={!!colors[c]} onChange={(v) => toggleColor(c, v)} />
          ))}
        </div>
      </FilterAccordion>

      {/* Stores — search + checkboxes */}
      <FilterAccordion label="Stores" activeCount={storesCount}>
        <FilterSearch />
        <p className="text-[11px] text-[var(--color-text-subtle)] uppercase mb-2">My Favorite Stores</p>
        <div className="flex flex-col gap-2.5">
          {["Cassina","De Sede","Muller Van Severen","Mambo Unlimited Ideas","Pepe Albargues"].map((s) => (
            <FilterCheckbox key={s} label={s} checked={!!stores[s]} onChange={(v) => toggleStore(s, v)} />
          ))}
        </div>
      </FilterAccordion>

      {/* Production — multi-select checkboxes */}
      <FilterAccordion label="Production" activeCount={productionCount}>
        <div className="flex flex-col gap-2.5">
          {["One-of-a-kind","Limited Edition","Serial Production","Made to Order"].map((p) => (
            <FilterCheckbox key={p} label={p} checked={!!production[p]} onChange={(v) => toggleProduction(p, v)} />
          ))}
        </div>
      </FilterAccordion>

      {/* Quantity — range slider */}
      <FilterAccordion label="Quantity" activeCount={quantityCount}>
        <RangeSlider
          min={1}
          max={12}
          minLabel="Min"
          maxLabel="Max"
          prefix=""
          onValuesChange={() => setQuantityChanged(true)}
        />
      </FilterAccordion>

      {/* Age — multi-select checkboxes */}
      <FilterAccordion label="Age" activeCount={ageCount}>
        <div className="flex flex-col gap-2.5">
          {["One-of-a-kind","Limited Edition","Serial Production","Made to Order"].map((a) => (
            <FilterCheckbox key={a} label={a} checked={!!age[a]} onChange={(v) => toggleAge(a, v)} />
          ))}
        </div>
      </FilterAccordion>
    </aside>
  );
}
