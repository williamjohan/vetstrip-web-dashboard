import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan akses dari IP lokal (HP/Perangkat lain di WiFi yang sama)
  allowedDevOrigins: ["192.168.100.13", "localhost"],
};

export default nextConfig;