"use client";

// ============================================================
// VETSTRIP — HamburgerButton
// Client Component terpisah yang kecil — hanya bertugas
// memanggil useSidebar().toggle() saat ditekan.
// Dipisah agar Header.tsx tetap bisa menjadi Server Component.
// ============================================================

import { Menu } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export function HamburgerButton() {
  const { toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Buka menu navigasi"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 md:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
