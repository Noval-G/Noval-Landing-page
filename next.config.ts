import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Noval-Landing-page',
  assetPrefix: '/Noval-Landing-page/',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;