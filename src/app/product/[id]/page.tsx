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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id) ?? products[0];
  const vendor = vendors[0];

  const [showSavePopover, setShowSavePopover] = useState(false);
  const handleCloseSavePopover = useCallback(() => setShowSavePopover(false), []);

  // Pick 4 related products (excluding current)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 px-5 py-4 text-sm uppercase">
        <Link
          href="/"
          className="text-[var(--color-text-default)] hover:underline font-medium"
        >
          Home
        </Link>
        <SlashIcon className="size-3.5 text-[var(--color-text-disabled)]" />
        <span className="text-[var(--color-text-default)] font-medium">Seating</span>
        <SlashIcon className="size-3.5 text-[var(--color-text-disabled)]" />
        <span className="text-[var(--color-text-disabled)] font-medium">
          {product.title}
        </span>
      </div>

      {/* Main content: two columns */}
      <div className="flex gap-8 px-5 pb-12">
        {/* Left column - product image */}
        <div className="w-[40%] shrink-0">
          <div className="relative w-full aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
            <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
            {/* Bookmark button */}
            <button className="absolute top-0 left-0 p-3 backdrop-blur-[7.5px] bg-white/50 z-10 cursor-pointer">
              <BookmarkIcon className="size-6 text-[var(--color-text-default)]" />
            </button>
          </div>
        </div>

        {/* Right column - product info */}
        <div className="w-[60%] flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-[28px] font-semibold uppercase tracking-wide leading-tight">
            {product.title}
          </h1>

          {/* Seller / meta row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-subtle)]">
              <span>{product.seller}</span>
              <span>&middot;</span>
              <span>Vienna, Austria</span>
              <span>&middot;</span>
              <span>Mar 2025</span>
            </div>
            <span className="text-base font-medium">
              <span className="font-sans">$</span>
              <span className="font-mono">{product.price.toLocaleString()}</span>
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <button className="bg-[var(--color-action-primary)] text-white text-base font-bold uppercase px-[22px] py-[12px] cursor-pointer">
              View Product
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSavePopover((prev) => !prev)}
                className="bg-[var(--color-action-primary)] text-white text-base font-bold uppercase px-[22px] py-[12px] cursor-pointer"
              >
                Add to Project
              </button>
              {showSavePopover && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <SaveToProjectPopover onClose={handleCloseSavePopover} />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-[var(--color-text-subtle)] leading-[1.5]">
            A beautifully crafted piece that blends timeless design with modern sensibility.
            Handmade using traditional techniques, this item showcases exceptional
            craftsmanship and attention to detail. Perfect for residential and commercial
            interiors seeking a touch of European elegance.
          </p>

          {/* Specs table */}
          <div className="flex flex-col">
            {[
              { label: "Dimensions", value: product.dimensions ?? '30"W x 28"D x 32"H' },
              { label: "Quantity", value: "1" },
              { label: "Materials", value: "Solid wood, natural cane" },
              { label: "Ships from", value: "Vienna, Austria" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-3 border-b border-[var(--color-border)]"
              >
                <span className="text-sm text-[var(--color-text-subtle)]">
                  {row.label}
                </span>
                <span className="text-sm text-[var(--color-text-default)]">
                  {row.value}
                </span>
              </div>
            ))}
            {/* Tear sheet row */}
            <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
              <span className="text-sm text-[var(--color-text-subtle)]">Tear sheet</span>
              <button className="text-sm text-[var(--color-text-default)] uppercase font-semibold underline cursor-pointer">
                Download
              </button>
            </div>
          </div>

          {/* Vendor card */}
          <div className="bg-[#edebe2] p-5 flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold uppercase">{vendor.name}</h3>
            <p className="text-sm text-[var(--color-text-subtle)] leading-[1.5]">
              {vendor.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-text-default)]">
              <span className="flex items-center gap-1.5">
                <InstagramIcon className="size-4" />
                @{vendor.instagram}
              </span>
              <span className="flex items-center gap-1.5">
                <LinkIcon className="size-4" />
                {vendor.website}
              </span>
              <span className="flex items-center gap-1.5">
                <LocationIcon className="size-4" />
                {vendor.location}
              </span>
            </div>
            <Link
              href={`/vendor/${vendor.id}`}
              className="text-sm font-semibold uppercase underline mt-1"
            >
              View Store
            </Link>
          </div>
        </div>
      </div>

      {/* More Like This section */}
      <div className="px-5 pb-12">
        <h2 className="text-[20px] font-semibold uppercase mb-6">More Like This</h2>
        <ProductGrid products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
}
