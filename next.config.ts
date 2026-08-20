import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin(); // auto-detects i18n/request.ts
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = '/fateme-ahmadi';

const nextConfig: NextConfig = {
  turbopack: {}, // good for dev with --turbo
  experimental: {
    optimizeCss: true, // Enables automatic critical CSS extraction using critters
  },
  ...(isGithubPages
    ? {
        output: 'export' as const,
        basePath: githubPagesBasePath,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? githubPagesBasePath : '',
  },
  ...(!isGithubPages
    ? {
        async headers() {
          if (process.env.NODE_ENV !== 'production') {
            return [];
          }
          return [
            {
              source: '/fonts/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable',
                },
              ],
            },
          ];
        },
      }
    : {}),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'cdn.dribbble.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));


