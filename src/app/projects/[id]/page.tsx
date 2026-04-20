"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import {
  EditIcon,
  ShareIcon,
  DeleteIcon,
  PlusIcon,
  CloseIcon,
  CheckIcon,
} from "@/components/ui/Icons";

/* ── Mock data for project details ── */
type ProductItem = {
  id: string;
  name: string;
  categoryPath: string[];
  aspectRatio: "1:1" | "2:3" | "3:2";
};

type CategoryTab = {
  id: string;
  label: string;
};

const defaultTabs: CategoryTab[] = [
  { id: "all", label: "ALL" },
  { id: "living-room", label: "LIVING ROOM" },
  { id: "bedroom", label: "BEDROOM" },
  { id: "dinning", label: "DINNING" },
];

const mockProducts: ProductItem[] = [
  { id: "p1", name: "Heritage Swatch Chair", categoryPath: ["Living room", "Main"], aspectRatio: "2:3" },
  { id: "p2", name: "Snowflake Chandelier", categoryPath: ["Living room", "Main"], aspectRatio: "1:1" },
  { id: "p3", name: "Antique French Console", categoryPath: ["Living room", "Main"], aspectRatio: "2:3" },
  { id: "p4", name: "Minimalist Desk Lamp", categoryPath: ["Bedroom", "Accent"], aspectRatio: "3:2" },
  { id: "p5", name: "Rope Seat Lounge Chair", categoryPath: ["Living room", "Main"], aspectRatio: "2:3" },
  { id: "p6", name: "Brass Floor Lamp", categoryPath: ["Bedroom", "Accent"], aspectRatio: "1:1" },
  { id: "p7", name: "Mahogany Writing Desk", categoryPath: ["Dinning", "Feature"], aspectRatio: "2:3" },
  { id: "p8", name: "Art Deco Mirror", categoryPath: ["Living room", "Main"], aspectRatio: "3:2" },
];

/* Map project id to a display name */
const projectNames: Record<string, string> = {
  "quick-saves": "Quick Saves",
  "minimalist-dallas": "Minimalist Dallas",
  "la-hoverhand": "LA Hoverhand",
  "dream-lighting": "Dream Lighting",
  "la-hoverhand-2": "LA Hoverhand",
};

/* ── Product card ── */
const productImageMap: Record<string, string> = {
  p1: "1555041469-a586c61ea9bc",
  p2: "1506439773649-6e0eb8cfb237",
  p3: "1524758631624-e2822e304c36",
  p4: "1532372320978-c5c5ef23595a",
  p5: "1519947486511-46149fa0a254",
  p6: "1555685668-dc1e1e2f9b64",
  p7: "1538688525198-9b88f6f53126",
  p8: "1513694203232-719a280e022f",
};

function ProductCard({ product }: { product: ProductItem }) {
  const heightMap = { "1:1": 280, "2:3": 370, "3:2": 220 };
  const widthMap = { "1:1": 280, "2:3": 280, "3:2": 330 };
  const photoId = productImageMap[product.id] || "1555041469-a586c61ea9bc";
  return (
    <div className="mb-5 break-inside-avoid">
      {/* Placeholder image */}
      <div
        className="w-full bg-[var(--color-grey-50)] rounded-sm overflow-hidden"
        style={{ height: heightMap[product.aspectRatio] }}
      >
        <img
          src={`https://images.unsplash.com/photo-${photoId}?w=${widthMap[product.aspectRatio]}&h=${heightMap[product.aspectRatio]}&fit=crop&q=80`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Category path */}
      <p className="text-[16px] text-[var(--color-text-default)] mt-2">
        {product.categoryPath.join(" / ")}
      </p>
    </div>
  );
}

/* ── Main page ── */
export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const projectName = projectNames[projectId] || projectId;

  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState<CategoryTab[]>(defaultTabs);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");

  /* Filter products based on active tab */
  const filteredProducts =
    activeTab === "all"
      ? mockProducts
      : mockProducts.filter(
          (p) =>
            p.categoryPath[0].toUpperCase() ===
            tabs.find((t) => t.id === activeTab)?.label
        );

  /* Add new category tab */
  function confirmAddTab() {
    if (newTabName.trim()) {
      const id = newTabName.trim().toLowerCase().replace(/\s+/g, "-");
      setTabs([...tabs, { id, label: newTabName.trim().toUpperCase() }]);
    }
    setNewTabName("");
    setIsAddingTab(false);
  }

  function cancelAddTab() {
    setNewTabName("");
    setIsAddingTab(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

      {/* Project title row */}
      <div className="flex items-center justify-between px-3 md:px-5 pt-6 pb-4">
        <h1 className="text-xl md:text-[28px] font-semibold uppercase leading-tight">
          {projectName}
        </h1>
        <div className="flex items-center gap-1">
          <button className="py-[5px] px-[8px] cursor-pointer">
            <EditIcon className="size-4 text-[var(--color-text-subtle)]" />
          </button>
          <button className="py-[5px] px-[8px] cursor-pointer">
            <ShareIcon className="size-4 text-[var(--color-text-subtle)]" />
          </button>
          <button className="py-[5px] px-[8px] cursor-pointer">
            <DeleteIcon className="size-4 text-[var(--color-text-subtle)]" />
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-[var(--color-border)] px-3 md:px-5 flex items-center gap-4 md:gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[16px] font-bold uppercase pb-3 pt-1 transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-[var(--color-text-default)] border-b-2 border-[var(--color-text-default)]"
                  : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Add new tab */}
        {isAddingTab ? (
          <div className="flex items-center gap-2 pb-3 pt-1">
            <input
              type="text"
              autoFocus
              value={newTabName}
              onChange={(e) => setNewTabName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmAddTab();
                if (e.key === "Escape") cancelAddTab();
              }}
              placeholder="CATEGORY NAME"
              className="text-[16px] font-bold uppercase bg-transparent outline-none border-b-2 border-[var(--color-text-default)] placeholder:text-[var(--color-text-disabled)] w-[180px]"
            />
            <button onClick={cancelAddTab} className="cursor-pointer p-1">
              <CloseIcon className="size-4 text-[var(--color-text-subtle)]" />
            </button>
            <button onClick={confirmAddTab} className="cursor-pointer p-1">
              <CheckIcon className="size-4 text-[var(--color-text-default)]" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTab(true)}
            className="flex items-center gap-1.5 pb-3 pt-1 cursor-pointer text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)] transition-colors whitespace-nowrap"
          >
            <PlusIcon className="size-3.5" />
            <span className="text-[16px] font-bold uppercase">Add New</span>
          </button>
        )}
      </div>

      {/* Product grid - responsive masonry */}
      <div className="p-3 md:p-5 columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
