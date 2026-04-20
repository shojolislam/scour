"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, PlusIcon, CheckIcon } from "../ui/Icons";

function ChevronIcon({ open, className = "size-3" }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} transition-transform duration-150 ${open ? "rotate-180" : ""}`}
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

type ProjectData = {
  name: string;
  subFolders: string[];
};

const INITIAL_PROJECTS: ProjectData[] = [
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
  hideQuickSave?: boolean;
};

export default function SaveToProjectPopover({ onClose, hideQuickSave = false }: SaveToProjectPopoverProps) {
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({
    0: true,
  });
  const popoverRef = useRef<HTMLDivElement>(null);

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

  /* Create New Project inline input */
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const createProjectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreatingProject && createProjectRef.current) {
      createProjectRef.current.focus();
    }
  }, [isCreatingProject]);

  const confirmCreateProject = () => {
    if (newProjectName.trim()) {
      setProjects((prev) => [...prev, { name: newProjectName.trim().toUpperCase(), subFolders: [] }]);
    }
    setIsCreatingProject(false);
    setNewProjectName("");
  };

  const cancelCreateProject = () => {
    setIsCreatingProject(false);
    setNewProjectName("");
  };

  /* Add Sub Folder inline input — tracked per project index */
  const [addingSubFolderFor, setAddingSubFolderFor] = useState<number | null>(null);
  const [newSubFolderName, setNewSubFolderName] = useState("");
  const subFolderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addingSubFolderFor !== null && subFolderInputRef.current) {
      subFolderInputRef.current.focus();
    }
  }, [addingSubFolderFor]);

  const confirmAddSubFolder = (projectIndex: number) => {
    if (newSubFolderName.trim()) {
      setProjects((prev) => {
        const updated = [...prev];
        updated[projectIndex] = {
          ...updated[projectIndex],
          subFolders: [...updated[projectIndex].subFolders, newSubFolderName.trim().toUpperCase()],
        };
        return updated;
      });
    }
    setAddingSubFolderFor(null);
    setNewSubFolderName("");
  };

  const cancelAddSubFolder = () => {
    setAddingSubFolderFor(null);
    setNewSubFolderName("");
  };

  return (
    <motion.div
      ref={popoverRef}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-[305px] bg-white rounded-[4px] z-50 origin-top-left"
      style={{ boxShadow: "0px 5px 12px rgba(0,0,0,0.1)" }}
    >
      {/* Quick Save — hidden on product detail page */}
      {!hideQuickSave && (
        <button className="w-full text-left px-5 py-3.5 border-b border-[var(--color-border)] text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors duration-150">
          QUICK SAVE
        </button>
      )}

      {/* Create New Project */}
      <AnimatePresence mode="wait" initial={false}>
        {isCreatingProject ? (
          <motion.div
            key="create-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--color-border)]"
          >
            <input
              ref={createProjectRef}
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmCreateProject();
                else if (e.key === "Escape") cancelCreateProject();
              }}
              placeholder="PROJECT NAME"
              className="flex-1 min-w-0 text-[14px] font-medium uppercase tracking-wide bg-transparent border-b border-[var(--color-text-default)] outline-none py-1 placeholder:text-[var(--color-text-disabled)]"
            />
            <button onClick={confirmCreateProject} className="cursor-pointer p-0.5">
              <CheckIcon className="size-4 text-[var(--color-text-default)]" />
            </button>
            <button onClick={cancelCreateProject} className="cursor-pointer p-0.5">
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
            onClick={() => setIsCreatingProject(true)}
            className="w-full flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors duration-150"
          >
            <span>CREATE NEW PROJECT</span>
            <PlusIcon className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Project list */}
      {projects.map((project, index) => (
        <div key={`${project.name}-${index}`} className="border-b border-[var(--color-border)] last:border-b-0">
          <button
            onClick={() => toggleProject(index)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors duration-150"
          >
            <span>{project.name}</span>
            <ChevronIcon open={!!expandedProjects[index]} />
          </button>

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
                    className="w-full text-left pl-11 pr-5 py-2.5 text-[13px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors duration-150"
                  >
                    {folder}
                  </button>
                ))}

                {/* Add Sub Folder */}
                <AnimatePresence mode="wait" initial={false}>
                  {addingSubFolderFor === index ? (
                    <motion.div
                      key="subfolder-input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2 pl-11 pr-5 py-2 border-b border-[var(--color-border)]"
                    >
                      <input
                        ref={subFolderInputRef}
                        type="text"
                        value={newSubFolderName}
                        onChange={(e) => setNewSubFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") confirmAddSubFolder(index);
                          else if (e.key === "Escape") cancelAddSubFolder();
                        }}
                        placeholder="FOLDER NAME"
                        className="flex-1 min-w-0 text-[13px] font-medium uppercase tracking-wide bg-transparent border-b border-[var(--color-text-default)] outline-none py-1 placeholder:text-[var(--color-text-disabled)]"
                      />
                      <button onClick={() => confirmAddSubFolder(index)} className="cursor-pointer p-0.5">
                        <CheckIcon className="size-3.5 text-[var(--color-text-default)]" />
                      </button>
                      <button onClick={cancelAddSubFolder} className="cursor-pointer p-0.5">
                        <CloseIcon className="size-3 text-[var(--color-text-default)]" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="subfolder-button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => {
                        setAddingSubFolderFor(index);
                        setNewSubFolderName("");
                      }}
                      className="w-full flex items-center justify-between pl-11 pr-5 py-2.5 text-[13px] font-medium uppercase tracking-wide cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors duration-150"
                    >
                      <span>ADD SUB FOLDER</span>
                      <PlusIcon className="size-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
