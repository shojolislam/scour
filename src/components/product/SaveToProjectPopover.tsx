"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, PlusIcon, CheckIcon } from "../ui/Icons";

/* Chevron icon that rotates based on open/closed state */
function ChevronIcon({ open, className = "size-3" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* Mock project data matching the Figma design */
const PROJECTS = [
  {
    name: "DALLAS MODERN",
    subFolders: ["BEDROOM", "LIVING ROOM", "KITCHEN", "LIGHTING", "DECOR"],
  },
  {
    name: "LA OVERHANG",
    subFolders: ["MASTER SUITE", "PATIO", "POOL HOUSE"],
  },
];

type SaveToProjectPopoverProps = {
  onClose: () => void;
};

export default function SaveToProjectPopover({ onClose }: SaveToProjectPopoverProps) {
  /* Track which projects are expanded by index */
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({
    0: true, /* First project open by default per Figma */
  });
  const popoverRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  /* State for inline "Create New Project" input */
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const createInputRef = useRef<HTMLInputElement>(null);

  /* Auto-focus the input when it appears */
  useEffect(() => {
    if (isCreating && createInputRef.current) {
      createInputRef.current.focus();
    }
  }, [isCreating]);

  return (
    <motion.div
      ref={popoverRef}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-[305px] bg-white rounded-[4px] z-50 origin-top-left"
      style={{ boxShadow: "0px 5px 12px rgba(0,0,0,0.1)" }}
    >
      {/* Quick Save */}
      <button className="w-full text-left px-5 py-3.5 border-b border-[var(--color-border)] text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)]">
        QUICK SAVE
      </button>

      {/* Create New Project — toggles between label and inline input */}
      <AnimatePresence mode="wait" initial={false}>
        {isCreating ? (
          <motion.div
            key="create-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--color-border)]"
          >
            <input
              ref={createInputRef}
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsCreating(false);
                  setNewProjectName("");
                } else if (e.key === "Escape") {
                  setIsCreating(false);
                  setNewProjectName("");
                }
              }}
              placeholder="PROJECT NAME"
              className="flex-1 min-w-0 text-[14px] font-medium uppercase tracking-wide bg-transparent border-b border-[var(--color-text-default)] outline-none py-1 placeholder:text-[var(--color-text-disabled)]"
            />
            <button
              onClick={() => {
                setIsCreating(false);
                setNewProjectName("");
              }}
              className="cursor-pointer p-0.5"
            >
              <CheckIcon className="size-4 text-[var(--color-text-default)]" />
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewProjectName("");
              }}
              className="cursor-pointer p-0.5"
            >
              <CloseIcon className="size-3.5 text-[var(--color-text-default)]" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="create-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)]"
          >
            <span>CREATE NEW PROJECT</span>
            <PlusIcon className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Project list */}
      {PROJECTS.map((project, index) => (
        <div key={project.name} className="border-b border-[var(--color-border)] last:border-b-0">
          {/* Project header */}
          <button
            onClick={() => toggleProject(index)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)]"
          >
            <span>{project.name}</span>
            <ChevronIcon open={!!expandedProjects[index]} />
          </button>

          {/* Sub-folders (expanded) */}
          <AnimatePresence>
            {expandedProjects[index] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {project.subFolders.map((folder) => (
                  <button
                    key={folder}
                    className="w-full text-left pl-11 pr-5 py-2.5 text-[13px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)]"
                  >
                    {folder}
                  </button>
                ))}
                {/* Add Sub Folder */}
                <button className="w-full flex items-center justify-between pl-11 pr-5 py-2.5 text-[13px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)]">
                  <span>ADD SUB FOLDER</span>
                  <PlusIcon className="size-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
