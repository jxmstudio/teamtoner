/**
 * Month 2 SEO, Task 2 (Oct 2026): the priority Palmerston North suburbs
 * (Kelvin Grove, Milson, Takaro, West End) and a stronger Feilding.
 *
 *   - Suburb documents: richer market commentary, local FAQs and a Google
 *     description for the four suburbs; a longer commentary and extra local
 *     FAQs for Feilding.
 *   - Area service pages: the ten /appraisal/<area> and /sell/<area>
 *     documents for those five locations.
 *   - Home page: the label on the new row of area appraisal links.
 *
 * Everything written here is marked "Draft copy — awaiting Allan & Karen's
 * review" in the studio. Safe by construction:
 *   - commentary is only replaced while the live document still holds the
 *     launch text verbatim (checked here), so anything the client has
 *     rewritten in the studio is left alone;
 *   - FAQs are added only where the document has none — except Feilding,
 *     where Allan's own FAQ stays first and ours are appended unless a
 *     question with the same wording is already there;
 *   - descriptions use setIfMissing; service pages use createIfNotExists.
 *
 * Run from the repo root (uses your `npx sanity login` session):
 *   npx sanity exec scripts/patch-month2-areas.ts --with-user-token
 * Preview:
 *   DRY_RUN=1 npx sanity exec scripts/patch-month2-areas.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { suburbs } from "../lib/content/suburbs";
import { localServicePages } from "../lib/content/local-services";
import { homeCopy } from "../lib/content/page-copy";
import { localServiceDocId } from "../lib/local-services";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

const PRIORITY_SUBURBS = ["kelvin-grove", "milson", "takaro", "west-end"];
const SCOPE = ["feilding", ...PRIORITY_SUBURBS];

/** The commentary live in the studio before this pass, so we can tell "untouched" from "edited". */
const ORIGINAL_COMMENTARY: Record<string, string[]> = {
  feilding: [
    "Feilding blends established character housing around the square with newer subdivisions on the town's edges, and it consistently appeals to families and downsizers wanting a genuine town centre on their doorstep.",
  ],
  "kelvin-grove": [
    "Kelvin Grove offers some of the city's best value for family living, with easy access to schools, shops and the northern arterial routes.",
    "Newer subdivisions sit alongside established streets, so accurate comparable-sales evidence matters — two homes a block apart can sit in quite different price brackets.",
  ],
  milson: [
    "Milson attracts buyers after a straightforward, well-kept home close to the airport, schools and the northern retail centres. Presentation and sensible pricing do the heavy lifting here.",
  ],
  takaro: [
    "Takaro's appeal is position: flat, central and walkable or a short drive to almost everything in Palmerston North, with Takaro Park and the western sports grounds on the doorstep.",
    "The housing is a mix of solid post-war family homes, tidy units and a growing number of renovated properties, which keeps buyer interest broad — first-home buyers, families trading up and investors all shop here.",
  ],
  "west-end": [
    "West End is character-home territory, and buyers pay for the genuine article: original features, sympathetic renovation and a section that suits the home.",
    "Its walkability to the Square, Victoria Esplanade and the hospital keeps demand broad across families, professionals and downsizers.",
  ],
};

const keyed = (faqs: { q: string; a: string }[], prefix: string) =>
  faqs.map((f, i) => ({ _key: `${prefix}-${i}`, _type: "faqItem", ...f }));

const sameQuestion = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

type Row = {
  _id: string;
  slug: string;
  commentary: string[] | null;
  faqs: { q: string }[] | null;
};

async function main() {
  const rows = await client.fetch<Row[]>(
    `*[_type == "suburb" && slug.current in $slugs && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, commentary, "faqs": faqs[]{ q } }`,
    { slugs: SCOPE }
  );
  const missing = SCOPE.filter((slug) => !rows.some((r) => r.slug === slug));
  if (missing.length) console.log(`No suburb document for: ${missing.join(", ")} — skipped`);

  let tx = client.transaction();
  let changes = 0;

  for (const row of rows) {
    const fixture = suburbs.find((s) => s.slug === row.slug);
    if (!fixture) continue;
    const live = JSON.stringify(row.commentary ?? []);
    const set: Record<string, unknown> = {};
    const setIfMissing: Record<string, unknown> = {};
    let appendFaqs: { q: string; a: string }[] = [];

    if (fixture.commentary && live !== JSON.stringify(fixture.commentary)) {
      if (live === JSON.stringify(ORIGINAL_COMMENTARY[row.slug] ?? null)) set.commentary = fixture.commentary;
      else console.log(`${row._id}: commentary edited in studio — left as is`);
    }
    if (fixture.faqs?.length) {
      if (!row.faqs?.length) setIfMissing.faqs = keyed(fixture.faqs, "m2");
      else if (row.slug === "feilding") {
        appendFaqs = fixture.faqs.filter((f) => !row.faqs!.some((l) => sameQuestion(l.q, f.q)));
      }
    }
    if (fixture.seoDescription) setIfMissing.seoDescription = fixture.seoDescription;

    if (!Object.keys(set).length && !Object.keys(setIfMissing).length && !appendFaqs.length) continue;
    set.needsReview = true;
    console.log(
      `${row._id}: set ${Object.keys(set).join(",")}; setIfMissing ${Object.keys(setIfMissing).join(",") || "-"}` +
        (appendFaqs.length ? `; append ${appendFaqs.length} FAQ(s)` : "")
    );
    let patch = client.patch(row._id).set(set).setIfMissing(setIfMissing);
    if (appendFaqs.length) patch = patch.insert("after", "faqs[-1]", keyed(appendFaqs, "m2-feilding"));
    tx = tx.patch(patch);
    changes++;
  }

  for (const page of localServicePages.filter((p) => SCOPE.includes(p.area))) {
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
      faqs: keyed(page.faqs, "faqs"),
      needsReview: true,
    });
    changes++;
  }

  console.log("pageHome: setIfMissing suburbsAppraisalLabel");
  tx = tx.patch(client.patch("pageHome").setIfMissing({ suburbsAppraisalLabel: homeCopy.suburbsAppraisalLabel }));
  changes++;

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
