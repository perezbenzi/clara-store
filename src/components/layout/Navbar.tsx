"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream border-b border-[#dddddd]">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Desktop: logo left */}
          <Link
            href="/"
            className="hidden md:block font-display text-brand-pink text-xl uppercase tracking-wide"
          >
            Clara&apos;s Bakehouse
          </Link>

          {/* Desktop: nav links right */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`font-body font-medium text-sm text-ink transition-colors hover:text-brand-pink ${
                    pathname === link.href ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart"
                className="font-body font-medium text-sm text-ink flex items-center gap-1"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({totalItems})</span>
              </Link>
            </li>
          </ul>

          {/* Mobile: hamburger left */}
          <button
            className="md:hidden flex items-center gap-2 text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
            <span className="text-sm font-medium">({totalItems})</span>
          </button>

          {/* Mobile: logo right */}
          <Link
            href="/"
            className="md:hidden font-display text-brand-pink text-lg uppercase tracking-wide"
          >
            Clara&apos;s Bakehouse
          </Link>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-brand-pink flex flex-col px-6 pt-6 pb-12"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
                <span className="text-sm font-medium">({totalItems})</span>
              </button>
              <Link
                href="/"
                className="font-display text-white text-lg uppercase tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Clara&apos;s Bakehouse
              </Link>
            </div>

            {/* Links — vertically centered in remaining space */}
            <div className="flex-1 flex flex-col justify-center">
              <ul className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white font-body font-semibold text-[32px] leading-none"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
