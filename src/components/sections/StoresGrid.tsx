"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Store } from "@/lib/types";

interface StoresGridProps {
  stores: Store[];
}

function StoreCard({
  store,
  index,
  inView,
}: {
  store: Store;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Image area */}
      <div
        className="w-full aspect-[4/3] mb-4 overflow-hidden relative"
        style={{ backgroundColor: store.imagePlaceholder }}
      >
        <div className="absolute inset-0 bg-black/0 hover:bg-black/[0.08] transition-colors" />
      </div>

      {/* Details */}
      <p className="font-display text-[22px] uppercase text-ink mb-1 leading-none">
        {store.name}
      </p>
      <p className="text-xs text-muted uppercase tracking-[0.5px] leading-relaxed mb-2">
        {store.address}
      </p>
      <a
        href={store.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] font-semibold uppercase tracking-widest underline text-ink"
      >
        Get directions →
      </a>
    </motion.div>
  );
}

export default function StoresGrid({ stores }: StoresGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="max-w-7xl mx-auto px-12 pb-18">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stores.map((store, i) => (
          <StoreCard key={store.id} store={store} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
