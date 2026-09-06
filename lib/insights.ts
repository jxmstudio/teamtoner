import type { Article, ArticleCategorySlug } from "./content/types";

export interface ArticleCategory {
  slug: ArticleCategorySlug;
  label: string;
}

/**
 * The Property Insights categories, in menu order (client brief, 6 Sep 2026).
 * Fixed in code rather than CMS-editable so the category URLs — which Google
 * indexes — stay stable. Adding one means adding it here and to the
 * `category` list in sanity/schemaTypes/article.ts.
 */
export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  { slug: "market-updates", label: "Market Updates" },
  { slug: "selling-advice", label: "Selling Advice" },
  { slug: "buying-advice", label: "Buying Advice" },
  { slug: "palmerston-north-manawatu", label: "Palmerston North & Manawatū" },
];

export function categoryBySlug(slug: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug);
}

/** Newest first — the only order a news-style section should ever use. */
export function byNewest(articles: readonly Article[]): Article[] {
  return [...articles].sort((a, b) => b.published.localeCompare(a.published));
}

export function inCategory(articles: readonly Article[], slug: string): Article[] {
  return articles.filter((a) => a.category === slug);
}
