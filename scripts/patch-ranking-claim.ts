import { getCliClient } from "sanity/cli";
import { siteConfig } from "../lib/site";
import { homeCopy, appraisalCopy, termsCopy } from "../lib/content/page-copy";
import { suburbs } from "../lib/content/suburbs";

/**
 * Client amendment, 31 Aug 2026 — retire the "#7 Arizto agents nationwide"
 * ranking claim and standardise on a single line plus its source footnote.
 *
 * The studio documents were seeded with a full copy of the code defaults, so
 * every field is overridden by the CMS: editing lib/* alone changes nothing on
 * the live site. This replays the same amendment into Sanity, reading the new
 * strings straight from the code defaults so the two cannot drift.
 *
 *   npx sanity exec scripts/patch-ranking-claim.ts --with-user-token
 */

const client = getCliClient({ apiVersion: "2024-10-01" });

const pnSuburb = suburbs.find((s) => s.slug === "palmerston-north");
const rankingSection = termsCopy.sections.find((s) => s.anchor === "rankings");

async function main() {
  if (!pnSuburb || !rankingSection) throw new Error("code defaults moved — check this script");

  const tx = client.transaction();

  tx.patch("siteSettings", (p) =>
    p
      .set({
        description: siteConfig.description,
        footerDescription: siteConfig.footerDescription,
        ctaDescription: siteConfig.cta.description,
        rankingLine: siteConfig.stats.rankingLine,
        rankingFootnote: siteConfig.stats.rankingFootnote,
        "sellingPoints[_key==\"point-1\"].detail": siteConfig.sellingPoints[1].detail,
        "sellingPointsSell[_key==\"point-1\"].detail": siteConfig.sellingPointsSell[1].detail,
      })
      // The schema no longer exposes these and the GROQ projection no longer
      // reads them; left in place they would only confuse a future editor.
      .unset(["nationalRank", "regionRank", "regionName"])
  );

  tx.patch("pageHome", (p) =>
    p.set({ recognitionDescription: homeCopy.recognitionDescription })
  );

  tx.patch("pageAppraisal", (p) =>
    p.set({ headerDescription: appraisalCopy.headerDescription })
  );

  // Matched on the read-only `anchor`, not the array index — every ranking
  // asterisk on the site links to this section.
  tx.patch("pageTerms", (p) =>
    p.set({ "sections[anchor==\"rankings\"].paragraphs": rankingSection.paragraphs })
  );

  tx.patch("suburb-palmerston-north", (p) => p.set({ blurb: pnSuburb.blurb }));

  const result = await tx.commit();
  console.log(`Patched in transaction ${result.transactionId}:`);
  for (const doc of result.results) console.log(`  ${doc.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
