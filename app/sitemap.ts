import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getAllListingSlugs,
  getListingBySlug,
  getSuburbs,
  getGuidesWithPages,
} from "@/lib/data";

/**
 * Date the site's content was last substantively revised.
 *
 * Deliberately a constant rather than `new Date()`. Stamping build time onto
 * every URL told Google all 32 pages changed on every deploy, which is a false
 * freshness signal — and once Google decides a sitemap's lastmod is unreliable
 * it discounts it entirely. Bump this when content actually changes; pages that
 * carry their own real dates (guides, sold listings) use those instead.
 */
const CONTENT_REVISED = "2026-08-17";

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
    lastModified: CONTENT_REVISED,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const listingRoutes = getAllListingSlugs().map((slug) => {
    const listing = getListingBySlug(slug);
    return {
      url: `${base}/listings/${slug}`,
      // A sold listing genuinely last changed on the day it sold.
      lastModified: listing?.soldDate ?? CONTENT_REVISED,
      changeFrequency: "weekly" as const,
      priority: listing?.status === "sold" ? 0.6 : 0.8,
    };
  });

  const suburbRoutes = getSuburbs().map((s) => ({
    url: `${base}/suburbs/${s.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly" as const,
    priority: s.parent ? 0.5 : 0.6,
  }));

  const guideRoutes = getGuidesWithPages().map((g) => ({
    url: `${base}/resources/${g.slug}`,
    lastModified: g.updated ?? g.published ?? CONTENT_REVISED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...listingRoutes, ...suburbRoutes, ...guideRoutes];
}
