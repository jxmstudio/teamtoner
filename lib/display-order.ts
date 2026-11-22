type DisplayOrderFields = { sortOrder?: number | null };

const isPosition = (n: number | null | undefined): n is number =>
  typeof n === "number" && Number.isInteger(n) && n >= 1;

/**
 * Lays a list out by its "Display order" numbers, treating each number as a
 * position on the page: 2 means "show second".
 *
 * `listings` arrives in the fallback order for the page (newest first on
 * Listings, most recently sold first on Sold). Then:
 *
 * - a numbered listing takes exactly that spot;
 * - when several share a number, the first in fallback order (the newest)
 *   gets the spot and the others take the next free spots after it, without
 *   ever pushing a different number off its own spot;
 * - unnumbered listings fill whatever spots are left, in fallback order;
 * - numbers past the end of the list close up rather than leaving gaps.
 *
 * The number used to be a plain sort key, so every listing numbered 1 sorted
 * ahead of a listing numbered 2. With eight current listings on 1, a new one
 * set to 2 showed ninth (client report, 23 Nov 2026).
 */
export function placeByDisplayOrder<T extends DisplayOrderFields>(listings: T[]): T[] {
  const numbered = listings
    .filter((l) => isPosition(l.sortOrder))
    // Array.prototype.sort is stable, so equal numbers keep fallback order.
    .sort((a, b) => (a.sortOrder as number) - (b.sortOrder as number));
  const unnumbered = listings.filter((l) => !isPosition(l.sortOrder));

  // The first listing on each number owns that spot; the rest queue behind it.
  const owners = new Map<number, T>();
  const overflow: T[] = [];
  for (const listing of numbered) {
    const spot = listing.sortOrder as number;
    if (owners.has(spot)) overflow.push(listing);
    else owners.set(spot, listing);
  }
  const ownedSpots = [...owners.keys()];

  const placed: T[] = [];
  let spot = 1;
  let nextOverflow = 0;
  let nextUnnumbered = 0;
  while (placed.length < listings.length) {
    const owner = owners.get(spot);
    const queued = overflow[nextOverflow];
    if (owner) {
      placed.push(owner);
    } else if (queued && (queued.sortOrder as number) <= spot) {
      placed.push(queued);
      nextOverflow += 1;
    } else if (nextUnnumbered < unnumbered.length) {
      placed.push(unnumbered[nextUnnumbered]);
      nextUnnumbered += 1;
    } else {
      // Nothing can sit here: jump to the next spot something is waiting for.
      const waiting = ownedSpots.filter((s) => s > spot);
      if (queued) waiting.push(queued.sortOrder as number);
      spot = Math.min(...waiting);
      continue;
    }
    spot += 1;
  }
  return placed;
}
