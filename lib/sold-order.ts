import { placeByDisplayOrder } from "./display-order.ts";

type SoldOrderFields = { sortOrder?: number; soldDate?: string };

/**
 * Order for the Sold page: most recently sold first, with any "Display order"
 * numbers then honoured as positions (1 is the top spot — see
 * placeByDisplayOrder). A sale with no sold date yet is treated as the newest,
 * so a freshly sold home never lands at the bottom. Ties keep their incoming
 * order.
 */
export function sortSoldListings<T extends SoldOrderFields>(listings: T[]): T[] {
  const newestSaleFirst = [...listings].sort((a, b) => {
    if (a.soldDate === b.soldDate) return 0;
    if (!a.soldDate) return -1;
    if (!b.soldDate) return 1;
    return b.soldDate.localeCompare(a.soldDate);
  });
  return placeByDisplayOrder(newestSaleFirst);
}
