"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { AboutValue } from "@/lib/types";

interface ValueCardProps {
  value: AboutValue;
  index: number;
  inView: boolean;
}

function ValueCard({ value, index, inView }: ValueCardProps) {
  return (
    <motion.div
      className="bg-white p-9"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <p className="font-display text-brand-pink text-5xl leading-none mb-3">
        {value.number}
      </p>
      <p className="font-display uppercase text-ink text-[18px] mb-2">
        {value.title}
      </p>
      <p className="text-sm text-muted leading-relaxed">{value.body}</p>
    </motion.div>
  );
}

interface ValuesSectionProps {
  values: AboutValue[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-cream py-[72px] px-8">
      <h2 className="font-display uppercase text-ink text-4xl md:text-5xl text-center mb-12">
        What we stand for
      </h2>
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto"
      >
        {values.map((value, i) => (
          <ValueCard key={value.number} value={value} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
