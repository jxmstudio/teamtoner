/**
 * Property-document titles became a dropdown of preset names plus "Other"
 * (client request, 7 Sep 2026 — see lib/property-documents.ts). This moves
 * every existing document onto that scheme:
 *
 *   - a title on the preset list (after trimming) stays as is;
 *   - anything else becomes title "Other" with the old wording in customTitle,
 *     so the listing page shows exactly what it showed before;
 *   - an "Other" whose customTitle now matches a preset (after the list grows)
 *     snaps onto the preset.
 *
 * Idempotent; drafts are patched alongside published documents.
 *
 * Run from the repo root:  npx sanity exec scripts/migrate-document-titles.ts --with-user-token
 * Preview:                 DRY_RUN=1 npx sanity exec scripts/migrate-document-titles.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { OTHER_DOCUMENT_TITLE, PROPERTY_DOCUMENT_TITLES } from "../lib/property-documents";

const client = getCliClient({ apiVersion: "2026-08-01" });
const dryRun = /^(1|true)$/i.test(process.env.DRY_RUN ?? "");
const presets = new Set<string>(PROPERTY_DOCUMENT_TITLES);

/** Existing wordings that are the same document as a preset. */
const ALIASES: Record<string, string> = {
  "Disclosure Form": "Disclosure Document",
  "Title Quick Explanation Form": "Title Explanation Form",
};

type Doc = { _key: string; title?: string; customTitle?: string };
type Listing = { _id: string; address: string; documents: Doc[] | null };

async function main() {
  const listings = await client.fetch<Listing[]>(
    `*[_type == "listing" && count(documents) > 0]{ _id, address, documents[]{ _key, title, customTitle } }`
  );

  let tx = client.transaction();
  let changes = 0;

  for (const l of listings) {
    for (const d of l.documents ?? []) {
      const raw = d.title?.trim() ?? "";
      const title = ALIASES[raw] ?? raw;
      const custom = d.customTitle?.trim();
      const set: Record<string, unknown> = {};
      const unset: string[] = [];
      const at = (field: string) => `documents[_key == "${d._key}"].${field}`;

      if (title === OTHER_DOCUMENT_TITLE) {
        if (custom && presets.has(custom)) {
          set[at("title")] = custom;
          unset.push(at("customTitle"));
        }
      } else if (presets.has(title)) {
        if (title !== d.title) set[at("title")] = title;
        if (d.customTitle != null) unset.push(at("customTitle"));
      } else {
        set[at("title")] = OTHER_DOCUMENT_TITLE;
        set[at("customTitle")] = title || "Document";
      }

      if (!Object.keys(set).length && !unset.length) continue;
      console.log(`${l._id} (${l.address}) ${JSON.stringify(d.title)} → ${JSON.stringify({ set, unset })}`);
      tx = tx.patch(l._id, { set, unset });
      changes++;
    }
  }

  if (!changes) return console.log("Nothing to change.");
  if (dryRun) return console.log(`DRY RUN — ${changes} patch(es) not committed.`);
  await tx.commit();
  console.log(`Committed ${changes} patch(es).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
