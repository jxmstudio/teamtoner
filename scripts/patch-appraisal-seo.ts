import { getCliClient } from "sanity/cli";
import { appraisalCopy } from "../lib/content/page-copy";

/**
 * Month 2 SEO, Oct 2026 — the appraisal page's new secondary heading and
 * "Free property appraisals across Palmerston North & Manawatū" section
 * (client SEO email, 23 Sep 2026). setIfMissing, so anything the client has
 * already typed in the studio is left alone; the strings come from the code
 * defaults so the two cannot drift.
 *
 *   npx sanity exec scripts/patch-appraisal-seo.ts --with-user-token
 */

const client = getCliClient({ apiVersion: "2024-10-01" });

client
  .patch("pageAppraisal")
  .setIfMissing({
    headerQuestion: appraisalCopy.headerQuestion,
    localTitle: appraisalCopy.localTitle,
    localBody: appraisalCopy.localBody,
  })
  .commit()
  .then((doc) => console.log(`Patched ${doc._id} (rev ${doc._rev})`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
