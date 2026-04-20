"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

/* ---------- Mock data for the inspiration page ---------- */

const perspectiveCards = [
  {
    title: "Based on your style",
    description: "Curated picks that match your saved preferences and browsing history.",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Trend Alert: Art Deco",
    description: "Geometric forms, bold materials, and the glamour of the 1920s.",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Today's Artisans",
    description: "Handcrafted pieces from contemporary makers honouring traditional methods.",
    images: ["https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Modern Icons",
    description: "Iconic designs from the twentieth century that remain relevant today.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=185&h=207&fit=crop&q=80"],
  },
];

const featuredProducts = [
  { title: "Pair of Italian Rope Seat Lounge Chairs", seller: "Olive Ateliers", price: 495, image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=900&fit=crop&q=80" },
  { title: "'Snowflake' Chandelier Paavo Tynell", seller: "Maison Gerard", price: 1250, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=900&fit=crop&q=80" },
  { title: "Antique French Les Vosges Cabinet", seller: "Liz O'Brien", price: 3800, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=900&fit=crop&q=80" },
];

const bottomProducts = [
  { title: "Mid-Century Brass Floor Lamp", seller: "Maison Gerard", price: 1250, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=900&fit=crop&q=80" },
  { title: "Victorian Mahogany Writing Desk", seller: "Liz O'Brien", price: 3800, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=900&fit=crop&q=80" },
  { title: "Waste Waste 40 X 40 Desk", seller: "Olive Ateliers", price: 495, image: "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=600&h=900&fit=crop&q=80" },
  { title: "Antique French Les Vosges Cabinet", seller: "Olive Ateliers", price: 495, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=900&fit=crop&q=80" },
  { title: "The Mr. Wolcott - Heritage", seller: "Olive Ateliers", price: 495, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=900&fit=crop&q=80" },
];

const roomCards = [
  {
    title: "Based on your Room",
    description: "Pieces selected for rooms you've saved and projects you're working on.",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Trend Alert: Art Deco",
    description: "Geometric forms, bold materials, and the glamour of the 1920s.",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Today's Artisans",
    description: "Handcrafted pieces from contemporary makers honouring traditional methods.",
    images: ["https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=185&h=207&fit=crop&q=80"],
  },
  {
    title: "Modern Icons",
    description: "Iconic designs from the twentieth century that remain relevant today.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=375&h=208&fit=crop&q=80", "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=185&h=207&fit=crop&q=80", "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=185&h=207&fit=crop&q=80"],
  },
];

/* ---------- Sub-components ---------- */

/** Image placeholder grid used inside collection cards */
function CollectionImageGrid({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full h-[208px] bg-[var(--color-grey-50)] overflow-hidden">
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-1">
        <div className="flex-1 h-[207px] bg-[var(--color-grey-50)] overflow-hidden">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 h-[207px] bg-[var(--color-grey-50)] overflow-hidden">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

/** Minimal product card (no hover effects, just placeholder + info) */
function SimpleProductCard({
  title,
  seller,
  price,
  image,
}: {
  title: string;
  seller: string;
  price: number;
  image?: string;
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="w-full aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
      </div>
      <div className="flex flex-col gap-1.5 py-3 text-[var(--color-text-default)]">
        <p className="font-semibold text-sm leading-[1.25] uppercase">{title}</p>
        <div className="flex items-center gap-2">
          <p className="flex-1 min-w-0 text-xs leading-[1.25]">{seller}</p>
          <p className="text-sm font-medium leading-[1.25] whitespace-nowrap">
            <span className="font-sans">$</span>
            <span className="font-mono">{price.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header */}
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-[60px]" />

      {/* Main content - vertical stack with 80px gap between major sections */}
      <main className="flex flex-col gap-[80px]">
        {/* ───────────────────────── 2. Hero Section ───────────────────────── */}
        <section className="p-5">
          <div className="relative w-full h-[640px] bg-[var(--color-grey-50)] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=640&fit=crop&q=80" alt="Timeless Treasures" className="absolute inset-0 w-full h-full object-cover" />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.33)]" />

            {/* Bottom-left content */}
            <div className="absolute bottom-10 left-10 flex flex-col gap-4">
              <h1 className="text-[40px] font-semibold uppercase text-white tracking-wide leading-[1.1] max-w-[739px]">
                Timeless Treasures: A Journey Through French Antiques
              </h1>
              <Link
                href="/blog/timeless-treasures-french-antiques"
                className="text-base font-bold uppercase text-white hover:opacity-80 transition-opacity"
              >
                View Collection
              </Link>
            </div>

            {/* Bottom-right carousel dots */}
            <div className="absolute bottom-10 right-10 flex items-center gap-2">
              <span className="w-6 h-1 bg-white rounded-[1px]" />
              <span className="w-6 h-1 bg-white/[0.33] rounded-[1px]" />
              <span className="w-6 h-1 bg-white/[0.33] rounded-[1px]" />
            </div>
          </div>
        </section>

        {/* ───────── 3. Explore Based on Perspective ───────── */}
        <section className="p-5">
          <h2 className="text-[28px] font-semibold uppercase text-center mb-10">
            Explore Based on Perspective
          </h2>
          <div className="flex flex-wrap gap-5">
            {perspectiveCards.map((card) => (
              <div key={card.title} className="w-[375px]">
                <CollectionImageGrid images={card.images} />
                <div className="py-6">
                  <p className="text-base font-semibold uppercase mb-1">{card.title}</p>
                  <p className="text-sm text-[var(--color-text-subtle)]">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── 4. Featured Article Section ───────────── */}
        <section className="p-5">
          <div className="flex gap-6">
            {/* Left - large image */}
            <div className="shrink-0">
              <div className="w-[640px] h-[854px] bg-[var(--color-grey-50)] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=854&fit=crop&q=80" alt="Featured article" className="w-full h-full object-cover" />
              </div>
              <p className="text-base font-medium text-[var(--color-text-subtle)] opacity-50 mt-3">
                Photography by Jean-Philippe Delberghe
              </p>
            </div>

            {/* Right - article info + products */}
            <div className="flex flex-col flex-1 min-w-0">
              <Link
                href="/blog?category=in-focus"
                className="block text-base font-bold uppercase text-[#bfbba8] mb-4 hover:opacity-80 transition-opacity"
              >
                Object Study
              </Link>
              <Link
                href="/blog/whats-inside-kendell-jenners-home"
                className="block text-[28px] font-semibold uppercase leading-[1.15] mb-3 hover:opacity-80 transition-opacity"
              >
                What&apos;s Inside Kendell Jenners Home?
              </Link>
              <p className="text-lg text-[var(--color-text-subtle)] mb-6">
                An intimate look at the carefully curated collection of antiques and contemporary art
                that define one of the most photographed interiors in the world.
              </p>
              <Link
                href="/blog/whats-inside-kendell-jenners-home"
                className="self-start border border-[var(--color-action-primary)] px-[22px] py-[12px] text-base font-bold uppercase hover:bg-[var(--color-grey-50)] transition-colors cursor-pointer mb-10"
              >
                View Article
              </Link>

              {/* 3 product cards */}
              <div className="flex gap-5 mt-auto">
                {featuredProducts.map((p) => (
                  <SimpleProductCard key={p.title} title={p.title} seller={p.seller} price={p.price} image={p.image} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── 5. Two Blog Cards Section ───────────── */}
        <section className="p-5">
          <div className="flex gap-5">
            {/* Provenance card */}
            <div className="flex-1 min-w-0">
              <Link
                href="/blog?category=provenance"
                className="block text-base font-bold uppercase text-[#bfbba8] mb-4 hover:opacity-80 transition-opacity"
              >
                Provenance
              </Link>
              <div className="w-full h-[340px] bg-[var(--color-grey-50)] overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=340&fit=crop&q=80" alt="The Lost Art of French Gilding" className="w-full h-full object-cover" />
              </div>
              <Link
                href="/blog/the-story-of-a-chair"
                className="block text-xl font-semibold uppercase mb-2 hover:opacity-80 transition-opacity"
              >
                The Lost Art of French Gilding
              </Link>
              <p className="text-lg text-[var(--color-text-subtle)]">
                How a small atelier in Lyon is keeping alive a three-hundred-year-old craft that once
                decorated the halls of Versailles.
              </p>
            </div>

            {/* Trade Notes card */}
            <div className="flex-1 min-w-0">
              <Link
                href="/blog?category=trade-notes"
                className="block text-base font-bold uppercase text-[#bfbba8] mb-4 hover:opacity-80 transition-opacity"
              >
                Trade Notes
              </Link>
              <div className="w-full h-[340px] bg-[var(--color-grey-50)] overflow-hidden mb-4">
                <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=340&fit=crop&q=80" alt="What Dealers Won't Tell You About Provenance" className="w-full h-full object-cover" />
              </div>
              <Link
                href="/blog/15-photographers-shaping-interior-design"
                className="block text-xl font-semibold uppercase mb-2 hover:opacity-80 transition-opacity"
              >
                What Dealers Won&apos;t Tell You About Provenance
              </Link>
              <p className="text-lg text-[var(--color-text-subtle)]">
                Industry insiders share the questions every serious collector should ask before making
                a significant purchase.
              </p>
            </div>
          </div>
        </section>

        {/* ───────────── 6. Focus Article Section ───────────── */}
        <section className="p-5">
          <Link
            href="/blog?category=in-focus"
            className="block text-base font-bold uppercase text-[#bfbba8] mb-4 hover:opacity-80 transition-opacity"
          >
            Focus Article
          </Link>
          <div className="relative w-full h-[640px] bg-[var(--color-grey-50)] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&h=640&fit=crop&q=80" alt="Poul Kjaerholm" className="absolute inset-0 w-full h-full object-cover" />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" />

            {/* Center-left name */}
            <Link
              href="/blog/poul-kjaerholm"
              className="absolute left-10 top-1/2 -translate-y-1/2 text-[40px] font-semibold text-white hover:opacity-80 transition-opacity"
            >
              POUL KJ&AElig;RHOLM
            </Link>

            {/* Bottom-right block */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-4 max-w-[500px]">
              <h3 className="text-[28px] font-semibold text-white uppercase text-right leading-[1.15]">
                The Architect of Minimalism: Poul Kj&aelig;rholm&apos;s Enduring Legacy
              </h3>
              <Link
                href="/blog/poul-kjaerholm"
                className="text-base font-bold uppercase text-white hover:opacity-80 transition-opacity"
              >
                View Collection
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────── 7. Product Row ───────────── */}
        <section className="px-5 pb-5">
          <div className="flex gap-5">
            {bottomProducts.map((p) => (
              <SimpleProductCard key={p.title} title={p.title} seller={p.seller} price={p.price} image={p.image} />
            ))}
          </div>
        </section>

        {/* ───────────── 8. View Blog Archive Link ───────────── */}
        <div className="mx-5 border-t border-b border-[var(--color-border)] py-4 flex justify-end">
          <Link
            href="/blog"
            className="text-base font-bold uppercase text-[#bfbba8] hover:opacity-80 transition-opacity"
          >
            View Blog Archive
          </Link>
        </div>

        {/* ───────── 9. Explore Based on Room ───────── */}
        <section className="p-5">
          <div className="flex flex-wrap gap-5">
            {/* Large title card inline */}
            <div className="w-[375px] flex items-end pb-6">
              <h2 className="text-[40px] font-semibold uppercase leading-[1.1]">
                Explore Based on Room
              </h2>
            </div>

            {roomCards.map((card) => (
              <div key={card.title} className="w-[375px]">
                <CollectionImageGrid images={card.images} />
                <div className="py-6">
                  <p className="text-base font-semibold uppercase mb-1">{card.title}</p>
                  <p className="text-sm text-[var(--color-text-subtle)]">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
