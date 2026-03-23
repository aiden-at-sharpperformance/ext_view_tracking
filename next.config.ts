import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src https://app.hex.tech; style-src 'self' 'unsafe-inline' https://static.hex.site; img-src 'self' https://static.hex.site",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
