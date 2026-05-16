// ============================================================
// VETSTRIP — Header Component (Full Responsive)
// Design Token: UGM Heritage
// Server Component: membaca user session dari Supabase SSR.
// Tombol Hamburger di-render via sub-komponen Client karena
// butuh useSidebar() — Server Component tidak bisa pakai hook.
// ============================================================

import { Bell, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { HamburgerButton } from "./HamburgerButton";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userInitials = getUserInitials(
    user?.user_metadata?.full_name ?? user?.email ?? "Admin"
  );
  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Admin";
  const userRole = user?.user_metadata?.role ?? "Administrator";

  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">

      {/* ── Hamburger — hanya tampil di mobile ─────────────
          Dipisah ke Client Component agar bisa useSidebar().
      ──────────────────────────────────────────────────── */}
      <HamburgerButton />

      {/* ── Divider setelah hamburger (mobile only) ──────── */}
      <div className="h-5 w-px bg-slate-200 md:hidden" />

      {/* ── Brand di mobile (sidebar tersembunyi) ─────────── */}
      <span className="text-sm font-bold tracking-tight text-slate-800 md:hidden">
        VETSTRIP
      </span>

      {/* ── Spacer: dorong elemen kanan ke ujung ─────────── */}
      <div className="flex-1" />

      {/* ── Right Section ────────────────────────────────── */}
      <div className="flex items-center gap-2">

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Bell className="h-4 w-4" />
          {/* Dot alert — merah untuk sinyal bahaya, bukan gold */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="mx-0.5 h-6 w-px bg-slate-200" />

        {/* User Profile */}
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100"
        >
          {/* Avatar — Navy bg + Gold teks = signature UGM */}
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-yellow-400 ring-2 ring-yellow-500/30">
            {userInitials}
          </div>

          {/* Name + Role — disembunyikan di layar sangat kecil */}
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold leading-tight text-slate-800">
              {displayName}
            </p>
            <p className="text-[10px] leading-tight text-slate-500">{userRole}</p>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}

// ── Utility ──────────────────────────────────────────────────

function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
