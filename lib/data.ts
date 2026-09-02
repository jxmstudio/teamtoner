import { cache } from "react";
import { listings as fixtureListings } from "@/lib/content/listings";
import { testimonials as fixtureTestimonials } from "@/lib/content/testimonials";
import { guides as fixtureGuides } from "@/lib/content/guides";
import { suburbs as fixtureSuburbs } from "@/lib/content/suburbs";
import type { Guide, Listing, SiteVideo, Suburb, Testimonial } from "@/lib/content/types";
import {
  aboutCopy,
  appraisalCopy,
  contactCopy,
  homeCopy,
  listingsCopy,
  privacyCopy,
  resourcesCopy,
  sellCopy,
  soldCopy,
  suburbsCopy,
  termsCopy,
} from "@/lib/content/page-copy";
import { siteConfig, type SiteConfig } from "@/lib/site";
import { sanityClient } from "@/lib/sanity/client";
import {
  FEATURED_LISTINGS_QUERY,
  GUIDES_QUERY,
  LISTINGS_QUERY,
  SITE_SETTINGS_QUERY,
  SITE_VIDEOS_QUERY,
  SUBURBS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/lib/sanity/queries";

/*
 * Central content access. Everything client-editable comes from Sanity once
 * the project is connected (see README "Sanity CMS"); until then — and if the
 * dataset is empty or unreachable — the typed fixtures in lib/content/* and
 * the defaults in lib/site.ts keep the site fully functional.
 *
 * Pages that render CMS content export `revalidate` so client edits in
 * /studio appear without a redeploy.
 */

/** One CMS read per document type per render pass, fixtures as the fallback. */
function cmsCollection<T>(query: string, fixtures: T[], label: string) {
  return cache(async (): Promise<T[]> => {
    if (!sanityClient) return fixtures;
    try {
      const docs = await sanityClient.fetch<T[]>(query);
      return docs.length ? docs : fixtures;
    } catch (error) {
      console.error(`[sanity] ${label} fetch failed — serving fixtures`, error);
      return fixtures;
    }
  });
}

const loadListings = cmsCollection<Listing>(LISTINGS_QUERY, fixtureListings, "listings");
const loadTestimonials = cmsCollection<Testimonial>(
  TESTIMONIALS_QUERY,
  fixtureTestimonials,
  "testimonials"
);
const loadGuides = cmsCollection<Guide>(GUIDES_QUERY, fixtureGuides, "guides");
const loadSuburbs = cmsCollection<Suburb>(SUBURBS_QUERY, fixtureSuburbs, "suburbs");

/**
 * Recursively lay the CMS settings document over the typed defaults in
 * lib/site.ts. Fields left empty in the studio come back null (or empty
 * strings/arrays) and fall through to the shipped default, so a half-filled
 * settings document can never blank out part of the site.
 */
function withOverrides<T>(base: T, overrides: unknown): T {
  if (overrides === null || overrides === undefined) return base;
  if (Array.isArray(overrides)) {
    return overrides.length ? (overrides as T) : base;
  }
  if (typeof overrides === "object") {
    if (typeof base !== "object" || base === null || Array.isArray(base)) {
      return overrides as T;
    }
    const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(overrides)) {
      merged[key] = withOverrides((base as Record<string, unknown>)[key], value);
    }
    return merged as T;
  }
  if (typeof overrides === "string" && overrides.trim() === "") return base;
  return overrides as T;
}

/** Recursively drop Sanity metadata (_id, _type, _key, …) before merging. */
function stripMeta(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripMeta);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !key.startsWith("_"))
        .map(([key, v]) => [key, stripMeta(v)])
    );
  }
  return value;
}

/**
 * Page copy: each page's "Page copy" studio document (fixed _id === type
 * name) merged over its typed defaults in lib/content/page-copy.ts.
 */
function pageCopy<T>(id: string, defaults: T) {
  return cache(async (): Promise<T> => {
    if (!sanityClient) return defaults;
    try {
      const doc = await sanityClient.fetch<unknown>(`*[_id == $id][0]`, { id });
      return withOverrides(defaults, stripMeta(doc));
    } catch (error) {
      console.error(`[sanity] ${id} fetch failed — serving defaults`, error);
      return defaults;
    }
  });
}

export const getHomeCopy = pageCopy("pageHome", homeCopy);
export const getAboutCopy = pageCopy("pageAbout", aboutCopy);
export const getSellCopy = pageCopy("pageSell", sellCopy);
export const getAppraisalCopy = pageCopy("pageAppraisal", appraisalCopy);
export const getContactCopy = pageCopy("pageContact", contactCopy);
export const getListingsCopy = pageCopy("pageListings", listingsCopy);
export const getSoldCopy = pageCopy("pageSold", soldCopy);
export const getSuburbsCopy = pageCopy("pageSuburbs", suburbsCopy);
export const getResourcesCopy = pageCopy("pageResources", resourcesCopy);
export const getPrivacyCopy = pageCopy("pagePrivacy", privacyCopy);
export const getTermsCopy = pageCopy("pageTerms", termsCopy);

/**
 * Site-wide settings: the `siteConfig` defaults with the studio's
 * "Site settings" document merged over the top. Use this (not `siteConfig`
 * directly) anywhere a client-editable value is rendered.
 */
export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  if (!sanityClient) return siteConfig;
  try {
    const settings = await sanityClient.fetch<unknown>(SITE_SETTINGS_QUERY);
    return withOverrides(siteConfig, settings);
  } catch (error) {
    console.error("[sanity] settings fetch failed — serving defaults", error);
    return siteConfig;
  }
});

/** Featured site videos for the home page. Empty until the CMS has some. */
export const getSiteVideos = cache(async (): Promise<SiteVideo[]> => {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<SiteVideo[]>(SITE_VIDEOS_QUERY);
  } catch (error) {
    console.error("[sanity] videos fetch failed", error);
    return [];
  }
});

/**
 * Full display address. Listing addresses usually already carry their suburb
 * ("19 Manchester Street, Feilding"), so appending it unconditionally produced
 * "…, Feilding, Feilding" in titles and schema. Only append when it's absent.
 */
export function formatListingAddress(address: string, suburbName: string): string {
  return address.toLowerCase().includes(suburbName.toLowerCase())
    ? address
    : `${address}, ${suburbName}`;
}

export async function getListings(): Promise<Listing[]> {
  return (await loadListings()).filter((l) => l.status !== "sold");
}

type FeaturedPicks = { hero: string | null; others: string[] } | null;

/** The studio's "Featured properties" picks (listing slugs), null if unset. */
const loadFeaturedPicks = cache(async (): Promise<FeaturedPicks> => {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<FeaturedPicks>(FEATURED_LISTINGS_QUERY);
  } catch (error) {
    console.error("[sanity] featured picks fetch failed", error);
    return null;
  }
});

/**
 * Home-page featured grid: the studio's hand-picked hero first, then its
 * other picks in order. Picks that are missing or now Sold are skipped and
 * the grid is topped up from the current listings in display order, so it
 * never shows a sold home or an empty cell. With no picks at all (fixtures,
 * or the document untouched) the fixture `featured` flags decide, and
 * failing that the first listings in display order.
 */
export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const active = await getListings();
  const picks = await loadFeaturedPicks();
  const bySlug = new Map(active.map((l) => [l.slug, l]));

  const chosen: Listing[] = [];
  for (const slug of [picks?.hero, ...(picks?.others ?? [])]) {
    const listing = slug ? bySlug.get(slug) : undefined;
    if (listing && !chosen.includes(listing)) chosen.push(listing);
  }

  const fallback = chosen.length ? active : active.filter((l) => l.featured);
  for (const listing of fallback.length ? fallback : active) {
    if (chosen.length >= limit) break;
    if (!chosen.includes(listing)) chosen.push(listing);
  }
  return chosen.slice(0, limit);
}

export async function getListingBySlug(slug: string): Promise<Listing | undefined> {
  return (await loadListings()).find((l) => l.slug === slug);
}

export async function getListingSlugs(): Promise<string[]> {
  return (await getListings()).map((l) => l.slug);
}

/** Every listing slug, sold included — used for prerendering and the sitemap. */
export async function getAllListingSlugs(): Promise<string[]> {
  return (await loadListings()).map((l) => l.slug);
}

export async function getSoldListings(): Promise<Listing[]> {
  return (await loadListings())
    .filter((l) => l.status === "sold")
    .sort((a, b) => (b.soldDate ?? "").localeCompare(a.soldDate ?? ""));
}

export async function getSuburbs(): Promise<Suburb[]> {
  return loadSuburbs();
}

/** The four top-level areas shown as cards on /suburbs. */
export async function getAreas(): Promise<Suburb[]> {
  return (await loadSuburbs()).filter((s) => !s.parent);
}

/** Individual suburbs sitting inside an area (e.g. the Palmerston North suburbs). */
export async function getSuburbChildren(parentSlug: string): Promise<Suburb[]> {
  return (await loadSuburbs()).filter((s) => s.parent === parentSlug);
}

export async function getSuburbBySlug(slug: string): Promise<Suburb | undefined> {
  return (await loadSuburbs()).find((s) => s.slug === slug);
}

export async function getSuburbName(slug: string): Promise<string> {
  return (await loadSuburbs()).find((s) => s.slug === slug)?.name ?? slug;
}

/**
 * Slugs that count as "in" a location: the location itself plus any suburbs
 * sitting under it.
 *
 * Listings are tagged to the specific suburb they're in (Takaro, Highbury,
 * Sanson…), which is what makes each suburb page carry real local evidence.
 * Without this an area page like /suburbs/palmerston-north would show only the
 * handful of listings still tagged at area level. Individual suburbs have no
 * children, so this collapses to an exact match for them.
 */
async function locationSlugs(slug: string): Promise<string[]> {
  const children = await getSuburbChildren(slug);
  return [slug, ...children.map((c) => c.slug)];
}

export async function getListingsBySuburb(slug: string): Promise<Listing[]> {
  const slugs = await locationSlugs(slug);
  return (await getListings()).filter((l) => slugs.includes(l.suburb));
}

export async function getSoldBySuburb(slug: string): Promise<Listing[]> {
  const slugs = await locationSlugs(slug);
  return (await getSoldListings()).filter((l) => slugs.includes(l.suburb));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return loadTestimonials();
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const all = await loadTestimonials();
  const featured = all.filter((t) => t.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getGuides(): Promise<Guide[]> {
  return loadGuides();
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  return (await loadGuides()).find((g) => g.slug === slug);
}

/** Guides that publish an indexable content page at /resources/<slug>. */
export async function getGuidesWithPages(): Promise<Guide[]> {
  return (await loadGuides()).filter((g) => g.body?.length);
}
