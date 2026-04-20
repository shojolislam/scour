"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import ProductGrid from "@/components/product/ProductGrid";
import {
  ArrowBackIcon,
  HeartIcon,
  InstagramIcon,
  LinkIcon,
  LocationIcon,
} from "@/components/ui/Icons";
import { products, vendors } from "@/data/mock";

export default function VendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vendor = vendors.find((v) => v.id === id) ?? vendors[0];

  // Show first 4 products as "latest items"
  const latestProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

      {/* Back button */}
      <div className="px-5 py-4">
        <Link
          href="/product/1"
          className="inline-flex items-center gap-2 text-sm uppercase font-medium text-[var(--color-text-default)] hover:opacity-70 transition-opacity"
        >
          <ArrowBackIcon className="size-4" />
          Back
        </Link>
      </div>

      {/* Vendor header */}
      <div className="px-5 pb-8 flex flex-col gap-4">
        {/* Name row with heart icon */}
        <div className="flex items-start justify-between">
          <h1 className="text-[28px] font-semibold uppercase tracking-wide leading-tight">
            {vendor.name}
          </h1>
          <button className="cursor-pointer mt-1">
            <HeartIcon className="size-6 text-[var(--color-text-default)]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[18px] text-[var(--color-text-subtle)] leading-[1.5] max-w-3xl">
          {vendor.description}
        </p>

        {/* Social links bar */}
        <div className="flex items-center gap-6 py-4 border-t border-b border-[var(--color-border)] text-sm text-[var(--color-text-default)]">
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
      </div>

      {/* Latest Items */}
      <div className="px-5 pb-12">
        <h2 className="text-[20px] font-semibold uppercase mb-6">Latest Items</h2>
        <ProductGrid products={latestProducts} />
      </div>
    </div>
  );
}
