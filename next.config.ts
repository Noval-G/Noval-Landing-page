import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Only add the basePath/assetPrefix in production (GitHub Pages)
  basePath: isProd ? '/Noval-Landing-page' : '',
  assetPrefix: isProd ? '/Noval-Landing-page/' : '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
