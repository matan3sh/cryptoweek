import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Styled components configuration for SSR
  compiler: {
    styledComponents: true,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },

  // Enable experimental features
  experimental: {
    // Enable optimized package imports for better performance
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors (set to false in production)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors (set to false in production)
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
