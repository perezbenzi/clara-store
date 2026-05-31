"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";
import OrderSummary from "@/components/sections/OrderSummary";
import Button from "@/components/ui/Button";

function QuantitySelector({
  quantity,
  onDecrement,
  onIncrement,
}: {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex border border-ink w-fit">
      <button
        onClick={onDecrement}
        className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-ink text-sm leading-none"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-sm border-l border-r border-ink text-ink">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-ink text-sm leading-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="py-5 border-b border-[#dddddd]">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-[80px_1fr_auto] gap-5 items-start">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: item.imagePlaceholder }} />
          )}
        </div>
        <div>
          <p className="font-display uppercase text-ink text-base leading-tight mb-1">
            {item.name}
          </p>
          <p className="text-xs text-muted mb-3">{item.variant}</p>
          <QuantitySelector
            quantity={item.quantity}
            onDecrement={() =>
              updateQuantity(item.id, item.variant, item.quantity - 1)
            }
            onIncrement={() =>
              updateQuantity(item.id, item.variant, item.quantity + 1)
            }
          />
        </div>
        <div className="text-right flex flex-col items-end gap-3">
          <p className="font-display text-ink text-base">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeItem(item.id, item.variant)}
            className="text-xs text-muted underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden grid grid-cols-[64px_1fr] gap-4 items-start">
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: item.imagePlaceholder }} />
          )}
        </div>
        <div>
          <div className="flex justify-between items-start mb-1">
            <p className="font-display uppercase text-ink text-sm leading-tight">
              {item.name}
            </p>
            <p className="font-display text-ink text-sm ml-2 flex-shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-muted mb-3">{item.variant}</p>
          <div className="flex items-center gap-4">
            <QuantitySelector
              quantity={item.quantity}
              onDecrement={() =>
                updateQuantity(item.id, item.variant, item.quantity - 1)
              }
              onIncrement={() =>
                updateQuantity(item.id, item.variant, item.quantity + 1)
              }
            />
            <button
              onClick={() => removeItem(item.id, item.variant)}
              className="text-xs text-muted underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-20 px-8 text-center">
      <ShoppingBag className="w-14 h-14 text-[#dddddd]" />
      <h1 className="font-display uppercase text-ink text-3xl md:text-4xl mt-4 mb-2">
        Your cart is empty
      </h1>
      <p className="text-sm text-muted mb-8">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Button href="/flavours">Shop Flavours</Button>
    </div>
  );
}

export default function CartContent() {
  const { items, totalItems } = useCart();

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        {/* Left: items list */}
        <div className="flex-1 w-full">
          <h1 className="font-display uppercase text-ink text-3xl md:text-[40px] leading-none mb-1">
            Your Cart
          </h1>
          <p className="text-sm text-muted mb-8">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>

          <div>
            {items.map((item) => (
              <CartRow key={`${item.id}-${item.variant}`} item={item} />
            ))}
          </div>
        </div>

        {/* Right: order summary */}
        <div className="w-full md:w-[380px] md:sticky md:top-20 flex-shrink-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
