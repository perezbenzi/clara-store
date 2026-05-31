"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function StoryBlock({
  label,
  heading,
  body,
  imageBg,
  imageLeft,
}: {
  label: string;
  heading: string;
  body: string;
  imageBg: string;
  imageLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const image = (
    <div
      className="w-full aspect-square md:aspect-auto md:h-full min-h-64"
      style={{ backgroundColor: imageBg }}
    />
  );

  const text = (
    <div
      className={`px-8 py-14 md:px-12 ${
        imageLeft ? "bg-ink" : "bg-[#f5f3ef]"
      }`}
    >
      <p
        className={`uppercase tracking-widest text-xs text-brand-pink mb-4`}
      >
        {label}
      </p>
      <h2
        className={`font-display uppercase text-3xl md:text-[40px] leading-tight mb-5 ${
          imageLeft ? "text-white" : "text-ink"
        }`}
      >
        {heading}
      </h2>
      <p
        className={`text-sm leading-relaxed ${
          imageLeft ? "text-white/75" : "text-muted"
        }`}
      >
        {body}
      </p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {imageLeft ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{text}</div>
          <div className="order-1 md:order-2">{image}</div>
        </>
      )}
    </motion.div>
  );
}

export default function StorySection() {
  return (
    <section>
      <StoryBlock
        label="How it started"
        heading="A kitchen, a dream & too much butter"
        body="Clara started baking out of necessity — and obsession. What began as weekend experiments for friends turned into something nobody could stop talking about. By 2019, she had a waitlist. By 2021, she had a shopfront."
        imageBg="#C8A882"
        imageLeft={true}
      />
      <StoryBlock
        label="Where we are now"
        heading="Three stores. One standard. No shortcuts."
        body="Today we run three stores across Northern NSW — Byron Bay, Bangalow, and Brunswick Heads. Every cake is still made from scratch, every day. We haven't changed the recipe, and we don't plan to."
        imageBg="#B8C4A0"
        imageLeft={false}
      />
    </section>
  );
}
