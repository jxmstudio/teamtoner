import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ARTICLE_CATEGORIES,
  categoryBySlug,
  byNewest,
  inCategory,
} from "./insights.ts";
import type { Article } from "./content/types";

const article = (over: Partial<Article>): Article => ({
  slug: "a",
  title: "A",
  excerpt: "",
  category: "market-updates",
  published: "2026-01-01",
  cover: "",
  body: [],
  ...over,
});

test("ships the four categories the client asked for, in their order", () => {
  assert.deepEqual(
    ARTICLE_CATEGORIES.map((c) => c.label),
    ["Market Updates", "Selling Advice", "Buying Advice", "Palmerston North & Manawatū"]
  );
});

test("category slugs are URL-safe ASCII", () => {
  for (const c of ARTICLE_CATEGORIES) assert.match(c.slug, /^[a-z0-9-]+$/);
});

test("looks a category up by its slug", () => {
  assert.equal(categoryBySlug("selling-advice")?.label, "Selling Advice");
});

test("unknown category slug is undefined", () => {
  assert.equal(categoryBySlug("recipes"), undefined);
});

test("orders articles newest first, without mutating the input", () => {
  const old = article({ slug: "old", published: "2025-03-01" });
  const mid = article({ slug: "mid", published: "2026-02-10" });
  const fresh = article({ slug: "fresh", published: "2026-09-01" });
  const input = [old, fresh, mid];
  assert.deepEqual(byNewest(input).map((a) => a.slug), ["fresh", "mid", "old"]);
  assert.deepEqual(input.map((a) => a.slug), ["old", "fresh", "mid"]);
});

test("filters articles to one category", () => {
  const list = [
    article({ slug: "m", category: "market-updates" }),
    article({ slug: "s", category: "selling-advice" }),
  ];
  assert.deepEqual(inCategory(list, "selling-advice").map((a) => a.slug), ["s"]);
});
