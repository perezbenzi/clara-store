"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { InStoreItem } from "@/lib/types";
import SectionLabel from "@/components/ui/SectionLabel";

interface InStoreSectionProps {
  items: InStoreItem[];
}

function InStoreCard({
  item,
  index,
  inView,
}: {
  item: InStoreItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Image placeholder — 4:3 */}
      <div
        className="w-full aspect-[4/3]"
        style={{ backgroundColor: item.imagePlaceholder }}
      />
      <div className="pt-4">
        <h3 className="font-display uppercase text-ink text-xl md:text-2xl mb-1">
          {item.name}
        </h3>
        <p className="text-muted text-xs uppercase tracking-wider mb-2">
          {item.locations}
        </p>
        <p className="text-ink text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function InStoreSection({ items }: InStoreSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <SectionLabel className="mb-2">Available</SectionLabel>
          <h2 className="font-display uppercase text-ink text-3xl md:text-4xl">
            In &mdash; Store Only
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <InStoreCard key={item.name} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
