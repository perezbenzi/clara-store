"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
      <div ref={ref} className="space-y-6 mt-12">
        {/* Full rows */}
        {fullRowItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fullRowItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <ProductCard item={item} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Last partial row — centered */}
        {lastRowItems.length > 0 && (
          <div className="flex justify-center gap-6">
            {lastRowItems.map((item, i) => (
              <motion.div
                key={item.id}
                className="w-full md:w-[calc(33.333%-0.75rem)]"
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{
                  duration: 0.5,
                  delay: (fullRowItems.length + i) * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProductCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
