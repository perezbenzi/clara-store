"use server";

import { supabase } from "@/lib/supabase";

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
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
  console.log("[placeOrder] payload:", JSON.stringify(payload, null, 2));

  const { data: orderId, error } = await supabase.rpc("place_order", {
    p_store_id:        payload.storeId,
    p_customer_name:   payload.customerName,
    p_customer_email:  payload.customerEmail,
    p_customer_phone:  payload.customerPhone,
    p_collection_date: payload.collectionDate,
    p_notes:           payload.notes,
    p_total:           payload.total,
    p_items:           payload.items,
  });

  if (error) {
    console.error("[placeOrder] rpc failed:", JSON.stringify(error, null, 2));
    return { error: "Something went wrong placing your order. Please try again." };
  }

  console.log("[placeOrder] success, order id:", orderId);
  return { error: null };
}
