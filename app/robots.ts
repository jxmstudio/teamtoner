import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { gateEnabled } from "@/lib/site-password";

export default function robots(): MetadataRoute.Robots {
  // While the pre-launch password gate is up every URL 307s to /password —
  // keep crawlers out entirely so nothing is indexed against the gate.
  if (gateEnabled()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/password" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
