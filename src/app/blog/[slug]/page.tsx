"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OverflowIcon } from "@/components/ui/Icons";
import { products } from "@/data/mock";
import ProductCard from "@/components/product/ProductCard";

/* ---------- Mock data for key works ---------- */

const keyWorks = [
  { title: "PK22 Lounge Chair", description: "Description", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=296&h=444&fit=crop&q=80" },
  { title: "PK80 Daybed", description: "Description", image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=296&h=444&fit=crop&q=80" },
  { title: "PK61 Coffee Table", description: "Description", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=296&h=444&fit=crop&q=80" },
  { title: "PK91 Folding Stool", description: "Description", image: "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=296&h=444&fit=crop&q=80" },
  { title: "PK54 Dining Table", description: "Description", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=296&h=444&fit=crop&q=80" },
];

/* ---------- Page ---------- */

export default function BlogDetailPage() {
  /* Use existing products for the masonry grid */
  const circulationProducts = products.slice(0, 10);

  /* Split into 5 columns for masonry */
  const columns: typeof circulationProducts[] = [[], [], [], [], []];
  circulationProducts.forEach((product, i) => {
    columns[i % 5].push(product);
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="h-[60px]" />

      <main className="flex flex-col">
        {/* ───────────── 1. Hero Section ───────────── */}
        <section className="px-3 md:px-5 pb-5">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - text info */}
            <div className="flex-1 min-w-0 p-3 md:p-6 flex flex-col justify-between gap-6 md:gap-0">
              <div>
                <h1 className="text-2xl md:text-[40px] font-semibold uppercase tracking-wide leading-[1.1]">
                  POUL KJ&AElig;RHOLM
                </h1>
                <div className="flex flex-col gap-1 mt-4">
                  <p className="text-lg text-[var(--color-text-subtle)]">1929-1980</p>
                  <p className="text-lg text-[var(--color-text-subtle)]">
                    Born in &Oslash;ster Vr&aring;, Denmark
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base font-medium uppercase text-[#bfbba8]">
                  IN FOCUS:
                </span>
                <span className="text-sm text-[var(--color-text-default)]">
                  December 25, 2025
                </span>
              </div>
            </div>

            {/* Right column - image */}
            <div className="flex-1 min-w-0">
              <div className="w-full h-[560px] bg-[var(--color-grey-50)] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=800&h=560&fit=crop&q=80" alt="Poul Kjaerholm furniture" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── 2. Article Body ───────────── */}
        <section className="p-3 md:p-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - large image */}
            <div className="shrink-0">
              <div className="w-full lg:w-[560px] h-[400px] md:h-[560px] lg:h-[747px] bg-[var(--color-grey-50)] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=560&h=747&fit=crop&q=80" alt="Poul Kjaerholm furniture" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right - article text + quote */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="text-sm md:text-lg text-[var(--color-text-default)] leading-[1.5] space-y-4">
                <p>
                  Poul Kj&aelig;rholm was born in 1929 in &Oslash;ster Vr&aring;, a small town in
                  northern Jutland, Denmark. From a young age, he showed an exceptional aptitude
                  for craftsmanship, which led him to train as a cabinetmaker before studying at
                  the Danish School of Arts and Crafts in Copenhagen under the guidance of
                  Hans J. Wegner.
                </p>
                <p>
                  Unlike many of his contemporaries who worked primarily in wood, Kj&aelig;rholm
                  was drawn to industrial materials &mdash; particularly steel, glass, and leather.
                  He believed that these materials, when handled with the same sensitivity as
                  traditional woodworking, could achieve a warmth and humanity that challenged
                  prevailing assumptions about modernist furniture.
                </p>
                <p>
                  His partnership with manufacturer E. Kold Christensen, beginning in 1955, proved
                  transformative. Together they produced pieces that were technically demanding yet
                  visually weightless, each design distilling furniture to its structural essence.
                  The PK22, PK61, and PK80 became instant classics, earning Kj&aelig;rholm
                  international recognition and numerous design awards.
                </p>
                <p>
                  Kj&aelig;rholm&apos;s approach was deeply architectural. He designed not merely
                  objects but spatial experiences, considering how each piece would interact with
                  light, shadow, and the human body. His furniture possesses a quietude that
                  rewards sustained attention &mdash; details that reveal themselves slowly,
                  proportions that feel inevitable.
                </p>
              </div>

              {/* Quote block */}
              <div className="mt-auto pt-10">
                <blockquote className="text-2xl md:text-[40px] font-medium text-center leading-[1.2]">
                  &ldquo;Form is not decoration &mdash; it is the result of material and
                  structure.&rdquo;
                </blockquote>
                <p className="text-xl font-semibold uppercase text-right mt-4">
                  POUL KJ&AElig;RHOLM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── 3. Key Works ───────────── */}
        <section className="p-3 md:p-5">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-base md:text-xl font-semibold uppercase">Key Works</h2>
            <OverflowIcon className="size-5 text-[var(--color-text-subtle)]" />
          </div>

          <div className="flex gap-3 md:gap-5 overflow-x-auto">
            {keyWorks.map((work) => (
              <div key={work.title} className="w-[200px] md:w-[296px] shrink-0">
                <div className="w-full aspect-[2/3] bg-[var(--color-grey-50)] overflow-hidden">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="py-3">
                  <p className="font-semibold text-sm uppercase">{work.title}</p>
                  <p className="text-sm text-[var(--color-text-subtle)] mt-1">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── 4. Collector's Note ───────────── */}
        <section className="p-3 md:p-5">
          <h2 className="text-base md:text-xl font-semibold uppercase mb-4">
            COLLECTOR&apos;S NOTE &mdash; ON THE IMPORTANCE OF THE E. KOLD CHRISTENSEN STAMP
          </h2>
          <p className="text-sm md:text-lg text-[var(--color-text-default)] leading-[1.5]">
            For collectors, the manufacturer&apos;s mark is crucial. Pieces produced by E. Kold
            Christensen between 1955 and 1982 bear a distinctive stamp that has become a
            hallmark of authenticity and quality. After Kold Christensen&apos;s death in 1982,
            production rights transferred to Fritz Hansen, who continues to manufacture many of
            Kj&aelig;rholm&apos;s designs today. While Fritz Hansen pieces maintain excellent
            craftsmanship, the original E. Kold Christensen editions are particularly prized by
            collectors for their historical significance and the close collaboration between
            designer and manufacturer that informed every detail of production.
          </p>
        </section>

        {/* ───────────── 5. Additional Article Sections ───────────── */}
        <section className="p-3 md:p-5 space-y-6 md:space-y-8">
          <p className="text-sm md:text-lg text-[var(--color-text-default)] leading-[1.5]">
            Kj&aelig;rholm&apos;s influence extends far beyond the objects he created. His
            insistence on structural honesty and material integrity established principles that
            continue to guide contemporary furniture design. Each piece serves as both a
            functional object and a meditation on the relationship between form, material, and
            the space it inhabits.
          </p>

          <div>
            <h2 className="text-base md:text-xl font-semibold uppercase mb-3">Design Philosophy</h2>
            <p className="text-sm md:text-lg text-[var(--color-text-default)] leading-[1.5]">
              Kj&aelig;rholm&apos;s design philosophy centred on the belief that beauty emerges
              from structural logic rather than applied decoration. He approached each piece as an
              architectural problem, seeking the most elegant solution that honoured both the
              material&apos;s inherent properties and the user&apos;s physical needs. His use of
              flat steel, often spring steel, allowed him to create forms of extraordinary visual
              lightness while maintaining structural rigidity. The tension between industrial
              precision and organic comfort defines his most celebrated works.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-xl font-semibold uppercase mb-3">Legacy</h2>
            <p className="text-sm md:text-lg text-[var(--color-text-default)] leading-[1.5]">
              Though Kj&aelig;rholm&apos;s career was cut short by his death in 1980 at the age
              of fifty-one, his body of work remains remarkably cohesive and influential. His
              pieces are held in the permanent collections of major museums worldwide, including
              MoMA in New York and the Design Museum in Copenhagen. Today, original
              Kj&aelig;rholm pieces command significant prices at auction, reflecting both their
              design excellence and their enduring relevance. His work continues to inspire
              designers who share his conviction that restraint, precision, and material honesty
              are the foundations of timeless design.
            </p>
          </div>
        </section>

        {/* ───────────── 6. Pieces in Circulation ───────────── */}
        <section className="p-3 md:p-5">
          <h2 className="text-base md:text-xl font-semibold uppercase mb-4 md:mb-6">
            Poul Kj&aelig;rholm Pieces in Circulation
          </h2>

          <div className="flex gap-3 md:gap-5 items-start w-full flex-wrap md:flex-nowrap">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2 w-[calc(50%-6px)] md:flex-1 md:min-w-0">
                {column.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
