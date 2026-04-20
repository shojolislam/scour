import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import { products } from "@/data/mock";

export default function Home() {
  return (
    <div className="bg-white min-h-screen relative">
      <Header />
      <Sidebar />

      {/* Main content area */}
      <main className="ml-[256px] pt-[60px]">
        <div className="p-5">
          <ProductGrid products={products} />
        </div>
        <Pagination />
        <Footer />
      </main>
    </div>
  );
}
