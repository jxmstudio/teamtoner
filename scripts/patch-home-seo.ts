import { getCliClient } from "sanity/cli";
import { homeCopy } from "../lib/content/page-copy";

/**
 * Month 2 SEO, Task 1 (Oct 2026) — the home page's Google title and
 * description, now editable in the studio (Home page → Google title /
 * Google description). setIfMissing, so a value the client has already typed
 * is left alone; the strings come from the code defaults so the two cannot
 * drift.
 *
 *   npx sanity exec scripts/patch-home-seo.ts --with-user-token
 */

const client = getCliClient({ apiVersion: "2026-08-01" });

client
  .patch("pageHome")
  .setIfMissing({
    seoTitle: homeCopy.seoTitle,
    seoDescription: homeCopy.seoDescription,
  })
  .commit()
  .then((doc) => console.log(`Patched ${doc._id} (rev ${doc._rev})`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
