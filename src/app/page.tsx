"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import { products } from "@/data/mock";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen relative">
      <Header onFilterClick={() => setSidebarOpen(true)} />
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <main className="ml-0 lg:ml-[256px] pt-[104px] md:pt-[60px]">
        <div className="p-3 md:p-5">
          <ProductGrid products={products} />
        </div>
        <Pagination />
        <Footer />
      </main>
    </div>
  );
}
