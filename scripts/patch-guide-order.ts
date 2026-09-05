/**
 * One-off content fixes from the client's 5 Sep 2026 email:
 *
 *   1. Number the seller guides in the order Allan asked for (the new
 *      `sortOrder` field on guides — see sanity/schemaTypes/guide.ts), and
 *      trim the stray leading space in "Preparing Your Home for Sale".
 *   2. Unset the retired `featured` flag on the one listing created with it
 *      after the featured-grid migration ran — it's what the studio was
 *      flagging as "Unknown field found".
 *
 * Drafts are patched alongside their published documents so publishing a
 * pending edit can't wipe the new values.
 *
 * Run from the repo root:  npx sanity exec scripts/patch-guide-order.ts --with-user-token
 * Preview:                 DRY_RUN=1 npx sanity exec scripts/patch-guide-order.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");

/** Client's order, matched on the trimmed title. */
const ORDER = [
  "Seller Success Guide",
  "Preparing Your Home for Sale",
  "Choosing the Right Method of Sale",
  "The Home Selling Process",
  "Understanding Offers & Conditions",
];

type Guide = { _id: string; title: string; sortOrder: number | null };
type Listing = { _id: string; address: string };

async function main() {
  const guides = await client.fetch<Guide[]>(`*[_type == "guide"]{ _id, title, sortOrder }`);
  const listings = await client.fetch<Listing[]>(
    `*[_type == "listing" && defined(featured)]{ _id, address }`
  );

  let tx = client.transaction();
  let changes = 0;

  for (const g of guides) {
    const title = g.title.trim();
    const position = ORDER.indexOf(title);
    const set: Record<string, unknown> = {};
    if (position !== -1 && g.sortOrder !== position + 1) set.sortOrder = position + 1;
    if (title !== g.title) set.title = title;
    if (Object.keys(set).length === 0) continue;
    console.log(`${g._id}: ${JSON.stringify(set)}`);
    tx = tx.patch(g._id, { set });
    changes++;
  }

  for (const l of listings) {
    console.log(`${l._id} (${l.address}): unset featured`);
    tx = tx.patch(l._id, { unset: ["featured"] });
    changes++;
  }

  if (!changes) {
    console.log("Nothing to change.");
    return;
  }
  if (dryRun) {
    console.log(`\nDry run — ${changes} patch(es) not written.`);
    return;
  }
  const result = await tx.commit();
  const { projectId, dataset } = client.config();
  console.log(`\nCommitted ${changes} patch(es) in ${projectId}/${dataset} (transaction ${result.transactionId}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
