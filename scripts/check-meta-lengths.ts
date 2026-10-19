/**
 * Mobile SERP check (Month 2 SEO, Task 4): reads the sitemap, fetches every
 * page, and prints each <title> over 55 characters and each meta description
 * over 150 — roughly where Google starts truncating on a phone.
 *
 *   node --experimental-strip-types scripts/check-meta-lengths.ts [base-url]
 *
 * base-url defaults to http://localhost:3000; point it at a running dev or
 * production server (`npm run dev`, `npm start`) or at the live site
 * (https://www.teamtoner.co.nz). Sitemap URLs are rewritten onto base-url,
 * so a local run checks the local build, not production.
 *
 * Flags: --all prints every page, not only the offenders.
 */

const TITLE_LIMIT = 55;
const DESCRIPTION_LIMIT = 150;
const CONCURRENCY = 4;

const args = process.argv.slice(2);
const showAll = args.includes("--all");
const base = (args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/+$/, "");

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .trim();
}

function metaContent(html: string, name: string): string | undefined {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (new RegExp(`\\bname=["']${name}["']`, "i").test(tag)) {
      const content = tag.match(/\bcontent=["']([^"']*)["']/i);
      if (content) return decode(content[1]);
    }
  }
  return undefined;
}

interface PageMeta {
  path: string;
  status: number;
  title: string;
  description: string;
}

async function inspect(path: string): Promise<PageMeta> {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  const html = await res.text();
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  return { path, status: res.status, title, description: metaContent(html, "description") ?? "" };
}

async function main() {
  const sitemap = await fetch(`${base}/sitemap.xml`).then((r) => {
    if (!r.ok) throw new Error(`${base}/sitemap.xml returned ${r.status}`);
    return r.text();
  });
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);

  const results: PageMeta[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < paths.length) {
        const path = paths[next++];
        try {
          results.push(await inspect(path));
        } catch (error) {
          results.push({ path, status: 0, title: "", description: `fetch failed: ${error}` });
        }
      }
    })
  );
  results.sort((a, b) => paths.indexOf(a.path) - paths.indexOf(b.path));

  const longTitles = results.filter((r) => r.title.length > TITLE_LIMIT);
  const longDescriptions = results.filter((r) => r.description.length > DESCRIPTION_LIMIT);
  const broken = results.filter((r) => r.status !== 200 || !r.title || !r.description);

  if (showAll) {
    console.log(`\nAll ${results.length} pages (title chars / description chars):`);
    for (const r of results) console.log(`${String(r.title.length).padStart(3)} ${String(r.description.length).padStart(4)}  ${r.path}  —  ${r.title}`);
  }

  console.log(`\nChecked ${results.length} pages from ${base}/sitemap.xml\n`);
  console.log(`Titles over ${TITLE_LIMIT} characters: ${longTitles.length}`);
  for (const r of longTitles.sort((a, b) => b.title.length - a.title.length)) {
    console.log(`  ${String(r.title.length).padStart(3)}  ${r.path}\n       ${r.title}`);
  }
  console.log(`\nDescriptions over ${DESCRIPTION_LIMIT} characters: ${longDescriptions.length}`);
  for (const r of longDescriptions.sort((a, b) => b.description.length - a.description.length)) {
    console.log(`  ${String(r.description.length).padStart(3)}  ${r.path}\n       ${r.description}`);
  }
  if (broken.length) {
    console.log(`\nPages with a non-200 status or a missing title/description: ${broken.length}`);
    for (const r of broken) console.log(`  ${r.status}  ${r.path}  title=${JSON.stringify(r.title)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
