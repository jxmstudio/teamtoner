import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Listing photos come from the Sanity CDN once the CMS is connected.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
