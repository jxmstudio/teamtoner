import { test } from "node:test";
import assert from "node:assert/strict";
import { mainNav, siteConfig } from "./site.ts";

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
