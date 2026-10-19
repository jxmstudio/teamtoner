/**
 * Internal-link check (Month 2 SEO, Task 6) against a running build:
 *
 *   - every listing page links to the appraisal page for its suburb — the
 *     suburb's own when it has one, else its area's, else Palmerston North's;
 *   - every /appraisal/<area>, /sell/<area> and /suburbs/<area> trio links
 *     to the other two.
 *
 *   node --experimental-strip-types scripts/check-internal-links.ts [base-url]
 *
 * base-url defaults to http://localhost:3000. Exits 1 if anything fails.
 */

const base = (process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/+$/, "");
const CONCURRENCY = 4;

/** Links in the page body — the site header and footer are left out on purpose. */
function bodyLinks(html: string): Set<string> {
  const body = html.split(/<footer class="bg-night/)[0].split(/<\/header>/).slice(1).join("");
  return new Set([...body.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]));
}

async function pages(paths: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < paths.length) {
        const path = paths[next++];
        out.set(path, await fetch(`${base}${path}`).then((r) => r.text()));
      }
    })
  );
  return out;
}

async function main() {
  const xml = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const areas = paths.filter((p) => p.startsWith("/appraisal/")).map((p) => p.slice("/appraisal/".length));
  const listings = paths.filter((p) => p.startsWith("/listings/"));
  const suburbPages = paths.filter((p) => p.startsWith("/suburbs/"));

  const html = await pages([...listings, ...suburbPages, ...areas.flatMap((a) => [`/appraisal/${a}`, `/sell/${a}`])]);
  const errors: string[] = [];

  // Suburb → parent area, read from each suburb page's breadcrumb trail.
  const parentOf = new Map<string, string>();
  for (const path of suburbPages) {
    const crumbs = [...(html.get(path) ?? "").matchAll(/"item":"https:\/\/[^"]+\/suburbs\/([^"]+)"/g)].map((m) => m[1]);
    if (crumbs.length >= 2) parentOf.set(path.slice("/suburbs/".length), crumbs[crumbs.length - 2]);
  }
  const expectedAppraisal = (suburb: string) => {
    if (areas.includes(suburb)) return suburb;
    const parent = parentOf.get(suburb);
    return parent && areas.includes(parent) ? parent : "palmerston-north";
  };

  for (const path of listings) {
    const page = html.get(path) ?? "";
    const suburb = page.match(/"item":"https:\/\/[^"]+\/suburbs\/([^"]+)"/)?.[1];
    if (!suburb) {
      errors.push(`${path}: no suburb breadcrumb`);
      continue;
    }
    const want = `/appraisal/${expectedAppraisal(suburb)}`;
    if (!bodyLinks(page).has(want)) errors.push(`${path} (${suburb}): no link to ${want}`);
  }

  for (const area of areas) {
    const trio = [`/appraisal/${area}`, `/sell/${area}`, `/suburbs/${area}`];
    for (const from of trio) {
      const links = bodyLinks(html.get(from) ?? "");
      for (const to of trio) if (to !== from && !links.has(to)) errors.push(`${from}: no link to ${to}`);
    }
  }

  console.log(`Checked ${listings.length} listing pages and ${areas.length} area page sets (${areas.join(", ")}).`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log(errors.length ? `\n${errors.length} problem(s).` : "All internal links present.");
  process.exit(errors.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
