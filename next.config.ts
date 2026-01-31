import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  redirects: async () => {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
