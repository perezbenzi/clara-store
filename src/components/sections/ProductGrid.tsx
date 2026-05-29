"use client";

import { motion } from "framer-motion";
import type { Flavour } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProductGridProps {
  items: Flavour[];
  ctaLabel?: string;
  ctaHref?: string;
  title?: string | null;
  subtitle?: string;
}

function ProductCard({ item }: { item: Flavour }) {
  return (
    <div>
      <div className="relative w-full aspect-square overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: item.imagePlaceholder }}
        />
        {item.tag && <Badge label={item.tag} />}
      </div>
      <p className="font-display uppercase text-ink mt-3 text-base md:text-lg">
        {item.name}
      </p>
    </div>
  );
}

export default function ProductGrid({
  items,
  ctaLabel = "See all flavours",
  ctaHref = "/flavours",
  title = "Monthly Specials",
  subtitle = "Our rotating selection of handcrafted cakes — made with seasonal ingredients and a whole lot of love.",
}: ProductGridProps) {
  const cols = 3;
  const fullRowCount = Math.floor(items.length / cols) * cols;
  const fullRowItems = items.slice(0, fullRowCount);
  const lastRowItems = items.slice(fullRowCount);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        {title !== null && (
          <h2 className="font-display uppercase text-4xl md:text-5xl text-ink mb-4">
            {title}
          </h2>
        )}
        <p className="text-muted text-base max-w-[520px] mx-auto mb-6">
          {subtitle}
        </p>
        <Button href={ctaHref}>{ctaLabel}</Button>
      </div>

      {/* Grid */}
      <div className="space-y-6 mt-12">
        {/* Full rows */}
        {fullRowItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fullRowItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Last partial row — centered */}
        {lastRowItems.length > 0 && (
          <div className="flex justify-center gap-6">
            {lastRowItems.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-[calc(33.333%-0.75rem)]"
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
