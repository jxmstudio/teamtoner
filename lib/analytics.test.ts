import { test } from "node:test";
import assert from "node:assert/strict";
import { contactEventFor, trackEvent } from "./analytics.ts";

test("contact links map to their GA4 events", () => {
  assert.equal(contactEventFor("tel:+64272558735"), "phone_click");
  assert.equal(contactEventFor("TEL:0272558735"), "phone_click");
  assert.equal(contactEventFor("mailto:thetoners@arizto.co.nz"), "email_click");
  assert.equal(contactEventFor("https://www.youtube.com/@TeamTonerArizto", "youtube_subscribe_click"), "youtube_subscribe_click");
});

test("ordinary links are not tracked", () => {
  assert.equal(contactEventFor("/appraisal"), null);
  assert.equal(contactEventFor("https://example.com"), null);
  assert.equal(contactEventFor("/listings", "something-else"), null);
});

test("trackEvent is a no-op outside the browser", () => {
  assert.doesNotThrow(() => trackEvent("generate_lead", { form_kind: "appraisal" }));
});
