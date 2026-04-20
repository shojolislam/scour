"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import SaveToProjectPopover from "@/components/product/SaveToProjectPopover";
import {
  BookmarkIcon,
  SlashIcon,
  InstagramIcon,
  LinkIcon,
  LocationIcon,
} from "@/components/ui/Icons";
import { products, vendors } from "@/data/mock";

const additionalImages = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=900&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=900&fit=crop&q=80",
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) ?? products[0];
  const vendor = vendors[0];

  const [showSavePopover, setShowSavePopover] = useState(false);
  const [quickSaved, setQuickSaved] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [addedToProject, setAddedToProject] = useState<string | null>(null);
  const handleCloseSavePopover = useCallback(() => setShowSavePopover(false), []);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleSaveToProject = useCallback((projectName: string) => {
    setAddedToProject(projectName);
    setShowSavePopover(false);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="h-[60px]" />

      {/* Breadcrumb — hidden on mobile */}
      <div className="hidden md:flex items-center gap-1 px-5 py-4 text-sm uppercase">
        <Link href="/" className="text-[var(--color-text-default)] hover:underline font-medium">Home</Link>
        <SlashIcon className="size-3.5 text-[var(--color-text-disabled)]" />
        <span className="text-[var(--color-text-default)] font-medium">Seating</span>
        <SlashIcon className="size-3.5 text-[var(--color-text-disabled)]" />
        <span className="text-[var(--color-text-disabled)] font-medium">{product.title}</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-0 md:gap-8 px-0 md:px-5 pb-20 md:pb-12">
        {/* Left column — images */}
        {/* Mobile: horizontal swipeable carousel. Desktop: scrollable column contained to right col height */}
        <div className="w-full md:w-[40%] shrink-0">
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-1 overflow-x-auto snap-x snap-mandatory">
            <div className="relative w-[85vw] shrink-0 snap-start aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <button
                onClick={() => { quickSaved ? setShowRemoveConfirm(true) : setQuickSaved(true); }}
                className={`absolute top-0 left-0 p-2 backdrop-blur-[7.5px] z-10 cursor-pointer transition-colors duration-150 ${quickSaved ? "bg-[var(--color-action-primary)]" : "bg-white/50"}`}
              >
                <BookmarkIcon className={`size-4 ${quickSaved ? "text-white" : "text-[var(--color-text-default)]"}`} />
              </button>
              {showRemoveConfirm && (
                <div className="absolute top-10 left-0 z-50 w-[200px] bg-white rounded-[4px] p-3 flex flex-col gap-2" style={{ boxShadow: "0px 5px 12px rgba(0,0,0,0.1)" }}>
                  <p className="text-[13px] font-medium uppercase">Remove from Quick Save</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowRemoveConfirm(false)} className="flex-1 text-[12px] font-medium uppercase py-1.5 border border-[var(--color-border)] cursor-pointer">Cancel</button>
                    <button onClick={() => { setQuickSaved(false); setShowRemoveConfirm(false); }} className="flex-1 text-[12px] font-medium uppercase py-1.5 bg-[var(--color-action-primary)] text-white cursor-pointer">Remove</button>
                  </div>
                </div>
              )}
            </div>
            {additionalImages.map((img, i) => (
              <div key={i} className="w-[85vw] shrink-0 snap-start aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
                <img src={img} alt={`Detail view ${i + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Desktop: contained scrollable column — matches right column height */}
          <div className="hidden md:block md:sticky md:top-[80px] md:max-h-[calc(100vh-100px)] md:overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
                <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  onClick={() => { quickSaved ? setShowRemoveConfirm(true) : setQuickSaved(true); }}
                  className={`absolute top-0 left-0 p-3 backdrop-blur-[7.5px] z-10 cursor-pointer transition-colors duration-150 ${quickSaved ? "bg-[var(--color-action-primary)]" : "bg-white/50"}`}
                >
                  <BookmarkIcon className={`size-6 ${quickSaved ? "text-white" : "text-[var(--color-text-default)]"}`} />
                </button>
                {showRemoveConfirm && (
                  <div className="absolute top-12 left-0 z-50 w-[220px] bg-white rounded-[4px] p-4 flex flex-col gap-3" style={{ boxShadow: "0px 5px 12px rgba(0,0,0,0.1)" }}>
                    <p className="text-[14px] font-medium uppercase">Remove from Quick Save</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowRemoveConfirm(false)} className="flex-1 text-[13px] font-medium uppercase py-1.5 border border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-grey-50)] transition-colors">Cancel</button>
                      <button onClick={() => { setQuickSaved(false); setShowRemoveConfirm(false); }} className="flex-1 text-[13px] font-medium uppercase py-1.5 bg-[var(--color-action-primary)] text-white cursor-pointer">Remove</button>
                    </div>
                  </div>
                )}
              </div>
              {additionalImages.map((img, i) => (
                <div key={i} className={`w-full ${i === 1 ? "aspect-square" : "aspect-[2/3]"} bg-[var(--color-grey-50)] overflow-hidden`}>
                  <img src={img} alt={`Detail view ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — product info */}
        <div className="w-full md:w-[60%] md:sticky md:top-[80px] md:self-start flex flex-col gap-4 md:gap-6 px-3 md:px-0 pt-4 md:pt-0">
          <h1 className="text-xl md:text-[28px] font-semibold uppercase tracking-wide leading-tight">
            {product.title}
          </h1>

          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1 text-sm text-[var(--color-text-default)]">
              <span>{product.seller}</span>
              <span>Vienna, Austria</span>
              <span>Mar 2025</span>
            </div>
            <span className="text-base font-medium">
              <span className="font-sans">$</span>
              <span className="font-mono">{product.price.toLocaleString()}</span>
            </span>
          </div>

          {/* CTA buttons — hidden on mobile (shown sticky at bottom instead) */}
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-[var(--color-action-primary)] text-white text-base font-bold uppercase px-[22px] py-[12px] cursor-pointer">
              View Product
            </button>
            <div className="relative">
              <button
                onClick={() => addedToProject ? setAddedToProject(null) : setShowSavePopover((prev) => !prev)}
                className={`text-base font-bold uppercase px-[22px] py-[12px] cursor-pointer transition-colors duration-150 ${
                  addedToProject
                    ? "bg-white border border-[var(--color-action-primary)] text-[var(--color-text-default)]"
                    : "bg-[var(--color-action-primary)] text-white"
                }`}
              >
                {addedToProject ? `Added to ${addedToProject}` : "Add to Project"}
              </button>
              {showSavePopover && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <SaveToProjectPopover onClose={handleCloseSavePopover} hideQuickSave onSelectProject={handleSaveToProject} />
                </div>
              )}
            </div>
          </div>

          <p className="text-sm md:text-base text-[var(--color-text-subtle)] leading-[1.5]">
            A beautifully crafted piece that blends timeless design with modern sensibility.
            Handmade using traditional techniques, this item showcases exceptional
            craftsmanship and attention to detail. Perfect for residential and commercial
            interiors seeking a touch of European elegance.
          </p>

          <div className="flex flex-col">
            {[
              { label: "Dimensions", value: product.dimensions ?? '30"W x 28"D x 32"H' },
              { label: "Quantity", value: "1" },
              { label: "Materials", value: "Solid wood, natural cane" },
              { label: "Ships from", value: "Vienna, Austria" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 md:py-3 border-b border-[var(--color-border)]">
                <span className="text-sm text-[var(--color-text-subtle)]">{row.label}</span>
                <span className="text-sm text-[var(--color-text-default)]">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 md:py-3 border-b border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-text-subtle)]">Tear sheet</span>
              <button className="text-sm text-[var(--color-text-default)] uppercase font-semibold underline cursor-pointer">Download</button>
            </div>
          </div>

          <div className="bg-[#edebe2] p-3 md:p-5 flex flex-col gap-3 md:gap-4">
            <h3 className="text-base md:text-[20px] font-semibold uppercase">{vendor.name}</h3>
            <p className="text-xs md:text-sm text-[var(--color-text-subtle)] leading-[1.5]">{vendor.description}</p>
            <div className="flex flex-col gap-2 text-xs md:text-sm text-[var(--color-text-default)]">
              <span className="flex items-center gap-1.5"><InstagramIcon className="size-4" />@{vendor.instagram}</span>
              <span className="flex items-center gap-1.5"><LinkIcon className="size-4" />{vendor.website}</span>
              <span className="flex items-center gap-1.5"><LocationIcon className="size-4" />{vendor.location}</span>
            </div>
            <Link href={`/vendor/${vendor.id}`} className="text-sm font-semibold uppercase underline mt-1">View Store</Link>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] flex items-center gap-2 p-3 md:hidden">
        <button className="flex-1 bg-[var(--color-action-primary)] text-white text-sm font-bold uppercase py-3 cursor-pointer">
          View Product
        </button>
        <button
          onClick={() => addedToProject ? setAddedToProject(null) : setShowSavePopover((prev) => !prev)}
          className={`flex-1 text-sm font-bold uppercase py-3 cursor-pointer transition-colors duration-150 ${
            addedToProject
              ? "bg-white border border-[var(--color-action-primary)] text-[var(--color-text-default)]"
              : "bg-[var(--color-action-primary)] text-white"
          }`}
        >
          {addedToProject ? `Added to ${addedToProject}` : "Add to Project"}
        </button>
      </div>

      {/* More Like This */}
      <div className="px-3 md:px-5 pb-12">
        <h2 className="text-base md:text-[20px] font-semibold uppercase mb-4 md:mb-6">More Like This</h2>
        <ProductGrid products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
}
