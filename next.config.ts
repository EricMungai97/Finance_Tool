// next.config.js or next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Add other Next.js config options here if needed
};

export default nextConfig;