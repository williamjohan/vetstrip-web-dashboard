"use client";

// ============================================================
// VETSTRIP — Sidebar Component (Responsive)
// Desktop: fixed di kiri, selalu tampil (md+)
// Mobile:  hidden default, slide-in drawer saat isOpen = true
// Design Token: UGM Heritage (Navy bg + Gold accent)
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Beef,
  ClipboardList,
  Settings,
  Zap,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useSidebar } from "./SidebarContext";

// ============================================================
// DESIGN TOKENS — UGM Heritage (single source of truth)
// ============================================================
const TOKENS = {
  sidebarBg:    "bg-slate-900",
  sidebarBorder:"border-slate-800",
  sidebarHover: "hover:bg-slate-800",

  // Active state — EKSKLUSIF Gold
  activeText:   "text-yellow-400",
  activeIcon:   "text-yellow-400",
  activeBg:     "bg-yellow-500/10",

  // Typography on Navy
  navText:      "text-slate-400",
  navTextHover: "hover:text-white",
  navIcon:      "text-slate-500",
  navIconHover: "group-hover:text-slate-300",
  sectionLabel: "text-slate-600",
  brandName:    "text-white",
  brandSub:     "text-slate-500",
} as const;

// ============================================================

interface NavItem {
  label: string;
  href:  string;
  icon:  React.ElementType;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",      href: "/dashboard",    icon: LayoutDashboard },
  { label: "Manajemen Sapi", href: "/cattle",       icon: Beef            },
  { label: "Riwayat Tes",    href: "/test-records", icon: ClipboardList   },
];

const BOTTOM_NAV: NavItem[] = [
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

// ============================================================

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* ── Mobile Backdrop/Overlay ─────────────────────────
          Hanya ada di mobile (<md). Tap di luar sidebar → tutup.
      ──────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-20 bg-slate-950/60 backdrop-blur-sm",
          "transition-opacity duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Sidebar Panel ───────────────────────────────────
          Desktop (md+): normal flow, selalu tampil.
          Mobile (<md):  fixed overlay, slide dari kiri.
          Tailwind md:!translate-x-0 memastikan desktop tidak
          terpengaruh oleh -translate-x-full di mobile.
      ──────────────────────────────────────────────────── */}
      <aside
        className={cn(
          "flex h-screen w-64 flex-shrink-0 flex-col border-r",
          TOKENS.sidebarBg,
          TOKENS.sidebarBorder,
          // Mobile: fixed overlay + slide transition
          "fixed inset-y-0 left-0 z-30",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: lepas dari fixed, override translate
          "md:relative md:!translate-x-0 md:z-auto"
        )}
      >
        {/* ── Brand / Logo ────────────────────────────────── */}
        <div className={cn("flex h-16 items-center gap-3 border-b px-5", TOKENS.sidebarBorder)}>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 ring-1 ring-yellow-500/25">
            <Zap className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn("text-sm font-bold tracking-tight", TOKENS.brandName)}>
              VETSTRIP
            </p>
            <p className={cn("text-[10px] font-medium uppercase tracking-widest", TOKENS.brandSub)}>
              IoT Mastitis System
            </p>
          </div>

          {/* Tombol Close — hanya di mobile */}
          <button
            type="button"
            onClick={close}
            aria-label="Tutup menu"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Main Navigation ─────────────────────────────── */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          <p className={cn("mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest", TOKENS.sectionLabel)}>
            Menu Utama
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* ── Bottom: Settings + Logout ───────────────────── */}
        <div className={cn("space-y-0.5 border-t px-3 py-3", TOKENS.sidebarBorder)}>
          {BOTTOM_NAV.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
          <button
            type="button"
            className="group mt-1 flex w-full items-center gap-3 rounded-lg border-l-[3px] border-transparent px-3 py-2.5 pl-[10px] text-sm font-medium text-slate-500 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 text-slate-600 transition-colors group-hover:text-red-400" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// ============================================================
// Sub-component: NavLink dengan Gold active indicator bar
// ============================================================

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg py-2.5 pr-3",
        "text-sm font-medium transition-all duration-150",
        "border-l-[3px] pl-[10px]",
        isActive
          ? [TOKENS.activeBg, TOKENS.activeText, "border-yellow-500"]
          : [TOKENS.navText, TOKENS.navTextHover, TOKENS.sidebarHover, "border-transparent"]
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 flex-shrink-0 transition-colors",
          isActive ? TOKENS.activeIcon : cn(TOKENS.navIcon, TOKENS.navIconHover)
        )}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-yellow-500/20 px-1.5 text-[10px] font-bold text-yellow-400 ring-1 ring-yellow-500/30">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </Link>
  );
}
