import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.4.15'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
