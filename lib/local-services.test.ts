import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LOCAL_SERVICES,
  LOCAL_SERVICE_AREAS,
  isLocalService,
  isLocalServiceArea,
  localServiceDocId,
  localServicePath,
  localServiceTitles,
  metaDescription,
  DESCRIPTION_MAX,
} from "./local-services.ts";
import { localServicePages } from "./content/local-services.ts";
import { suburbs } from "./content/suburbs.ts";
import { TITLE_MAX, fitTitle } from "./site.ts";

test("every priority area has both service pages, and nothing else does", () => {
  for (const service of LOCAL_SERVICES) {
    for (const area of LOCAL_SERVICE_AREAS) {
      assert.ok(
        localServicePages.some((p) => p.service === service && p.area === area),
        `${service}/${area} fixture missing`
      );
    }
  }
  assert.equal(localServicePages.length, LOCAL_SERVICES.length * LOCAL_SERVICE_AREAS.length);
});

test("service page areas are top-level suburb pages", () => {
  for (const area of LOCAL_SERVICE_AREAS) {
    const suburb = suburbs.find((s) => s.slug === area);
    assert.ok(suburb, `${area} has no suburb page`);
    assert.equal(suburb.parent, undefined, `${area} must be an area, not a suburb`);
  }
});

test("paths and ids are stable and distinct per page", () => {
  assert.equal(localServicePath("appraisal", "ashhurst"), "/appraisal/ashhurst");
  assert.equal(localServicePath("sell", "palmerston-north"), "/sell/palmerston-north");
  const ids = new Set(localServicePages.map((p) => localServiceDocId(p.service, p.area)));
  assert.equal(ids.size, localServicePages.length);
});

test("type guards reject unknown routes so /appraisal/anything cannot render a page", () => {
  assert.ok(isLocalService("appraisal") && isLocalService("sell"));
  assert.ok(!isLocalService("buy"));
  assert.ok(isLocalServiceArea("feilding"));
  assert.ok(!isLocalServiceArea("hokowhitu"));
  assert.ok(!isLocalServiceArea("foxton"));
});

test("SERP titles fit for every area name, richest candidate first", () => {
  for (const service of LOCAL_SERVICES) {
    for (const area of LOCAL_SERVICE_AREAS) {
      const name = suburbs.find((s) => s.slug === area)!.name;
      const title = fitTitle(localServiceTitles(service, name));
      assert.ok(title.length <= TITLE_MAX, `${title} is ${title.length} chars`);
      assert.ok(title.includes(name));
    }
  }
});

test("fixture copy is complete: intro fits a meta description, FAQs and points present", () => {
  for (const page of localServicePages) {
    const label = `${page.service}/${page.area}`;
    assert.ok(page.headline.length > 0, `${label} headline`);
    assert.ok(page.intro.length <= 300, `${label} intro too long for a description`);
    assert.ok(page.commentary.length >= 3, `${label} needs at least three commentary paragraphs`);
    assert.ok(page.points.length >= 4, `${label} points`);
    assert.ok(page.faqs.length >= 4, `${label} FAQs`);
    for (const faq of page.faqs) {
      assert.ok(faq.q.endsWith("?"), `${label}: "${faq.q}" should be a question`);
      assert.ok(faq.a.length > 40, `${label}: answer to "${faq.q}" is too thin`);
    }
  }
});

test("priority area pages ship location-specific FAQs", () => {
  for (const area of LOCAL_SERVICE_AREAS) {
    const suburb = suburbs.find((s) => s.slug === area)!;
    assert.ok((suburb.faqs?.length ?? 0) >= 4, `${area} needs its own FAQs`);
    assert.ok((suburb.commentary?.length ?? 0) >= 4, `${area} needs richer commentary`);
  }
});

test("meta descriptions end on a sentence or a whole word, never mid-phrase", () => {
  const long =
    "Thinking about selling in Ashhurst? Allan & Karen Toner will visit your home, look at recent Ashhurst sales and give you an honest, evidence-based price range — free, and with no obligation.";
  const d = metaDescription(long);
  assert.ok(d.length <= DESCRIPTION_MAX, `${d.length}`);
  assert.ok(d.endsWith("…") && !/[\s,;:—-]…$/.test(d), d);
  assert.equal(metaDescription("Short and sweet."), "Short and sweet.");
  const sentences = "One sentence here that is long enough to matter for the check. ".repeat(4);
  const t = metaDescription(sentences);
  assert.ok(t.endsWith(".") && t.length <= DESCRIPTION_MAX, t);
  const noSentence = "word ".repeat(60).trim();
  const w = metaDescription(noSentence);
  assert.ok(w.length <= DESCRIPTION_MAX && w.endsWith("…"), w);
});

test("every service page ships an explicit Google description within limits", () => {
  for (const page of localServicePages) {
    const label = `${page.service}/${page.area}`;
    assert.ok(page.description, `${label} description`);
    assert.ok(page.description!.length >= 100 && page.description!.length <= DESCRIPTION_MAX, `${label} is ${page.description!.length} chars`);
  }
});
