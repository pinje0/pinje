import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Option 1: Empty turbopack config to silence the warning
  // (Most apps work fine with Turbopack and no custom config)
  turbopack: {},

  // If you still want webpack config for production builds:
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // This only applies when using --webpack flag
      config.devtool = "eval-cheap-module-source-map";

      config.ignoreWarnings = [/Failed to parse source map/, /sourceMapURL could not be parsed/];
    }

    return config;
  },
};

export default nextConfig;
