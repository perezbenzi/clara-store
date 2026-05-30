import { supabase } from "./supabase";
import type { Flavour } from "./types";

const STORE_ID = process.env.STORE_ID!;

export async function getFlavours(): Promise<Flavour[]> {
  const { data, error } = await supabase
    .from("flavours")
    .select("id, name, tag, price, description, image_url")
    .eq("store_id", STORE_ID)
    .eq("active", true)
    .order("sort_order");

  if (error) {
    console.error("[db] getFlavours:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    tag: row.tag ?? null,
    imagePlaceholder: row.image_url ?? "#C8A882",
    price: Number(row.price),
    description: row.description ?? "",
  }));
}
