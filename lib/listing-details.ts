import type { Listing, ListingDocument } from "./content/types.ts";
import { STANDARD_LISTING_DOCUMENTS } from "./property-documents.ts";

const HECTARE = 10_000;

/** "809 m²" below a hectare, "4.25 ha" from a hectare up. */
export function formatArea(m2: number): string {
  if (m2 >= HECTARE) {
    return `${(m2 / HECTARE).toLocaleString("en-NZ", { maximumFractionDigits: 2 })} ha`;
  }
  return `${m2.toLocaleString("en-NZ")} m²`;
}

/**
 * The listing's own documents followed by the standard REA guides. Sold
 * listings show none — their documents are cleared on sale.
 */
export function listingDocuments(
  listing: Pick<Listing, "status" | "documents">,
): ListingDocument[] {
  if (listing.status === "sold") return [];
  const own = listing.documents ?? [];
  const linked = new Set(own.map((d) => d.url));
  return [...own, ...STANDARD_LISTING_DOCUMENTS.filter((d) => !linked.has(d.url))];
}
