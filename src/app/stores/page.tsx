import type { Metadata } from "next";
import StoresGrid from "@/components/sections/StoresGrid";
import OpeningSoon from "@/components/sections/OpeningSoon";
import Footer from "@/components/layout/Footer";
import { stores, openingSoon } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Stores",
  description:
    "Find Clara's Bakehouse in Byron Bay, Bangalow and Brunswick Heads.",
};

export default function StoresPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto pt-14 pb-10 px-12">
          <p className="text-[10px] uppercase tracking-[3px] text-muted mb-3">
            Find us
          </p>
          <h1 className="font-display text-[64px] leading-none uppercase text-ink mb-4">
            Our Stores
          </h1>
          <p className="text-sm text-muted max-w-[440px] leading-relaxed">
            Three locations in and around Byron Bay. Each one a little different
            — every cake exactly the same.
          </p>
        </div>
      </section>

      <StoresGrid stores={stores} />

      <OpeningSoon data={openingSoon} />

      <Footer />
    </>
  );
}
