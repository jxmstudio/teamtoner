/**
 * Move an already-seeded dataset onto the hand-picked featured grid.
 *
 * Until the 2 Sep 2026 handover the home page showed the three newest
 * listings flagged "Feature on the home page". The client asked to choose
 * the large hero card and the order of the smaller ones themselves, so that
 * flag is replaced by the "Featured properties" document (schema in
 * sanity/schemaTypes/featuredListings.ts). This script:
 *
 *   1. creates that document from the current flags, in the order the site
 *      showed them (newest first), so the home page is unchanged after deploy;
 *   2. unsets the retired `featured` flag on every listing — the schema and
 *      GROQ projection no longer read it, and left in place it would surface
 *      as an "unknown field" warning in the studio.
 *
 * Run (uses your `npx sanity login` session — no API token needed):
 *
 *   npm run migrate:featured
 *
 * Preview without writing: `DRY_RUN=1 npm run migrate:featured`.
 * Idempotent: the featured document is only created if absent (studio picks
 * are never overwritten), and clearing an already-clear flag is a no-op.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

type Row = { _id: string; address: string; status: string; featured: boolean | null };

async function main() {
  const listings = await client.fetch<Row[]>(
    `*[_type == "listing"] | order(_createdAt desc) { _id, address, status, featured }`
  );
  const flagged = listings.filter((l) => l.featured === true);
  const picks = flagged.filter((l) => l.status !== "sold").slice(0, 3);
  const [hero, ...others] = picks;

  const existing = await client.fetch<{ hero?: unknown } | null>(
    `*[_id == "featuredListings"][0]{ hero }`
  );

  if (existing) {
    console.log("Featured properties document already exists — leaving it as-is.");
  } else if (hero) {
    console.log(`Hero:   ${hero.address}`);
    for (const l of others) console.log(`Other:  ${l.address}`);
  } else {
    console.log("No flagged listings — creating an empty Featured properties document.");
  }

  const withFlag = listings.filter((l) => l.featured !== null);
  if (withFlag.length) {
    console.log(`\nClearing the retired "featured" flag on ${withFlag.length} listing(s).`);
  }

  if (dryRun) {
    console.log("\nDry run — nothing written.");
    return;
  }

  if (!existing) {
    await client.createIfNotExists({
      _id: "featuredListings",
      _type: "featuredListings",
      ...(hero ? { hero: { _type: "reference", _ref: hero._id } } : {}),
      others: others.map((l, i) => ({
        _type: "reference",
        _ref: l._id,
        _key: `featured-${i}`,
      })),
    });
  }

  if (withFlag.length) {
    let tx = client.transaction();
    for (const l of withFlag) tx = tx.patch(l._id, { unset: ["featured"] });
    await tx.commit();
  }

  const { projectId, dataset } = client.config();
  console.log(`\nDone in ${projectId}/${dataset}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
