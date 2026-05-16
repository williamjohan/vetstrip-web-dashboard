// ============================================================
// VETSTRIP — Root & Dashboard Layout (Responsive)
// File: app/layout.tsx
// ============================================================
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Wajib untuk memanggil Tailwind

import { SidebarProvider } from "@/components/layout/SidebarContext";
import { Sidebar }         from "@/components/layout/Sidebar";
import { Header }          from "@/components/layout/Header";

// Setup Font bawaan Next.js
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | VETSTRIP",
    default: "VETSTRIP — IoT Mastitis Detection",
  },
  description: "Sistem pemantauan kesehatan sapi perah berbasis IoT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TAG HTML DAN BODY WAJIB ADA DI ROOT LAYOUT
    <html lang="id" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full bg-slate-50 antialiased`}
      >
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Content Shell */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50">
              {/* Header */}
              <Header />

              {/* Main Content */}
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}