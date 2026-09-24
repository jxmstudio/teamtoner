import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getAllListingSlugs,
  getListingBySlug,
  getSuburbs,
  getGuidesWithPages,
  getArticles,
} from "@/lib/data";
import { ARTICLE_CATEGORIES } from "@/lib/insights";
import { LOCAL_SERVICES, LOCAL_SERVICE_AREAS, localServicePath } from "@/lib/local-services";

/**
 * Date the site's content was last substantively revised.
 *
 * Deliberately a constant rather than `new Date()`. Stamping build time onto
 * every URL told Google all 32 pages changed on every deploy, which is a false
 * freshness signal — and once Google decides a sitemap's lastmod is unreliable
 * it discounts it entirely. Bump this when content actually changes; pages that
 * carry their own real dates (guides, sold listings) use those instead.
 */
const CONTENT_REVISED = "2026-09-17";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const listingRoutes = await Promise.all(
    (await getAllListingSlugs()).map(async (slug) => {
      const listing = await getListingBySlug(slug);
      return {
        url: `${base}/listings/${slug}`,
        // A sold listing genuinely last changed on the day it sold.
        lastModified: listing?.soldDate ?? CONTENT_REVISED,
        changeFrequency: "weekly" as const,
        priority: listing?.status === "sold" ? 0.6 : 0.8,
      };
    })
  );

  // /appraisal/<area> and /sell/<area> — the seller-intent pages the SEO
  // programme is built around, so they sit just under the home page.
  const localServiceRoutes = LOCAL_SERVICES.flatMap((service) =>
    LOCAL_SERVICE_AREAS.map((area) => ({
      url: `${base}${localServicePath(service, area)}`,
      lastModified: CONTENT_REVISED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const suburbRoutes = (await getSuburbs()).map((s) => ({
    url: `${base}/suburbs/${s.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly" as const,
    priority: s.parent ? 0.5 : 0.6,
  }));

  const guideRoutes = (await getGuidesWithPages()).map((g) => ({
    url: `${base}/resources/${g.slug}`,
    lastModified: g.updated ?? g.published ?? CONTENT_REVISED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Insights only enters the sitemap once there's an article; each category
  // page lists as fresh as its newest article.
  const articles = await getArticles();
  const insightsRoutes = articles.length
    ? [
        {
          url: `${base}/insights`,
          lastModified: articles[0].updated ?? articles[0].published,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
        ...ARTICLE_CATEGORIES.flatMap((c) => {
          const newest = articles.find((a) => a.category === c.slug);
          return newest
            ? [
                {
                  url: `${base}/insights/category/${c.slug}`,
                  lastModified: newest.updated ?? newest.published,
                  changeFrequency: "weekly" as const,
                  priority: 0.5,
                },
              ]
            : [];
        }),
        ...articles.map((a) => ({
          url: `${base}/insights/${a.slug}`,
          lastModified: a.updated ?? a.published,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ]
    : [];

  return [
    ...staticRoutes,
    ...localServiceRoutes,
    ...listingRoutes,
    ...suburbRoutes,
    ...guideRoutes,
    ...insightsRoutes,
  ];
}
