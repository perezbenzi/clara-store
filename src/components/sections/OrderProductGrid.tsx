"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Flavour } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface OrderProductGridProps {
  flavours: Flavour[];
}

const VARIANT = "Whole Cake · 20cm";

function OrderCard({
  flavour,
  index,
  inView,
}: {
  flavour: Flavour;
  index: number;
  inView: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: flavour.id,
      name: flavour.name,
      tag: flavour.tag,
      imageUrl: flavour.imageUrl,
      imagePlaceholder: flavour.imagePlaceholder,
      variant: VARIANT,
      price: flavour.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white"
    >
      <div className="w-full aspect-square overflow-hidden">
        {flavour.imageUrl ? (
          <img src={flavour.imageUrl} alt={flavour.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: flavour.imagePlaceholder }} />
        )}
      </div>
      <div className="px-3 pt-3 pb-3 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-display text-[16px] md:text-[20px] uppercase text-ink leading-none">
            {flavour.name}
          </p>
          {flavour.tag && (
            <span className="text-[9px] uppercase tracking-widest border border-ink px-1.5 py-0.5 text-ink shrink-0 mt-0.5">
              {flavour.tag}
            </span>
          )}
        </div>
        <p className="text-[11px] md:text-xs text-muted leading-relaxed mb-3 md:mb-4">
          {flavour.description}
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="font-display text-[18px] md:text-[22px] text-ink leading-none">
            ${flavour.price}
          </p>
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: added ? "#c4728a" : "#111111",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderProductGrid({ flavours }: OrderProductGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-cream px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-8"
        >
          {flavours.map((flavour, i) => (
            <OrderCard
              key={flavour.id}
              flavour={flavour}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
