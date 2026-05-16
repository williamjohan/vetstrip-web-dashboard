// ============================================================
// VETSTRIP — Supabase Browser Client
// Gunakan ini di: Client Components ("use client") saja
// ============================================================
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
