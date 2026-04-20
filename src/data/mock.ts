export type Product = {
  id: string;
  title: string;
  seller: string;
  price: number;
  dimensions?: string;
  aspectRatio: "1:1" | "2:3";
  outOfStock?: boolean;
  image: string;
  location?: string;
};

export const products: Product[] = [
  { id: "1", title: "The Mr. Wolcott - Heritage - Swatch Collection", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=900&fit=crop&q=80" },
  { id: "2", title: "'Snowflake' Chandelier Paavo Tynell", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=900&fit=crop&q=80" },
  { id: "3", title: "Antique French Les", seller: "Olive Ateliers", price: 495, location: "Portland, OR", dimensions: '67"W × 32.3"D × 33.5"H', aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=900&fit=crop&q=80" },
  { id: "4", title: "Waste Waste 40 X 40 Desk", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1532372320978-c5c5ef23595a?w=600&h=900&fit=crop&q=80" },
  { id: "5", title: "Antique French Les", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=900&fit=crop&q=80" },
  { id: "6", title: "Antique French Les", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1555685668-dc1e1e2f9b64?w=600&h=900&fit=crop&q=80" },
  { id: "7", title: "Pair of Italian Rope Seat Lounge Chairs", seller: "Olive Ateliers", price: 495, location: "Portland, OR", dimensions: '30"W × 28"D × 32"H', aspectRatio: "1:1", image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=600&fit=crop&q=80" },
  { id: "8", title: "Antique French Les", seller: "Olive Ateliers", price: 495, location: "Portland, OR", aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=900&fit=crop&q=80" },
  { id: "9", title: "Mid-Century Brass Floor Lamp", seller: "Maison Gerard", price: 1250, location: "New York, NY", dimensions: '12"W × 12"D × 62"H', aspectRatio: "2:3", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=900&fit=crop&q=80" },
  { id: "10", title: "Victorian Mahogany Writing Desk", seller: "Liz O'Brien", price: 3800, location: "New York, NY", aspectRatio: "1:1", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=600&fit=crop&q=80" },
];

export const filterOptions = [
  "Sort by",
  "Price",
  "Ships from",
  "Dimensions",
  "Period",
  "Made in",
  "Style",
  "Color",
  "Stores",
  "Quantity",
  "Material",
  "Production",
];

export const categories = [
  "Seating",
  "Tables",
  "Lighting",
  "Storage",
  "Mirrors",
  "Rugs & Textiles",
  "Art & Decorative Objects",
  "Outdoor",
  "Kitchen & Dining",
  "Bedroom",
  "Office",
  "Bathroom",
];

export type Project = {
  id: string;
  name: string;
  productIds: string[];
};

export const projects: Project[] = [
  { id: "1", name: "Living Room Renovation", productIds: ["1", "3"] },
  { id: "2", name: "Office Redesign", productIds: ["4"] },
];

export type Vendor = {
  id: string;
  name: string;
  description: string;
  instagram: string;
  website: string;
  location: string;
};

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Gebrüder Thonet Vienna",
    description: "A premier trade program designed exclusively for interior designers, architects, and design professionals seeking access to exceptional European furniture and craftsmanship.",
    instagram: "gebruder_thonet_vienna",
    website: "www.gebruederthonetvienna.com",
    location: "Vienna, Austria",
  },
];
