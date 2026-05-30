"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [fillComplete, setFillComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (fillComplete) setFadeOut(true);
  }, [fillComplete]);

  useEffect(() => {
    if (!fadeOut) return;
    const t = setTimeout(onComplete, 350);
    return () => clearTimeout(t);
  }, [fadeOut, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#f0eee8] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: fadeOut ? 0.35 : 0, ease: "easeOut" }}
    >
      <div className="relative select-none">
        {/* Base layer: always visible, light pink */}
        <span className="font-display text-[24px] md:text-[32px] uppercase tracking-wide text-[#e8c4cf]">
          Clara&apos;s Bakehouse
        </span>

        {/* Fill layer: brand pink, animates from 0% → 100% width */}
        <motion.span
          className="absolute top-0 left-0 overflow-hidden whitespace-nowrap font-display text-[24px] md:text-[32px] uppercase tracking-wide text-[#C4728A]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.6,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
          onAnimationComplete={() => setFillComplete(true)}
        >
          Clara&apos;s Bakehouse
        </motion.span>
      </div>
    </motion.div>
  );
}
