/**
 * SEO content pass on the four area pages (17 Sep 2026 plan, month 1):
 * richer market commentary and area-specific FAQs for Palmerston North,
 * Feilding, Ashhurst and Manawatū, plus the eight new /appraisal/<area> and
 * /sell/<area> documents.
 *
 * Safe by construction:
 *   - commentary is only replaced when the live document still holds the
 *     original one-line launch text verbatim (checked here), so anything the
 *     client has rewritten in the studio is left alone;
 *   - FAQs are set only where the document has none (setIfMissing);
 *   - service pages use createIfNotExists.
 *
 * Run from the repo root (uses your `npx sanity login` session):
 *   npx sanity exec scripts/patch-area-content.ts --with-user-token
 * Preview:
 *   DRY_RUN=1 npx sanity exec scripts/patch-area-content.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { suburbs } from "../lib/content/suburbs";
import { localServicePages } from "../lib/content/local-services";
import { LOCAL_SERVICE_AREAS, localServiceDocId } from "../lib/local-services";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

/** The launch-day commentary, so we can tell "untouched" from "edited". */
const ORIGINAL_COMMENTARY: Record<string, string[]> = {
  "palmerston-north": [
    "Palmerston North draws buyers from across the lower North Island — students and staff at Massey and UCOL, Defence and health-sector families, and Wellington movers trading commute time for section size.",
    "That breadth of demand is why presentation and reach matter here. A well-marketed home in the right pocket regularly attracts buyers who were not originally looking in that street.",
  ],
  feilding: [
    "Feilding blends established character housing around the square with newer subdivisions on the town's edges, and it consistently appeals to families and downsizers wanting a genuine town centre on their doorstep.",
  ],
  ashhurst: [
    "Ashhurst suits buyers who want village life and a bigger section without giving up an easy run into Palmerston North. Sections here are typically generous, and outdoor access is a genuine selling point.",
  ],
  manawatu: [
    "Rural and lifestyle sales turn on details a city-only agent can miss: water supply, effluent and consents, shedding, soil type and realistic commute times. We price and market these properties on the evidence.",
  ],
};

const keyed = (faqs: { q: string; a: string }[]) =>
  faqs.map((f, i) => ({ _key: `faqs-${i}`, _type: "faqItem", ...f }));

type Row = { _id: string; slug: string; commentary: string[] | null; faqs: unknown[] | null };

async function main() {
  const rows = await client.fetch<Row[]>(
    `*[_type == "suburb" && slug.current in $slugs]{ _id, "slug": slug.current, commentary, faqs }`,
    { slugs: [...LOCAL_SERVICE_AREAS] }
  );

  let tx = client.transaction();
  let changes = 0;

  for (const row of rows) {
    const fixture = suburbs.find((s) => s.slug === row.slug);
    if (!fixture) continue;
    const untouched =
      JSON.stringify(row.commentary ?? []) === JSON.stringify(ORIGINAL_COMMENTARY[row.slug] ?? []);
    const set: Record<string, unknown> = {};
    const setIfMissing: Record<string, unknown> = {};
    if (untouched && fixture.commentary) set.commentary = fixture.commentary;
    else if (!untouched) console.log(`${row._id}: commentary edited in studio — left as is`);
    if (!row.faqs?.length && fixture.faqs) setIfMissing.faqs = keyed(fixture.faqs);
    if (!Object.keys(set).length && !Object.keys(setIfMissing).length) continue;
    console.log(`${row._id}: set ${Object.keys(set).join(",") || "-"}; setIfMissing ${Object.keys(setIfMissing).join(",") || "-"}`);
    tx = tx.patch(row._id, { set, setIfMissing });
    changes++;
  }

  for (const page of localServicePages) {
    const id = localServiceDocId(page.service, page.area);
    console.log(`${id}: createIfNotExists`);
    tx = tx.createIfNotExists({
      _id: id,
      _type: "localServicePage",
      service: page.service,
      area: page.area,
      headline: page.headline,
      intro: page.intro,
      ...(page.description ? { description: page.description } : {}),
      whyTitle: page.whyTitle,
      commentary: page.commentary,
      pointsTitle: page.pointsTitle,
      points: page.points,
      faqs: keyed(page.faqs),
    });
    changes++;
  }

  if (dryRun) {
    console.log(`\nDry run — ${changes} mutation(s) not written.`);
    return;
  }
  const result = await tx.commit();
  const { projectId, dataset } = client.config();
  console.log(`\nCommitted ${changes} mutation(s) in ${projectId}/${dataset} (transaction ${result.transactionId}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
