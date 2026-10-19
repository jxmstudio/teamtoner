/**
 * Structured-data check (Month 2 SEO, Task 6): fetches one page of each type
 * from a running build, extracts every JSON-LD block and checks it against
 * what Google needs from that type — plus the rule that marked-up content
 * must be visible in the server-rendered HTML (FAQ answers especially, which
 * must not appear only after a click).
 *
 *   node --experimental-strip-types scripts/validate-jsonld.ts [base-url]
 *
 * base-url defaults to http://localhost:3000. Exits 1 if anything fails.
 */

type JsonNode = Record<string, unknown>;

const base = (process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/+$/, "");

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

/** Comparable text: no tags, entities decoded, quotes/asterisks/spacing normalised. */
function normalise(text: string): string {
  return decode(text)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** The server-rendered visible text: scripts, styles and tags stripped. */
function visibleText(html: string): string {
  return normalise(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " ")
  );
}

const isNode = (v: unknown): v is JsonNode => typeof v === "object" && v !== null && !Array.isArray(v);
const asArray = <T>(v: T | T[] | undefined): T[] => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const str = (v: unknown) => (typeof v === "string" ? v : "");
const absolute = (v: unknown) => /^https:\/\/[^/]+/.test(str(v));

/** Every node in a block, including nested ones, so @id references can be resolved. */
function walk(value: unknown, visit: (node: JsonNode) => void) {
  if (Array.isArray(value)) value.forEach((v) => walk(v, visit));
  else if (isNode(value)) {
    visit(value);
    Object.values(value).forEach((v) => walk(v, visit));
  }
}

type Checker = (node: JsonNode, visible: string) => string[];

const missing = (node: JsonNode, ...keys: string[]) =>
  keys.filter((k) => node[k] === undefined || node[k] === "" || (Array.isArray(node[k]) && !(node[k] as unknown[]).length)).map((k) => `missing ${k}`);

const shown = (label: string, text: string, visible: string) =>
  text && !visible.includes(normalise(text)) ? [`${label} not in visible HTML: "${text.slice(0, 70)}…"`] : [];

const CHECKS: Record<string, Checker> = {
  RealEstateAgent: (n) => [
    ...missing(n, "@id", "name", "url", "telephone", "address"),
    ...(isNode(n.address) ? missing(n.address, "addressLocality", "addressCountry") : []),
  ],
  WebSite: (n) => missing(n, "url", "name"),
  AboutPage: (n) => missing(n, "url", "name"),
  ContactPage: (n) => missing(n, "url", "name"),
  CollectionPage: (n) => missing(n, "url", "name"),
  BreadcrumbList: (n, visible) => {
    const items = asArray(n.itemListElement).filter(isNode);
    const errors = items.length ? [] : ["empty itemListElement"];
    items.forEach((item, i) => {
      if (item.position !== i + 1) errors.push(`item ${i + 1} has position ${item.position}`);
      if (!str(item.name)) errors.push(`item ${i + 1} has no name`);
      if (!absolute(item.item)) errors.push(`item ${i + 1} URL is not absolute`);
      errors.push(...shown(`breadcrumb "${item.name}"`, str(item.name), visible));
    });
    return errors;
  },
  FAQPage: (n, visible) => {
    const questions = asArray(n.mainEntity).filter(isNode);
    const errors = questions.length ? [] : ["no questions"];
    for (const q of questions) {
      const answer = isNode(q.acceptedAnswer) ? str(q.acceptedAnswer.text) : "";
      if (q["@type"] !== "Question" || !str(q.name) || !answer) errors.push(`malformed question "${str(q.name)}"`);
      errors.push(...shown("question", str(q.name), visible), ...shown("answer", answer, visible));
    }
    return errors;
  },
  Service: (n, visible) => {
    const area = isNode(n.areaServed) ? n.areaServed : undefined;
    return [
      ...missing(n, "name", "serviceType", "provider", "areaServed", "url"),
      ...(area && !str(area.name) ? ["areaServed has no name"] : []),
      ...(area ? shown("areaServed", str(area.name), visible) : []),
    ];
  },
  Article: (n, visible) => {
    const authors = asArray(n.author).filter(isNode);
    return [
      ...missing(n, "headline", "datePublished", "author", "publisher"),
      ...(str(n.headline).length > 110 ? ["headline over 110 characters"] : []),
      ...shown("headline", str(n.headline), visible),
      ...(authors.length && authors.every((a) => str(a.name)) ? [] : ["author without a name"]),
      ...authors.flatMap((a) => shown("author", str(a.name), visible)),
    ];
  },
  HowTo: (n) => [
    ...missing(n, "name", "step"),
    ...asArray(n.step).filter(isNode).flatMap((s, i) => (str(s.text) || str(s.name) ? [] : [`step ${i + 1} has no text`])),
  ],
  ItemList: (n) => missing(n, "itemListElement"),
  VideoObject: (n) => [
    ...missing(n, "name", "thumbnailUrl", "uploadDate"),
    ...(n.embedUrl || n.contentUrl ? [] : ["missing embedUrl/contentUrl"]),
  ],
  SingleFamilyResidence: (n, visible) => [...missing(n, "name", "address"), ...shown("listing name", str(n.name), visible)],
};

interface Sample {
  label: string;
  path: string;
}

async function samples(): Promise<Sample[]> {
  const xml = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    path: new URL(m[1].match(/<loc>([^<]+)<\/loc>/)![1]).pathname,
    priority: Number(m[1].match(/<priority>([^<]+)<\/priority>/)?.[1] ?? 0),
  }));
  const first = (test: (u: { path: string; priority: number }) => boolean) => urls.find(test)?.path;
  const picks: [string, string | undefined][] = [
    ["home", "/"],
    ["about", "/about"],
    ["contact", "/contact"],
    ["appraisal hub", "/appraisal"],
    ["sell hub", "/sell"],
    ["listings index", "/listings"],
    ["sold index", "/sold"],
    ["suburbs index", "/suburbs"],
    ["resources index", "/resources"],
    ["area appraisal page", "/appraisal/feilding"],
    ["suburb appraisal page", "/appraisal/kelvin-grove"],
    ["suburb sell page", "/sell/west-end"],
    ["area hub", "/suburbs/feilding"],
    ["priority suburb hub", "/suburbs/milson"],
    ["other suburb hub", "/suburbs/hokowhitu"],
    ["listing (for sale)", first((u) => u.path.startsWith("/listings/") && u.priority === 0.8)],
    ["listing (sold)", first((u) => u.path.startsWith("/listings/") && u.priority === 0.6)],
    ["guide", first((u) => u.path.startsWith("/resources/"))],
    ["insights article", first((u) => /^\/insights\/(?!category\/)[^/]+$/.test(u.path))],
  ];
  return picks.filter((p): p is [string, string] => Boolean(p[1])).map(([label, path]) => ({ label, path }));
}

async function main() {
  let failures = 0;
  for (const { label, path } of await samples()) {
    const res = await fetch(`${base}${path}`);
    const html = await res.text();
    const visible = visibleText(html);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const errors: string[] = res.status === 200 ? [] : [`HTTP ${res.status}`];
    const types: string[] = [];
    const ids = new Set<string>();
    const refs: string[] = [];
    const parsed: unknown[] = [];

    for (const raw of blocks) {
      try {
        parsed.push(JSON.parse(raw));
      } catch (error) {
        errors.push(`invalid JSON: ${error}`);
      }
    }
    for (const data of parsed) {
      for (const top of asArray(isNode(data) && data["@graph"] ? (data["@graph"] as unknown[]) : [data])) {
        if (!isNode(top)) continue;
        if (top["@context"] !== "https://schema.org" && !(isNode(data) && data["@context"])) errors.push(`${top["@type"]}: missing @context`);
      }
      walk(data, (node) => {
        if (typeof node["@id"] === "string") {
          if (Object.keys(node).length === 1) refs.push(node["@id"]);
          else ids.add(node["@id"]);
        }
        const type = str(node["@type"]);
        const check = CHECKS[type];
        if (check && node["@context"]) {
          types.push(type);
          errors.push(...check(node, visible).map((e) => `${type}: ${e}`));
        }
      });
    }
    for (const ref of new Set(refs)) if (!ids.has(ref)) errors.push(`@id reference ${ref} not defined on the page`);
    // Every URL-valued property must be a single well-formed absolute URL.
    for (const data of parsed) {
      walk(data, (node) => {
        for (const key of ["url", "image", "logo", "item", "thumbnailUrl", "embedUrl", "contentUrl"]) {
          for (const value of asArray(node[key] as unknown)) {
            if (typeof value !== "string") continue;
            if (!/^https:\/\/[^/\s]+/.test(value) || value.lastIndexOf("http") > 0) errors.push(`${str(node["@type"]) || "node"}.${key}: bad URL ${value.slice(0, 80)}`);
          }
        }
      });
    }

    failures += errors.length ? 1 : 0;
    console.log(`${errors.length ? "FAIL" : "ok  "}  ${label.padEnd(22)} ${path}\n      ${types.join(", ") || "(no JSON-LD)"}`);
    for (const e of errors) console.log(`      ✗ ${e}`);
  }
  console.log(failures ? `\n${failures} page(s) failed.` : "\nAll sampled pages passed.");
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

export {};
