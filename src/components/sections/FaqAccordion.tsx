"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "@/lib/types";

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-display uppercase text-ink text-[14px] tracking-wide">
          {item.question}
        </span>
        <span className="text-ink text-xl font-light flex-shrink-0 leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-muted text-sm leading-relaxed pb-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FaqGroupProps {
  title: string;
  items: FaqItem[];
}

function FaqGroup({ title, items }: FaqGroupProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-12">
      <div>
        <h2 className="font-display uppercase text-ink text-4xl md:text-5xl leading-tight sticky top-24">
          {title}
        </h2>
      </div>
      <div className="border-t border-ink/10">
        {items.map((item, i) => (
          <AccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}

interface FaqAccordionProps {
  retailFaqs: FaqItem[];
  wholesaleFaqs: FaqItem[];
}

export default function FaqAccordion({
  retailFaqs,
  wholesaleFaqs,
}: FaqAccordionProps) {
  return (
    <section className="px-6 py-8 bg-cream max-w-7xl mx-auto">
      <FaqGroup title="Retail FAQs" items={retailFaqs} />
      <FaqGroup title="Wholesale FAQs" items={wholesaleFaqs} />
    </section>
  );
}
