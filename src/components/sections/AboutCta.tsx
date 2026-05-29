"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

export default function AboutCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-ink py-20 px-8 text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-display uppercase text-white text-4xl md:text-[56px] leading-none mb-8">
          Ready to taste
          <br />
          the difference?
        </h2>
        <Button href="/flavours" variant="outline-white">
          Order Now
        </Button>
      </motion.div>
    </section>
  );
}
