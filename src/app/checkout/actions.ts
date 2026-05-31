"use server";

import { supabase } from "@/lib/supabase";

export interface OrderItem {
  flavour_id: number;
  flavour_name: string;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  storeId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  collectionDate: string; // YYYY-MM-DD
  notes: string | null;
  items: OrderItem[];
  total: number;
}

export async function placeOrder(
  payload: OrderPayload
): Promise<{ error: string | null }> {
  const { error } = await supabase.from("orders").insert({
    store_id: payload.storeId,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone,
    collection_date: payload.collectionDate,
    notes: payload.notes,
    items: payload.items,
    total: payload.total,
  });

  if (error) {
    console.error("[placeOrder]", error.message);
    return { error: "Something went wrong placing your order. Please try again." };
  }

  return { error: null };
}
