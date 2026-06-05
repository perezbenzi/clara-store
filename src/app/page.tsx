import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import ProductGrid from "@/components/sections/ProductGrid";
import InStoreSection from "@/components/sections/InStoreSection";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { getProducts, getInstoreItems } from "@/lib/db";

export const revalidate = 180;

export default async function Home() {
  const [previewProducts, instoreItems] = await Promise.all([
    getProducts().then((p) => p.slice(0, 3)),
    getInstoreItems(),
  ]);

  return (
    <>
      <HeroSection />

      {/* Order Now CTA */}
      <div className="flex justify-center py-10 bg-cream">
        <Button href="/flavours">Order Now</Button>
      </div>

      <MarqueeSection text="Fresh Cakes" />

      <ProductGrid
        items={previewProducts}
        ctaLabel="See all flavours"
        ctaHref="/flavours"
      />

      <InStoreSection items={instoreItems} />

      <Footer />
    </>
  );
}
