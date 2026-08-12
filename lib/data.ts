import { listings } from "@/lib/content/listings";
import { testimonials } from "@/lib/content/testimonials";
import { guides } from "@/lib/content/guides";
import { suburbs } from "@/lib/content/suburbs";
import type { Listing, Suburb, Testimonial, Guide } from "@/lib/content/types";

/*
 * Central content access. Content currently comes from typed fixtures in
 * lib/content/*. Keeping every read behind these functions means a CMS (or API)
 * can be swapped in later by changing only this file.
 */

export function getListings(): Listing[] {
  return listings.filter((l) => l.status !== "sold");
}

export function getFeaturedListings(limit = 3): Listing[] {
  const active = getListings();
  const featured = active.filter((l) => l.featured);
  return (featured.length ? featured : active).slice(0, limit);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getListingSlugs(): string[] {
  return listings.filter((l) => l.status !== "sold").map((l) => l.slug);
}

/** Every listing slug, sold included — used for prerendering and the sitemap. */
export function getAllListingSlugs(): string[] {
  return listings.map((l) => l.slug);
}

export function getSoldListings(): Listing[] {
  return listings
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

export function getListingsBySuburb(slug: string): Listing[] {
  return getListings().filter((l) => l.suburb === slug);
}

export function getSoldBySuburb(slug: string): Listing[] {
  return getSoldListings().filter((l) => l.suburb === slug);
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
