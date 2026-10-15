import { test } from "node:test";
import assert from "node:assert/strict";
import { formatArea, listingDocuments } from "./listing-details.ts";
import { STANDARD_LISTING_DOCUMENTS } from "./property-documents.ts";

test("shows areas under a hectare in square metres", () => {
  assert.equal(formatArea(809), "809 m²");
  assert.equal(formatArea(1200), "1,200 m²");
});

test("shows a hectare and above in hectares", () => {
  assert.equal(formatArea(10000), "1 ha");
  assert.equal(formatArea(42500), "4.25 ha");
  assert.equal(formatArea(123456), "12.35 ha");
});

test("appends the REA guides to an unsold listing's documents", () => {
  const own = [{ title: "Title", url: "https://cdn.example/title.pdf" }];
  assert.deepEqual(listingDocuments({ status: "for-sale", documents: own }), [
    ...own,
    ...STANDARD_LISTING_DOCUMENTS,
  ]);
  assert.deepEqual(listingDocuments({ status: "under-offer" }), [...STANDARD_LISTING_DOCUMENTS]);
});

test("does not repeat a guide the listing already links to", () => {
  const own = [{ title: "REA guide", url: STANDARD_LISTING_DOCUMENTS[0].url }];
  assert.equal(listingDocuments({ status: "for-sale", documents: own }).length, 2);
});

test("sold listings get no documents", () => {
  assert.deepEqual(listingDocuments({ status: "sold", documents: [] }), []);
});
