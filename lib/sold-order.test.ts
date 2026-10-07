import { test } from "node:test";
import assert from "node:assert/strict";
import { sortSoldListings } from "./sold-order.ts";

const addresses = (list: { address: string }[]) => list.map((l) => l.address);

test("numbered sales come first, in Display order", () => {
  const sorted = sortSoldListings([
    { address: "A", soldDate: "2026-09-01" },
    { address: "B", sortOrder: 2, soldDate: "2025-01-01" },
    { address: "C", sortOrder: 1, soldDate: "2024-01-01" },
  ]);
  assert.deepEqual(addresses(sorted), ["C", "B", "A"]);
});

test("unnumbered sales follow, most recently sold first", () => {
  const sorted = sortSoldListings([
    { address: "Old", soldDate: "2025-06-19" },
    { address: "New", soldDate: "2026-02-22" },
  ]);
  assert.deepEqual(addresses(sorted), ["New", "Old"]);
});

// A listing just marked Sold often has no sold date yet; it must not sink to
// the bottom of the page (client report, 3 Oct 2026).
test("a sale with no sold date yet counts as the newest", () => {
  const sorted = sortSoldListings([
    { address: "Dated", soldDate: "2026-09-21" },
    { address: "Just sold" },
  ]);
  assert.deepEqual(addresses(sorted), ["Just sold", "Dated"]);
});

test("ties keep their incoming order", () => {
  const sorted = sortSoldListings([
    { address: "First", sortOrder: 2 },
    { address: "Second", sortOrder: 2 },
  ]);
  assert.deepEqual(addresses(sorted), ["First", "Second"]);
});
