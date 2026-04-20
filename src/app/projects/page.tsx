"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import {
  PlusIcon,
  EditIcon,
  ShareIcon,
  DeleteIcon,
  OverflowIcon,
  CloseIcon,
  CheckIcon,
  InfoIcon,
} from "@/components/ui/Icons";

/* ── Mock project data ── */
type ProjectData = {
  id: string;
  name: string;
  itemCount: number;
  subFolderCount: number;
  isQuickSaves: boolean;
};

const initialProjects: ProjectData[] = [
  { id: "quick-saves", name: "Quick Saves", itemCount: 13, subFolderCount: 0, isQuickSaves: true },
  { id: "minimalist-dallas", name: "Minimalist Dallas", itemCount: 3, subFolderCount: 2, isQuickSaves: false },
  { id: "la-hoverhand", name: "LA Hoverhand", itemCount: 0, subFolderCount: 0, isQuickSaves: false },
  { id: "dream-lighting", name: "Dream Lighting", itemCount: 3, subFolderCount: 2, isQuickSaves: false },
  { id: "la-hoverhand-2", name: "LA Hoverhand", itemCount: 3, subFolderCount: 0, isQuickSaves: false },
];

/* ── Quick Saves 3x3 grid ── */
const quickSaveImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=122&h=137&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=122&h=137&fit=crop&q=80",
];

function QuickSavesGrid() {
  return (
    <div className="grid grid-cols-3 gap-[3px] rounded-sm overflow-hidden">
      {quickSaveImages.map((src, i) => (
        <div
          key={i}
          className="bg-[var(--color-grey-50)] overflow-hidden aspect-[122/137]"
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

/* ── Regular card image mosaic: 1 large + 2 small ── */
const regularCardImages: Record<string, [string, string, string]> = {
  "minimalist-dallas": [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=375&h=208&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=185&h=207&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=185&h=207&fit=crop&q=80",
  ],
  "la-hoverhand": [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=375&h=208&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=185&h=207&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=185&h=207&fit=crop&q=80",
  ],
  "dream-lighting": [
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=375&h=208&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=185&h=207&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=185&h=207&fit=crop&q=80",
  ],
  "la-hoverhand-2": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=375&h=208&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=185&h=207&fit=crop&q=80",
    "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=185&h=207&fit=crop&q=80",
  ],
};

function RegularCardGrid({ hasItems, seed }: { hasItems: boolean; seed: string }) {
  const images = regularCardImages[seed] || regularCardImages["minimalist-dallas"];
  return (
    <div className="flex flex-col gap-[3px] rounded-sm overflow-hidden">
      {/* Large top image */}
      <div
        className="bg-[var(--color-grey-50)] w-full overflow-hidden aspect-[375/208]"
      >
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
      {/* Two smaller images side by side */}
      <div className="flex gap-[3px]">
        <div
          className="bg-[var(--color-grey-50)] flex-1 overflow-hidden aspect-[185/207]"
        >
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="bg-[var(--color-grey-50)] flex-1 overflow-hidden aspect-[185/207]"
        >
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({
  project,
  isEditMode,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}: {
  project: ProjectData;
  isEditMode: boolean;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  /* Build the meta line: "3 items . 2 sub folders" */
  const metaParts: string[] = [];
  if (project.itemCount > 0) {
    metaParts.push(`${project.itemCount} items`);
  }
  if (project.subFolderCount > 0) {
    metaParts.push(`${project.subFolderCount} sub folders`);
  }
  const metaText = metaParts.length > 0 ? metaParts.join(" \u2022 ") : "No items";

  const cardContent = (
    <div
      className={`relative w-full sm:w-[calc(50%-10px)] lg:w-[375px] ${
        isEditMode
          ? `border-2 border-dashed border-[var(--color-border)] rounded-sm p-2 cursor-grab ${
              isDragOver ? "bg-[var(--color-grey-50)]" : ""
            }`
          : ""
      }`}
      draggable={isEditMode}
      onDragStart={isEditMode ? onDragStart : undefined}
      onDragOver={isEditMode ? onDragOver : undefined}
      onDragEnd={isEditMode ? onDragEnd : undefined}
      onDrop={isEditMode ? onDrop : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image mosaic */}
      {project.isQuickSaves ? (
        <QuickSavesGrid />
      ) : (
        <RegularCardGrid hasItems={project.itemCount > 0} seed={project.id} />
      )}

      {/* Card info row */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-[16px] font-semibold uppercase leading-tight">
            {project.name}
          </p>
          <p className="text-[14px] text-[var(--color-text-subtle)] mt-0.5">
            {metaText}
          </p>
        </div>

        {/* Overflow menu on hover (non-quick-save only, not in edit mode) */}
        {!project.isQuickSaves && !isEditMode && hovered && (
          <button className="py-[5px] px-[8px] cursor-pointer">
            <OverflowIcon className="size-5 text-[var(--color-text-subtle)]" />
          </button>
        )}
      </div>
    </div>
  );

  /* Wrap in Link when not in edit mode */
  if (isEditMode) {
    return cardContent;
  }

  return (
    <Link href={`/projects/${project.id}`} className="block">
      {cardContent}
    </Link>
  );
}

/* ── Main page ── */
export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  /* Snapshot of order before edit so we can cancel */
  const preEditOrder = useRef<ProjectData[]>(projects);

  function enterEditMode() {
    preEditOrder.current = [...projects];
    setIsEditMode(true);
  }

  function cancelEdit() {
    setProjects(preEditOrder.current);
    setIsEditMode(false);
  }

  function saveEdit() {
    setIsEditMode(false);
  }

  /* Drag-and-drop reorder */
  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const updated = [...projects];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setProjects(updated);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 md:p-5">
        {/* Left: Add project */}
        <button className="flex items-center gap-1.5 cursor-pointer">
          <PlusIcon className="size-4 text-[var(--color-text-default)]" />
          <span className="text-[13px] font-medium uppercase text-[var(--color-text-default)]">
            Add Project
          </span>
        </button>

        {/* Right: action icons or edit-mode buttons */}
        {isEditMode ? (
          <div className="flex items-center gap-4">
            <button
              onClick={cancelEdit}
              className="flex items-center gap-1.5 cursor-pointer text-[var(--color-text-subtle)]"
            >
              <CloseIcon className="size-4" />
              <span className="text-[13px] font-medium uppercase">Cancel</span>
            </button>
            <button
              onClick={saveEdit}
              className="flex items-center gap-1.5 cursor-pointer text-[var(--color-text-default)]"
            >
              <CheckIcon className="size-4" />
              <span className="text-[13px] font-medium uppercase">
                Save changes
              </span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={enterEditMode}
              className="py-[5px] px-[8px] cursor-pointer"
            >
              <EditIcon className="size-4 text-[var(--color-text-subtle)]" />
            </button>
            <button className="py-[5px] px-[8px] cursor-pointer">
              <ShareIcon className="size-4 text-[var(--color-text-subtle)]" />
            </button>
            <button className="py-[5px] px-[8px] cursor-pointer">
              <DeleteIcon className="size-4 text-[var(--color-text-subtle)]" />
            </button>
          </div>
        )}
      </div>

      {/* Projects grid */}
      <div className="flex flex-wrap gap-3 md:gap-5 px-3 md:px-5 pb-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isEditMode={isEditMode}
            isDragOver={dragOverIndex === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop(index)}
          />
        ))}
      </div>

      {/* Edit-mode reorder hint */}
      {isEditMode && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <InfoIcon className="size-4 text-[var(--color-text-subtle)]" />
          <span className="text-sm md:text-[16px] text-[var(--color-text-subtle)]">
            Drag items around to reorder
          </span>
        </div>
      )}
    </div>
  );
}
