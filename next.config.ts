import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
  },

  // rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.DOMAIN_NAME}/:path*`,
      },
    ];
  },
};

export default nextConfig;
