import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},

  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = "eval-cheap-module-source-map";
      config.ignoreWarnings = [/Failed to parse source map/, /sourceMapURL could not be parsed/];
    }

    return config;
  },

  // @ts-expect-error: Ignore the type checking for these custom properties
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
