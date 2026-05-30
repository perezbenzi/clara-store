"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

const DELIVERY = 8;
const PROMO_CODE = "CLARA10";
const PROMO_DISCOUNT = 0.1;

export default function OrderSummary() {
  const { totalPrice } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const discount = promoApplied ? totalPrice * PROMO_DISCOUNT : 0;
  const delivery = totalPrice > 0 ? DELIVERY : 0;
  const total = totalPrice + delivery - discount;

  function handleApply() {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  }

  return (
    <div className="bg-white px-5 py-5 md:px-9 md:py-12">
      <h2 className="font-display uppercase text-ink text-2xl mb-6">
        Order Summary
      </h2>

      {/* Promo code */}
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-wider text-muted mb-2">
          Promo code
        </p>
        <div className="flex border border-ink">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value);
              setPromoError(false);
            }}
            placeholder="Enter code"
            className="flex-1 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted outline-none"
          />
          <button
            onClick={handleApply}
            className="bg-ink text-white text-[10px] font-semibold tracking-widest uppercase px-4"
          >
            Apply
          </button>
        </div>
        {promoError && (
          <p className="text-[11px] text-brand-pink mt-1">Invalid promo code.</p>
        )}
        {promoApplied && (
          <p className="text-[11px] text-brand-pink mt-1">
            10% discount applied!
          </p>
        )}
      </div>

      {/* Summary rows */}
      <div>
        <div className="flex justify-between py-2.5 border-b border-[#eeeeee] text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-[#eeeeee] text-sm">
          <span className="text-muted">Delivery</span>
          <span className="text-ink font-medium">
            {delivery === 0 ? "—" : `$${delivery.toFixed(2)}`}
          </span>
        </div>
        {promoApplied && (
          <div className="flex justify-between py-2.5 border-b border-[#eeeeee] text-sm">
            <span className="text-muted">Promo ({PROMO_CODE})</span>
            <span className="text-brand-pink font-medium">
              −${discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between py-4">
        <span className="font-display uppercase text-ink text-[18px]">
          Total
        </span>
        <span className="font-display text-ink text-2xl">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button href="/checkout" className="w-full text-center block">
        Proceed to Checkout
      </Button>

      <Link
        href="/flavours"
        className="block text-center text-xs text-muted underline mt-3"
      >
        ← Continue shopping
      </Link>
    </div>
  );
}
