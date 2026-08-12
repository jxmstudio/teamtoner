import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getAllListingSlugs,
  getSuburbs,
  getGuidesWithPages,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

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
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const listingRoutes = getAllListingSlugs().map((slug) => ({
    url: `${base}/listings/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const suburbRoutes = getSuburbs().map((s) => ({
    url: `${base}/suburbs/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: s.parent ? 0.5 : 0.6,
  }));

  const guideRoutes = getGuidesWithPages().map((g) => ({
    url: `${base}/resources/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...listingRoutes, ...suburbRoutes, ...guideRoutes];
}
