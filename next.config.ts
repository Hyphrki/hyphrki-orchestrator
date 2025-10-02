import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Disable telemetry for smaller builds
  telemetry: false,
};

export default nextConfig;
