import { readFileSync } from "node:fs";
import { ARTICLE_CATEGORIES } from "../lib/insights.ts";

/**
 * Reads the Property Insights drafts kept for client approval in
 * docs/seo/drafts/*.md into studio-ready article fields. The markdown is the
 * single source: header lines give title, URL, category and excerpt; after the
 * `---`, each `## ` heading starts a section, blank lines separate paragraphs
 * and `- ` lines are bullet points (rendered after the section's paragraphs).
 * Inline `[text](/path)` links are kept as written — the article page renders
 * them as links.
 */

export const INSIGHT_DRAFTS = [
  "docs/seo/drafts/article-01-what-is-my-house-worth.md",
  "docs/seo/drafts/article-02-selling-a-house-in-ashhurst.md",
];

export interface DraftSection {
  heading: string;
  paragraphs: string[];
  bullets: string[];
}

export interface InsightDraft {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: DraftSection[];
}

export function parseInsightDraft(markdown: string, source = "draft"): InsightDraft {
  const split = markdown.indexOf("\n---\n");
  if (split < 0) throw new Error(`${source}: no --- separator`);
  const head = markdown.slice(0, split);
  const field = (label: string) => {
    const value = head.match(new RegExp(`\\*\\*${label}[^*]*\\*\\*\\s*(.+)`))?.[1].trim();
    if (!value) throw new Error(`${source}: missing **${label}:**`);
    return value;
  };

  const categoryLabel = field("Category");
  const category = ARTICLE_CATEGORIES.find((c) => c.label === categoryLabel)?.slug;
  if (!category) throw new Error(`${source}: unknown category "${categoryLabel}"`);
  const slug = field("Proposed URL").replace(/^\/insights\//, "");

  const body: DraftSection[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length && body.length) body[body.length - 1].paragraphs.push(paragraph.join(" "));
    paragraph = [];
  };
  for (const raw of markdown.slice(split + 5).split("\n")) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flush();
      body.push({ heading: line.slice(3).trim(), paragraphs: [], bullets: [] });
    } else if (line.startsWith("- ")) {
      flush();
      body[body.length - 1]?.bullets.push(line.slice(2).trim());
    } else if (!line) {
      flush();
    } else {
      paragraph.push(line);
    }
  }
  flush();

  return { slug, title: field("Title"), category, excerpt: field("Excerpt"), body };
}

export function loadInsightDrafts(root = "."): InsightDraft[] {
  return INSIGHT_DRAFTS.map((file) => parseInsightDraft(readFileSync(`${root}/${file}`, "utf8"), file));
}

// `node --experimental-strip-types scripts/insight-drafts.ts` prints what the seed would write.
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const draft of loadInsightDrafts()) {
    const words = draft.body
      .flatMap((s) => [s.heading, ...s.paragraphs, ...s.bullets])
      .join(" ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .split(/\s+/).length;
    console.log(`\n/insights/${draft.slug} (${draft.category}, ${words} words, excerpt ${draft.excerpt.length} chars)`);
    console.log(`  ${draft.title}`);
    for (const s of draft.body) console.log(`  ## ${s.heading} — ${s.paragraphs.length} paragraph(s), ${s.bullets.length} bullet(s)`);
  }
}
