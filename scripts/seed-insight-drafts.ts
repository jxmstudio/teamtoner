/**
 * Month 2 SEO, Task 5 (Oct 2026): seeds the Property Insights articles
 * awaiting client approval as unpublished studio drafts.
 *
 *   1. "What is my house worth? How a free property appraisal works in
 *      Palmerston North & Manawatū" (Selling Advice)
 *   2. "Selling a house in Ashhurst: what buyers are paying and how to
 *      prepare" (Selling Advice)
 *
 * The copy comes from docs/seo/drafts/*.md (see scripts/insight-drafts.ts).
 * Each is written to a `drafts.` id with createIfNotExists, so nothing goes
 * live and re-running never overwrites edits made in the studio. The
 * Published date is left empty on purpose: the studio won't publish until
 * Allan & Karen choose one.
 *
 *   npx sanity exec scripts/seed-insight-drafts.ts --with-user-token
 * Preview:
 *   DRY_RUN=1 npx sanity exec scripts/seed-insight-drafts.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { loadInsightDrafts } from "./insight-drafts.ts";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

async function main() {
  let tx = client.transaction();
  const drafts = loadInsightDrafts();
  for (const draft of drafts) {
    const id = `drafts.insight-${draft.slug}`;
    const published = await client.fetch<string | null>(`*[_type == "article" && slug.current == $slug][0]._id`, {
      slug: draft.slug,
    });
    if (published && !published.startsWith("drafts.")) {
      console.log(`${draft.slug}: already published as ${published} — skipped`);
      continue;
    }
    console.log(`${id}: createIfNotExists (${draft.body.length} sections)`);
    tx = tx.createIfNotExists({
      _id: id,
      _type: "article",
      title: draft.title,
      slug: { _type: "slug", current: draft.slug },
      category: draft.category,
      excerpt: draft.excerpt,
      body: draft.body.map((section, i) => ({
        _key: `section-${i}`,
        _type: "articleSection",
        heading: section.heading,
        paragraphs: section.paragraphs,
        ...(section.bullets.length ? { bullets: section.bullets } : {}),
      })),
    });
  }

  if (dryRun) {
    console.log("\nDry run — nothing written.");
    return;
  }
  const result = await tx.commit();
  const { projectId, dataset } = client.config();
  console.log(`\nCommitted in ${projectId}/${dataset} (transaction ${result.transactionId}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
