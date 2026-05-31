import type { Metadata } from "next";
import ProductGrid from "@/components/sections/ProductGrid";
import MarqueeSection from "@/components/sections/MarqueeSection";
import InStoreSection from "@/components/sections/InStoreSection";
import Footer from "@/components/layout/Footer";
import { getFlavours, getInstoreItems } from "@/lib/db";

export const metadata: Metadata = {
  title: "Flavours",
  description:
    "Explore Clara's Bakehouse monthly specials — handcrafted cakes rotating with the seasons.",
};

export const revalidate = 3600;

export default async function FlavoursPage() {
  const [flavours, instoreItems] = await Promise.all([
    getFlavours(),
    getInstoreItems(),
  ]);
  return (
    <>
      {/* Page header */}
      <section className="pt-20 pb-2 px-6 bg-cream text-center">
        <p className="uppercase tracking-[0.2em] text-[11px] text-muted mb-4">
          Monthly Specials
        </p>
        <h1 className="font-display uppercase text-ink text-5xl md:text-7xl">
          Our Flavours
        </h1>
      </section>

      {/* Pass title={null} since the h1 is handled above */}
      <ProductGrid
        items={flavours}
        title={null}
        ctaLabel="Order Now"
        ctaHref="/"
        subtitle="Handcrafted with seasonal ingredients and rotated monthly. Check back often — something new is always baking."
      />

      <MarqueeSection text="Fresh Cakes" />

      <InStoreSection items={instoreItems} />

      <Footer />
    </>
  );
}
