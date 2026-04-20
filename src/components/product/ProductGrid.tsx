"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/data/mock";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  // Split products into 4 columns for masonry layout
  const columns: Product[][] = [[], [], [], []];
  products.forEach((product, i) => {
    columns[i % 4].push(product);
  });

  return (
    <div className="flex gap-5 items-start w-full">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-2 flex-1 min-w-0">
          {column.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}
    </div>
  );
}
