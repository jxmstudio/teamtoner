type SoldOrderFields = { sortOrder?: number; soldDate?: string };

/**
 * Order for the Sold page: listings with a "Display order" number first (1 at
 * the top), then the rest by sold date, newest first. A sale with no sold date
 * yet is treated as the newest, so a freshly sold home never lands at the
 * bottom. Ties keep their incoming order.
 */
export function sortSoldListings<T extends SoldOrderFields>(listings: T[]): T[] {
  return [...listings].sort((a, b) => {
    const byOrder =
      (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER);
    if (byOrder !== 0) return byOrder;
    if (a.soldDate === b.soldDate) return 0;
    if (!a.soldDate) return -1;
    if (!b.soldDate) return 1;
    return b.soldDate.localeCompare(a.soldDate);
  });
}
