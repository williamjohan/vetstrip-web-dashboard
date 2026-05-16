"use client";

// ============================================================
// VETSTRIP — SidebarContext
// Memegang state buka/tutup sidebar untuk mobile drawer.
// Dipisah ke file ini agar layout.tsx tetap Server Component.
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

// ── Types ────────────────────────────────────────────────────

interface SidebarContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// ── Context ──────────────────────────────────────────────────

const SidebarContext = createContext<SidebarContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Tutup drawer otomatis saat navigasi berpindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Tutup drawer saat resize ke desktop (≥ 768px)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const open   = useCallback(() => setIsOpen(true),  []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar harus digunakan di dalam <SidebarProvider>");
  }
  return ctx;
}
