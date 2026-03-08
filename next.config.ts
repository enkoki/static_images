import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/static_images', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;