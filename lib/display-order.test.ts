import { test } from "node:test";
import assert from "node:assert/strict";
import { placeByDisplayOrder } from "./display-order.ts";

const names = (list: { address: string }[]) => list.map((l) => l.address);

// Client report, 23 Nov 2026: a new listing given Display order 2 showed about
// sixth, because eight other current listings were all numbered 1 and every
// one of them sorted ahead of it.
test("a listing numbered 2 shows second even when several share number 1", () => {
  const placed = placeByDisplayOrder([
    { address: "One (newest)", sortOrder: 1 },
    { address: "One (older)", sortOrder: 1 },
    { address: "One (oldest)", sortOrder: 1 },
    { address: "Two", sortOrder: 2 },
  ]);
  assert.deepEqual(names(placed), ["One (newest)", "Two", "One (older)", "One (oldest)"]);
});

test("a number is a position: unnumbered listings fill the spots before it", () => {
  const placed = placeByDisplayOrder([
    { address: "Third", sortOrder: 3 },
    { address: "Newest" },
    { address: "Older" },
    { address: "Oldest" },
  ]);
  assert.deepEqual(names(placed), ["Newest", "Older", "Third", "Oldest"]);
});

test("listings sharing a number: the first incoming gets the spot, the rest follow it", () => {
  const placed = placeByDisplayOrder([
    { address: "A", sortOrder: 2 },
    { address: "B", sortOrder: 2 },
    { address: "Unnumbered" },
  ]);
  assert.deepEqual(names(placed), ["Unnumbered", "A", "B"]);
});

test("a duplicate never pushes a later number off its own spot", () => {
  const placed = placeByDisplayOrder([
    { address: "1a", sortOrder: 1 },
    { address: "1b", sortOrder: 1 },
    { address: "1c", sortOrder: 1 },
    { address: "2", sortOrder: 2 },
    { address: "4", sortOrder: 4 },
  ]);
  assert.deepEqual(names(placed), ["1a", "2", "1b", "4", "1c"]);
});

test("numbers past the end of the list close up instead of leaving gaps", () => {
  const placed = placeByDisplayOrder([
    { address: "Fifty", sortOrder: 50 },
    { address: "Million", sortOrder: 1_000_000 },
    { address: "Plain" },
  ]);
  assert.deepEqual(names(placed), ["Plain", "Fifty", "Million"]);
});

test("unnumbered listings keep their incoming order", () => {
  const input: { address: string; sortOrder?: number }[] = [
    { address: "A" },
    { address: "B" },
    { address: "C" },
  ];
  const placed = placeByDisplayOrder(input);
  assert.deepEqual(names(placed), ["A", "B", "C"]);
});

test("zero, negative, fractional and null numbers count as unnumbered", () => {
  const placed = placeByDisplayOrder([
    { address: "Zero", sortOrder: 0 },
    { address: "Negative", sortOrder: -3 },
    { address: "Null", sortOrder: null as unknown as undefined },
    { address: "First", sortOrder: 1 },
    { address: "Fraction", sortOrder: 1.5 },
  ]);
  assert.deepEqual(names(placed), ["First", "Zero", "Negative", "Null", "Fraction"]);
});

test("does not mutate its input and returns every listing exactly once", () => {
  const input = [
    { address: "A", sortOrder: 3 },
    { address: "B", sortOrder: 3 },
    { address: "C" },
    { address: "D", sortOrder: 1 },
  ];
  const copy = [...input];
  const placed = placeByDisplayOrder(input);
  assert.deepEqual(input, copy);
  assert.equal(placed.length, input.length);
  assert.deepEqual(new Set(placed), new Set(input));
});
