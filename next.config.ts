import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance ottimizzazioni
  compress: true,
  poweredByHeader: false,
  
  // Immagini ottimizzate
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Headers per performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
