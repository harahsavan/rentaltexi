import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    authInterrupts: true,
  },
} as NextConfig;

export default nextConfig;
