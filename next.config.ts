import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Admin-Panel (statische Seite public/admin.html)
  async rewrites() {
    return [{ source: "/admin", destination: "/admin.html" }];
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commondatastorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.w3schools.com",
      },
    ],
  },
};

export default nextConfig;
