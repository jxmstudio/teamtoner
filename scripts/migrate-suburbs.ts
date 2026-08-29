/**
 * Bring a seeded dataset in line with the suburb-level content structure.
 *
 * Listings were originally imported tagged at area level ("palmerston-north",
 * "manawatu"), which meant the suburbs Team Toner genuinely sell in — Takaro,
 * Highbury, Sanson and the rest — had no page carrying their own sales as
 * evidence. Fixing that takes two halves, and a dataset with only one of them
 * is worse off than one with neither: a listing tagged `takaro` with no Takaro
 * suburb document renders its locality as the raw slug and drops out of its
 * area page entirely. So this script does both, in order:
 *
 *   1. create any suburb document the fixtures define and the dataset lacks;
 *   2. re-tag listings to the suburb their address names.
 *
 * Run (uses your `npx sanity login` session — no API token needed):
 *
 *   npm run migrate:suburbs                    # apply
 *
 * To preview without writing, set DRY_RUN first — `sanity exec` drops every
 * argument after the script path, so this can't be a command-line flag:
 *
 *   DRY_RUN=1 npm run migrate:suburbs          # bash / zsh
 *   $env:DRY_RUN=1; npm run migrate:suburbs    # PowerShell
 *
 * Idempotent and safe to re-run: existing suburb documents are never
 * overwritten (so studio edits to blurbs and commentary survive), a listing
 * already tagged to the suburb its address names is left untouched, and an
 * address whose town has no suburb page (Kairanga, Shannon, Pahiatua…) keeps
 * its area-level tag.
 */
import { getCliClient } from "sanity/cli";
import { suburbs } from "../lib/content/suburbs";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

/**
 * Town-as-written-in-the-address → suburb slug, built from the suburb list so
 * adding a suburb page is all that's needed for its listings to follow.
 */
const BY_TOWN = new Map(suburbs.map((s) => [s.name.toLowerCase(), s.slug]));

/** Addresses that name a suburb differently from its page title. */
const ALIASES: Record<string, string> = {
  fitzherbert: "summerhill",
};

function targetSlug(address: string): string | undefined {
  const town = address.split(",").pop()?.trim().toLowerCase();
  if (!town) return undefined;
  return BY_TOWN.get(town) ?? ALIASES[town];
}

type Row = { _id: string; address: string; suburb: string };

/**
 * Create suburb documents the dataset is missing. Uses createIfNotExists, so
 * suburbs the client has already edited in the studio are untouched.
 */
async function ensureSuburbDocs(): Promise<number> {
  const present = new Set(
    await client.fetch<string[]>(`*[_type == "suburb"].slug.current`)
  );
  const missing = suburbs.filter((s) => !present.has(s.slug));

  if (!missing.length) {
    console.log(`All ${suburbs.length} suburb pages exist in the dataset.`);
    return 0;
  }

  console.log(`Missing suburb page(s): ${missing.map((s) => s.slug).join(", ")}`);
  if (dryRun) return missing.length;

  for (const s of missing) {
    await client.createIfNotExists({
      _id: `suburb-${s.slug}`,
      _type: "suburb",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      ...(s.parent ? { parent: s.parent } : {}),
      blurb: s.blurb,
      ...(s.commentary ? { commentary: s.commentary } : {}),
    });
    console.log(`  created ${s.slug}`);
  }
  return missing.length;
}

async function main() {
  const created = await ensureSuburbDocs();
  console.log("");

  const listings = await client.fetch<Row[]>(
    `*[_type == "listing" && defined(address)]{ _id, address, suburb }`
  );

  const changes = listings
    .map((l) => ({ ...l, target: targetSlug(l.address) }))
    .filter((l) => l.target && l.target !== l.suburb);

  const unmatched = listings.filter((l) => !targetSlug(l.address));

  for (const l of changes) {
    console.log(`${l.address}\n  ${l.suburb} → ${l.target}`);
  }
  if (unmatched.length) {
    console.log(
      `\n${unmatched.length} listing(s) in towns with no suburb page — left as-is:`
    );
    for (const l of unmatched) console.log(`  ${l.address} (${l.suburb})`);
  }

  if (dryRun) {
    console.log(
      `\nDry run — ${created} suburb page(s) would be created, ${changes.length} listing(s) re-tagged.`
    );
    return;
  }

  if (changes.length) {
    let tx = client.transaction();
    for (const l of changes) tx = tx.patch(l._id, { set: { suburb: l.target! } });
    await tx.commit();
  } else {
    console.log("\nEvery listing is already tagged to its suburb.");
  }

  const { projectId, dataset } = client.config();
  console.log(
    `\nDone — ${created} suburb page(s) created, ${changes.length} listing(s) re-tagged in ${projectId}/${dataset}.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
