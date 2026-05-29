import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import ProductGrid from "@/components/sections/ProductGrid";
import InStoreSection from "@/components/sections/InStoreSection";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { flavours, instoreItems } from "@/lib/data";

export default function Home() {
  const previewFlavours = flavours.slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Order Now CTA */}
      <div className="flex justify-center py-10 bg-cream">
        <Button href="/flavours">Order Now</Button>
      </div>

      <MarqueeSection text="Fresh Cakes" />

      <ProductGrid
        items={previewFlavours}
        ctaLabel="See all flavours"
        ctaHref="/flavours"
      />

      <InStoreSection items={instoreItems} />

      <Footer />
    </>
  );
}
