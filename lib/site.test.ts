import { test } from "node:test";
import assert from "node:assert/strict";
import { mainNav, resolveSiteUrl, siteConfig } from "./site.ts";

test("SEO URLs default to the canonical production origin", () => {
  for (const value of [undefined, "", "   "]) {
    assert.equal(resolveSiteUrl(value), "https://www.teamtoner.co.nz");
  }
});

test("legacy production settings cannot put redirect URLs back in the sitemap", () => {
  for (const value of [
    "https://teamtoner.co.nz",
    "http://teamtoner.co.nz/",
    "http://www.teamtoner.co.nz/",
    " https://www.teamtoner.co.nz/ ",
    "https://teamtoner.co.nz/appraisal?source=test#top",
  ]) {
    assert.equal(resolveSiteUrl(value), "https://www.teamtoner.co.nz");
  }
});

test("preview and local origins stay configurable without malformed sitemap paths", () => {
  assert.equal(resolveSiteUrl("http://localhost:3100/"), "http://localhost:3100");
  assert.equal(resolveSiteUrl("https://preview.vercel.app/"), "https://preview.vercel.app");
  assert.equal(resolveSiteUrl("https://preview.vercel.app/path?q=1#top"), "https://preview.vercel.app");
  assert.throws(() => resolveSiteUrl("not-a-url"));
  assert.throws(() => resolveSiteUrl("ftp://example.com"));
});

test("menu hides Insights until the site has an article to show", () => {
  assert.ok(!mainNav(siteConfig).some((i) => i.href === "/insights"));
  assert.ok(!mainNav(siteConfig, { insights: false }).some((i) => i.href === "/insights"));
});

test("menu lists Insights after Resources once articles exist", () => {
  const hrefs = mainNav(siteConfig, { insights: true }).map((i) => i.href);
  assert.equal(hrefs.indexOf("/insights"), hrefs.indexOf("/resources") + 1);
});

test("Insights menu label comes from the editable nav labels", () => {
  const config = { ...siteConfig, navLabels: { ...siteConfig.navLabels, insights: "Property Insights" } };
  assert.equal(mainNav(config, { insights: true }).find((i) => i.href === "/insights")?.title, "Property Insights");
});
