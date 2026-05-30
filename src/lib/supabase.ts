import { createClient } from "@supabase/supabase-js";

// Server-only client — never imported from "use client" components.
// Uses non-public env vars since all Supabase access in this app is server-side.
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);
