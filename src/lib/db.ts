import { supabase } from "./supabase";
import type { Product, InStoreItem, Store, TeamMember } from "./types";

const STORE_ID = process.env.STORE_ID!;

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, tag, price, description, image_url")
    .eq("store_id", STORE_ID)
    .eq("active", true)
    .order("sort_order");

  if (error) {
    console.error("[db] getProducts:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    tag: row.tag ?? null,
    imageUrl: row.image_url ?? null,
    imagePlaceholder: "#C8A882",
    price: Number(row.price),
    description: row.description ?? "",
  }));
}

export async function getInstoreItems(): Promise<InStoreItem[]> {
  const { data, error } = await supabase
    .from("instore_items")
    .select("name, locations, description, image_url")
    .eq("store_id", STORE_ID)
    .order("sort_order");

  if (error) {
    console.error("[db] getInstoreItems:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    name: row.name,
    locations: row.locations ?? "",
    description: row.description ?? "",
    imagePlaceholder: row.image_url ?? "#D4C4A8",
  }));
}

export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from("stores")
    .select("id, name, address, google_maps_url, image_url")
    .eq("store_id", STORE_ID)
    .order("sort_order");

  if (error) {
    console.error("[db] getStores:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address ?? "",
    googleMapsUrl: row.google_maps_url ?? "",
    imagePlaceholder: row.image_url ?? "#C8B89C",
  }));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("name, role, image_url")
    .eq("store_id", STORE_ID)
    .order("sort_order");

  if (error) {
    console.error("[db] getTeamMembers:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    name: row.name,
    role: row.role ?? "",
    imagePlaceholder: row.image_url ?? "#D4C4A8",
  }));
}
