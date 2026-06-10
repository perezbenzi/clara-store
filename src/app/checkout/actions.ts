"use server";

import { supabase } from "@/lib/supabase";
import { sendNewOrderNotification } from "@/lib/email";

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
  console.log("[placeOrder] raw payload:", JSON.stringify(payload, null, 2));

  // Log each RPC param with its runtime type so type mismatches are visible
  const rpcParams = {
    p_store_id:        payload.storeId,
    p_customer_name:   payload.customerName,
    p_customer_email:  payload.customerEmail,
    p_customer_phone:  payload.customerPhone,
    p_collection_date: payload.collectionDate,
    p_notes:           payload.notes,
    p_total:           payload.total,
    p_items:           payload.items,
  };
  console.log("[placeOrder] rpc params types:", {
    p_store_id:        typeof rpcParams.p_store_id,
    p_customer_name:   typeof rpcParams.p_customer_name,
    p_customer_email:  typeof rpcParams.p_customer_email,
    p_customer_phone:  typeof rpcParams.p_customer_phone,
    p_collection_date: typeof rpcParams.p_collection_date,
    p_notes:           typeof rpcParams.p_notes,
    p_total:           typeof rpcParams.p_total,
    p_items:           `Array(${Array.isArray(rpcParams.p_items) ? rpcParams.p_items.length : "NOT_ARRAY"})`,
  });
  console.log("[placeOrder] calling supabase.rpc('place_order') ...");

  const { data, error } = await supabase.rpc("place_order", rpcParams);

  if (error) {
    console.error("[placeOrder] rpc error message :", error.message);
    console.error("[placeOrder] rpc error code    :", error.code);
    console.error("[placeOrder] rpc error details :", error.details);
    console.error("[placeOrder] rpc error hint    :", error.hint);
    console.error("[placeOrder] rpc error status  :", (error as { status?: number }).status);
    console.error("[placeOrder] full error object :", JSON.stringify(error, null, 2));
    return { error: "Something went wrong placing your order. Please try again." };
  }

  const result = data?.[0];
  const orderId = result?.order_id;
  const notificationEmail = result?.notification_email;

  console.log("[placeOrder] success, order id:", orderId);

  if (notificationEmail && orderId) {
    try {
      await sendNewOrderNotification(notificationEmail, payload, orderId);
    } catch (emailError) {
      console.error("[placeOrder] failed to send merchant notification:", emailError);
    }
  }

  return { error: null };
}
