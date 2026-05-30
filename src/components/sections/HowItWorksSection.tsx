"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { HowItWorksStep } from "@/lib/types";

interface HowItWorksSectionProps {
  steps: HowItWorksStep[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#111111] px-12 py-[72px]">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] uppercase tracking-[3px] text-brand-pink mb-4">
          How it works
        </p>
        <h2 className="font-display text-[44px] md:text-[52px] leading-none uppercase text-white mb-12">
          Ordering is simple.
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <p className="font-display text-[48px] leading-none text-white/[0.08] tracking-[-2px] mb-3">
                {step.number}
              </p>
              <p className="font-display text-[18px] uppercase text-white leading-none mb-2">
                {step.title}
              </p>
              <div className="h-px bg-white/[0.12] mb-3" />
              <p className="text-xs text-white/50 leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
