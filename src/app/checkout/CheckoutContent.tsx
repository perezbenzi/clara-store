"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { stores } from "@/lib/data";
import DateSelect, { type SelectedDate } from "@/components/ui/DateSelect";
import Footer from "@/components/layout/Footer";
import { placeOrder } from "./actions";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const inputClasses =
  "bg-[#ebe9e2] border border-[#d5d2ca] text-[#111] text-sm font-body outline-none rounded-none appearance-none w-full box-border px-3 py-2.5 placeholder:text-[#bbb] focus:border-[#111] [border-radius:0]";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedStore, setPlacedStore] = useState(stores[0].id);
  const [placedDate, setPlacedDate] = useState<SelectedDate | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handlePlaceOrder() {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!selectedDate) {
      setError("Please choose a collection date.");
      return;
    }

    setError("");
    setSubmitting(true);

    const mm = String(selectedDate.month + 1).padStart(2, "0");
    const dd = String(selectedDate.day).padStart(2, "0");

    const result = await placeOrder({
      storeId: selectedStore,
      customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
      customerEmail: form.email.trim(),
      customerPhone: form.phone.trim(),
      collectionDate: `${selectedDate.year}-${mm}-${dd}`,
      notes: form.notes.trim() || null,
      items: items.map((item) => ({
        flavour_id: item.id,
        flavour_name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalPrice,
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setPlacedStore(selectedStore);
    setPlacedDate(selectedDate);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    const store = stores.find((s) => s.id === placedStore) ?? stores[0];
    const dateStr = placedDate
      ? `${placedDate.day} ${MONTH_NAMES[placedDate.month]}`
      : "";

    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center px-8 py-20 bg-cream">
          <div className="text-center max-w-md">
            <CheckCircle size={56} className="text-brand-pink mx-auto mb-6" />
            <h1 className="font-display text-[40px] uppercase text-ink leading-none mb-4">
              Order placed!
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-8">
              We&apos;ll see you at {store.name} on {dateStr}. Your cake is
              being made fresh.
            </p>
            <Link
              href="/"
              className="inline-block uppercase tracking-[0.15em] underline px-7 py-3 text-sm font-medium bg-ink text-white hover:bg-[#333333] transition-colors duration-200"
            >
              Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-16">
          {/* Page header */}
          <p className="text-[10px] uppercase tracking-[3px] text-muted mb-3">
            Order
          </p>
          <h1 className="font-display text-[48px] md:text-[64px] leading-none uppercase text-ink mb-10 md:mb-12">
            Checkout
          </h1>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10 md:gap-14 items-start">
            {/* Left: form */}
            <div>
              {/* Your Details */}
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666] mb-4">
                  Your Details
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#666]">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Clara"
                      className={inputClasses}
                      style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#666]">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Nguyen"
                      className={inputClasses}
                      style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#666]">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className={inputClasses}
                    style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#666]">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0400 000 000"
                    className={inputClasses}
                    style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
                  />
                </div>
              </div>

              {/* Choose Your Store */}
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666] mb-4">
                  Choose Your Store
                </p>
                <div className="flex flex-col gap-1.5">
                  {stores.map((store) => {
                    const active = selectedStore === store.id;
                    return (
                      <div
                        key={store.id}
                        onClick={() => setSelectedStore(store.id)}
                        className={`border px-4 py-3.5 cursor-pointer ${
                          active
                            ? "bg-[#111] border-[#111]"
                            : "bg-[#ebe9e2] border-[#d5d2ca]"
                        }`}
                      >
                        <p
                          className={`font-display text-[15px] uppercase leading-none mb-0.5 ${
                            active ? "text-white" : "text-ink"
                          }`}
                        >
                          {store.name}
                        </p>
                        <p
                          className={`text-[11px] ${
                            active ? "text-white/50" : "text-muted"
                          }`}
                        >
                          {store.address}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Collection Date */}
              <div className="mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666] mb-4">
                  Collection Date
                </p>
                <DateSelect value={selectedDate} onChange={setSelectedDate} />
                <p className="text-[11px] text-muted mt-2">
                  Orders need{" "}
                  <span className="text-brand-pink">48hrs notice</span>.
                </p>
              </div>

              {/* Notes */}
              <div className="mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#666] mb-4">
                  Notes (optional)
                </p>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or allergen notes..."
                  className="bg-[#ebe9e2] border border-[#d5d2ca] text-[#111] text-sm font-body outline-none rounded-none appearance-none w-full box-border px-3 py-2.5 placeholder:text-[#bbb] focus:border-[#111] h-20 resize-none"
                  style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
                />
              </div>
            </div>

            {/* Right: order summary */}
            <div className="bg-[#f5f3ef] px-8 py-12 md:sticky md:top-0">
              <p className="font-display text-[22px] uppercase text-ink mb-5">
                Your Order
              </p>

              {items.length === 0 ? (
                <p className="text-sm text-muted mb-6">No items in cart.</p>
              ) : (
                <div className="mb-2">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variant}`}
                      className="grid grid-cols-[44px_1fr_auto] gap-3 items-center py-3 border-b border-[#e0ddd6]"
                    >
                      <div className="w-11 h-11 overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full" style={{ backgroundColor: item.imagePlaceholder }} />
                        )}
                      </div>
                      <div>
                        <p className="font-display text-[13px] uppercase text-ink leading-none mb-0.5">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-muted">{item.variant}</p>
                      </div>
                      <p className="font-display text-[15px] text-ink">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between text-xs py-2 border-b border-[#e0ddd6]">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink font-medium">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-[#e0ddd6]">
                <span className="text-muted">Collection</span>
                <span className="text-ink font-medium">Free</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-display text-[15px] uppercase text-ink">
                  Total
                </span>
                <span className="font-display text-[22px] text-ink">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {error && (
                <p className="text-[11px] text-red-500 mb-3">{error}</p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full text-[10px] font-bold tracking-[2px] uppercase underline py-3.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#111111", color: "#ffffff" }}
              >
                {submitting ? "Placing order…" : "Place Order"}
              </button>

              <p className="text-[10px] text-muted text-center mt-3 leading-relaxed">
                By placing your order you agree to our terms and conditions.
                Payment is taken in store at collection.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
