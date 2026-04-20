import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cosmica = localFont({
  src: [
    { path: "../../public/fonts/CosmicaTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/CosmicaTrial-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/CosmicaTrial-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/CosmicaTrial-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-cosmica",
  display: "swap",
});

const cosmicaMono = localFont({
  src: [
    { path: "../../public/fonts/CosmicaMonoTrial-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/CosmicaMonoTrial-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-cosmica-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scour",
  description: "Curated antique & vintage furniture marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cosmica.variable} ${cosmicaMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
