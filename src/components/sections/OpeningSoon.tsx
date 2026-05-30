"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { OpeningSoonData } from "@/lib/types";
import Button from "@/components/ui/Button";

interface OpeningSoonProps {
  data: OpeningSoonData;
}

export default function OpeningSoon({ data }: OpeningSoonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#111111] px-12 py-[72px] relative overflow-hidden">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left content */}
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[3px] text-brand-pink mb-4">
            Coming soon
          </p>
          <h2 className="font-display leading-none uppercase text-white text-[44px] md:text-[52px] mb-3">
            {data.suburb} is next.
          </h2>
          <p className="font-display text-[16px] uppercase text-brand-pink tracking-[3px] mb-6">
            {data.tag}
          </p>
          <div className="h-px bg-white/[0.08] w-48 mb-6" />
          <Button variant="outline-white" href="#">
            Notify me
          </Button>
        </div>

        {/* Right: decorative year — desktop only */}
        <div className="hidden md:flex flex-col items-end select-none">
          <p className="font-display text-[120px] leading-none text-white/[0.06] tracking-[-4px]">
            {data.year}
          </p>
          <p className="font-display text-[16px] uppercase text-brand-pink tracking-[3px] text-right mt-2">
            {data.tag}
          </p>
        </div>
      </motion.div>

      {/* Decorative year — mobile only, behind content */}
      <p className="md:hidden absolute bottom-4 right-4 font-display text-[90px] leading-none text-white/[0.05] tracking-[-3px] select-none z-0">
        {data.year}
      </p>
    </section>
  );
}
