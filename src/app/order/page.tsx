import type { Metadata } from "next";
import OrderProductGrid from "@/components/sections/OrderProductGrid";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import Footer from "@/components/layout/Footer";
import { howItWorks } from "@/lib/data";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Click & Collect",
  description:
    "Order Clara's Bakehouse cakes online and collect from your nearest store.",
};

export const revalidate = 180;

export default async function OrderPage() {
  const products = await getProducts();
  return (
    <>
      {/* Page header */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto pt-14 pb-10 px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            {/* Left */}
            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-muted mb-3">
                Click &amp; Collect
              </p>
              <h1 className="font-display text-[64px] leading-none uppercase text-ink mb-4">
                Order Online
              </h1>
              <p className="text-sm text-muted max-w-[440px] leading-relaxed">
                Choose your flavour, pick a collection date, and we&apos;ll have
                it ready. Minimum 48 hours notice required.
              </p>
            </div>

            {/* Right: 3-step summary */}
            <div className="hidden md:flex flex-col gap-3 pb-1">
              {["Pick a cake", "Choose a date", "Collect in store"].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="font-display text-[13px] text-brand-pink leading-none w-5 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-xs uppercase tracking-[1.5px] text-ink">
                      {step}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <OrderProductGrid products={products} />

      <HowItWorksSection steps={howItWorks} />

      <Footer />
    </>
  );
}
