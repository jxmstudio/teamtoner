import { test } from "node:test";
import assert from "node:assert/strict";
import { ANALYTICS_EVENTS, analyticsEnabled, contactEventFor, leadEventFor, trackEvent } from "./analytics.ts";

test("the site sends exactly the five documented events", () => {
  assert.deepEqual(
    [...ANALYTICS_EVENTS].sort(),
    ["appraisal_form_submit", "contact_form_submit", "email_click", "phone_click", "youtube_subscribe_click"]
  );
});

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

test("appraisal requests and other enquiries are separate conversions", () => {
  assert.equal(leadEventFor("appraisal"), "appraisal_form_submit");
  assert.equal(leadEventFor("contact"), "contact_form_submit");
  assert.equal(leadEventFor("enquiry"), "contact_form_submit");
});

test("trackEvent is a no-op outside the browser", () => {
  assert.doesNotThrow(() => trackEvent("appraisal_form_submit", { form_kind: "appraisal" }));
});

/** Run `fn` with a fake browser window whose gtag records its calls. */
function withFakeWindow(fn: (calls: unknown[][]) => void) {
  const calls: unknown[][] = [];
  const g = globalThis as { window?: unknown };
  g.window = { gtag: (...args: unknown[]) => calls.push(args), location: { pathname: "/appraisal/milson" } };
  try {
    fn(calls);
  } finally {
    delete g.window;
  }
}

test("nothing fires when the measurement id is unset (local dev)", () => {
  assert.equal(analyticsEnabled, false, "tests run without NEXT_PUBLIC_GA_MEASUREMENT_ID");
  withFakeWindow((calls) => {
    trackEvent("phone_click", { link_url: "tel:0272558735" });
    assert.equal(calls.length, 0);
  });
});

test("events carry page_path and drop empty params when analytics is on", () => {
  withFakeWindow((calls) => {
    trackEvent("contact_form_submit", { form_kind: "enquiry", listing: undefined }, true);
    assert.deepEqual(calls, [["event", "contact_form_submit", { page_path: "/appraisal/milson", form_kind: "enquiry" }]]);
  });
});
