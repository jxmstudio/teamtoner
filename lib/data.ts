import { cache } from "react";
import { listings as fixtureListings } from "@/lib/content/listings";
import { testimonials } from "@/lib/content/testimonials";
import { guides } from "@/lib/content/guides";
import { suburbs } from "@/lib/content/suburbs";
import type { Guide, Listing, SiteVideo, Suburb, Testimonial } from "@/lib/content/types";
import { sanityClient } from "@/lib/sanity/client";
import { LISTINGS_QUERY, SITE_VIDEOS_QUERY } from "@/lib/sanity/queries";

/*
 * Central content access. Listings and videos come from Sanity once the
 * project is connected (see README "Sanity CMS"); until then — and if the
 * dataset is empty or unreachable — the typed fixtures in lib/content/* keep
 * the site fully functional. Suburbs, guides and testimonials remain
 * fixture-driven for now.
 *
 * Pages that render CMS content export `revalidate` so client edits in
 * /studio appear without a redeploy.
 */

/**
 * One listings read per render pass. Falls back to fixtures when the CMS is
 * not configured, still empty (seed real content before launch — the fixtures
 * are fabricated demo data), or unreachable.
 */
const loadListings = cache(async (): Promise<Listing[]> => {
  if (!sanityClient) return fixtureListings;
  try {
    const docs = await sanityClient.fetch<Listing[]>(LISTINGS_QUERY);
    return docs.length ? docs : fixtureListings;
  } catch (error) {
    console.error("[sanity] listings fetch failed — serving fixtures", error);
    return fixtureListings;
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

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const active = await getListings();
  const featured = active.filter((l) => l.featured);
  return (featured.length ? featured : active).slice(0, limit);
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

export function getSuburbs(): Suburb[] {
  return suburbs;
}

/** The four top-level areas shown as cards on /suburbs. */
export function getAreas(): Suburb[] {
  return suburbs.filter((s) => !s.parent);
}

/** Individual suburbs sitting inside an area (e.g. the Palmerston North suburbs). */
export function getSuburbChildren(parentSlug: string): Suburb[] {
  return suburbs.filter((s) => s.parent === parentSlug);
}

export function getSuburbBySlug(slug: string): Suburb | undefined {
  return suburbs.find((s) => s.slug === slug);
}

export function getSuburbName(slug: string): string {
  return suburbs.find((s) => s.slug === slug)?.name ?? slug;
}

export async function getListingsBySuburb(slug: string): Promise<Listing[]> {
  return (await getListings()).filter((l) => l.suburb === slug);
}

export async function getSoldBySuburb(slug: string): Promise<Listing[]> {
  return (await getSoldListings()).filter((l) => l.suburb === slug);
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getFeaturedTestimonials(limit = 3): Testimonial[] {
  const featured = testimonials.filter((t) => t.featured);
  return (featured.length ? featured : testimonials).slice(0, limit);
}

export function getGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Guides that publish an indexable content page at /resources/<slug>. */
export function getGuidesWithPages(): Guide[] {
  return guides.filter((g) => g.body?.length);
}
