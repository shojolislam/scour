"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ---------- Types & Data ---------- */

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  description: string;
};

const heroArticle: BlogPost = {
  slug: "timeless-treasures-french-antiques",
  title: "TIMELESS TREASURES: A JOURNEY THROUGH FRENCH ANTIQUES",
  category: "PROVENANCE",
  categorySlug: "provenance",
  date: "3 Feb, 26",
  description:
    "From the gilded salons of Paris to the sun-drenched markets of Provence, French antiques carry centuries of craftsmanship, elegance, and storytelling. This article traces the enduring allure of French decorative arts and offers guidance for collectors seeking authentic pieces with impeccable provenance.",
};

const blogPosts: BlogPost[] = [
  {
    slug: "sleek-and-chic-minimalism-dallas-1",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "PROVENANCE",
    categorySlug: "provenance",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-2",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "TRADE NOTES",
    categorySlug: "trade-notes",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-3",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "IN FOCUS",
    categorySlug: "in-focus",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-4",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "PROVENANCE",
    categorySlug: "provenance",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-5",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "IN FOCUS",
    categorySlug: "in-focus",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-6",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "TRADE NOTES",
    categorySlug: "trade-notes",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-7",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "PROVENANCE",
    categorySlug: "provenance",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
  {
    slug: "sleek-and-chic-minimalism-dallas-8",
    title: "Sleek and Chic: Embracing Minimalism in Dallas Interiors",
    category: "IN FOCUS",
    categorySlug: "in-focus",
    date: "3 Feb, 26",
    description:
      "Dallas designers are redefining luxury through restraint, pairing clean lines with warm textures to create spaces that feel both elevated and effortless.",
  },
];

const tabs = [
  { label: "ALL", slug: "all" },
  { label: "IN FOCUS", slug: "in-focus" },
  { label: "PROVENANCE", slug: "provenance" },
  { label: "TRADE NOTES", slug: "trade-notes" },
];

/* ---------- Page ---------- */

export default function BlogListingPage() {
  return (
    <Suspense>
      <BlogListingContent />
    </Suspense>
  );
}

function BlogListingContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeTab, setActiveTab] = useState(categoryParam || "all");
  const hasScrolled = useRef(false);

  /* Scroll to the blog posts section when arriving with a category param */
  useEffect(() => {
    if (categoryParam && !hasScrolled.current) {
      hasScrolled.current = true;
      /* Small delay to ensure the DOM has rendered */
      const timer = setTimeout(() => {
        document.getElementById("blog-posts")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [categoryParam]);

  const filteredPosts =
    activeTab === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.categorySlug === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="h-[60px]" />

      <main className="flex flex-col">
        {/* ───────────── Hero Article ───────────── */}
        <section className="p-3 md:p-5">
          {/* Image placeholder */}
          <div className="w-full h-[250px] md:h-[400px] lg:h-[539px] bg-[var(--color-grey-50)] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&h=539&fit=crop&q=80" alt="Timeless Treasures" className="w-full h-full object-cover" />
          </div>

          {/* Category + Date */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-base font-medium uppercase text-[#bfbba8]">
              {heroArticle.category}
            </span>
            <span className="text-base font-medium text-[var(--color-text-subtle)]">
              {heroArticle.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-[28px] font-semibold uppercase mt-3 leading-[1.15]">
            {heroArticle.title}
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-[var(--color-text-default)] mt-3 leading-[1.5]">
            {heroArticle.description}
          </p>

          {/* CTA */}
          <Link
            href={`/blog/${heroArticle.slug}`}
            className="inline-block mt-5 border border-[var(--color-action-primary)] px-4 py-2.5 md:px-[22px] md:py-[12px] text-sm md:text-base font-bold uppercase hover:bg-[var(--color-grey-50)] transition-colors"
          >
            View Article
          </Link>
        </section>

        {/* ───────────── Category Tabs + Blog Grid ───────────── */}
        <div id="blog-posts" className="mx-3 md:mx-5 border-b border-[var(--color-border)]">
          <div className="flex gap-4 md:gap-8 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`py-4 text-sm md:text-base font-medium uppercase cursor-pointer transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[var(--color-text-default)] border-b-2 border-[var(--color-text-default)]"
                      : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ───────────── Blog Post Grid ───────────── */}
        <section className="p-3 md:p-5">
          <div className="flex flex-wrap gap-5 md:gap-10">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col md:flex-row gap-3 md:gap-5 w-full md:w-[calc(50%-20px)] group"
              >
                {/* Image */}
                <div className="w-full md:w-[335px] h-[200px] bg-[var(--color-grey-50)] shrink-0 overflow-hidden">
                  <img src={[
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=335&h=200&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=335&h=200&fit=crop&q=80",
                  ][filteredPosts.indexOf(post) % 8]} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  {/* Category + date */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-base font-medium uppercase text-[var(--color-text-subtle)]">
                      {post.category}
                    </span>
                    <span className="text-base font-medium text-[var(--color-text-subtle)]">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold uppercase leading-[1.2] mb-2">
                    {post.title}
                  </h3>

                  {/* Description - truncated */}
                  <p className="text-base text-[var(--color-text-subtle)] line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────────── View All Link ───────────── */}
        <div className="mx-3 md:mx-5 border-t border-[var(--color-border)] py-4 flex justify-center">
          <button
            onClick={() => setActiveTab("all")}
            className="text-base font-medium text-[var(--color-text-subtle)] uppercase cursor-pointer hover:text-[var(--color-text-default)] transition-colors"
          >
            View all
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
