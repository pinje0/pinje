import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats-pinje0.vercel.app",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
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
