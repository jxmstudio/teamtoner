import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getListingSlugs, getSuburbs, getSoldListings } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/sell",
    "/listings",
    "/sold",
    "/suburbs",
    "/resources",
    "/contact",
    "/appraisal",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const listingRoutes = [
    ...getListingSlugs(),
    ...getSoldListings().map((l) => l.slug),
  ].map((slug) => ({
    url: `${base}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const suburbRoutes = getSuburbs().map((s) => ({
    url: `${base}/suburbs/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...listingRoutes, ...suburbRoutes];
}
