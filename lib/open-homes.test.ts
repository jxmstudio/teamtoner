import { test } from "node:test";
import assert from "node:assert/strict";
import { formatOpenHome } from "./open-homes.ts";

// Times are stored as UTC by Sanity; the site must show them in NZ time.
test("formats an open home as day, date and NZ start/end times", () => {
  // 2026-09-06 12:00–12:30 NZST (UTC+12)
  assert.equal(
    formatOpenHome({ start: "2026-09-06T00:00:00.000Z", end: "2026-09-06T00:30:00.000Z" }),
    "Sunday 6 Sep 12:00 pm to 12:30 pm"
  );
});

test("uses NZ daylight time once it starts", () => {
  // 2026-10-04 11:00–11:45 NZDT (UTC+13)
  assert.equal(
    formatOpenHome({ start: "2026-10-03T22:00:00.000Z", end: "2026-10-03T22:45:00.000Z" }),
    "Sunday 4 Oct 11:00 am to 11:45 am"
  );
});

test("shows the end date too when an open home spans midnight", () => {
  assert.equal(
    formatOpenHome({ start: "2026-09-06T11:30:00.000Z", end: "2026-09-06T12:15:00.000Z" }),
    "Sunday 6 Sep 11:30 pm to Monday 7 Sep 12:15 am"
  );
});
