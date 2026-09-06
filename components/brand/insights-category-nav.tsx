import Link from "next/link";
import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES } from "@/lib/insights";

/**
 * The category bar shown above the article grid. Every entry is a real link
 * to its own page, so each category is an indexable URL rather than a
 * client-side filter.
 */
export function InsightsCategoryNav({ current }: { current?: string }) {
  const pill = (active: boolean) =>
    cn(
      "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-teal bg-teal text-teal-foreground"
        : "border-border bg-background text-foreground/80 hover:border-teal hover:text-primary"
    );
  return (
    <nav aria-label="Insight categories" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex w-max gap-2 pb-1">
        <li>
          <Link href="/insights" className={pill(!current)} aria-current={!current ? "page" : undefined}>
            All
          </Link>
        </li>
        {ARTICLE_CATEGORIES.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/insights/category/${c.slug}`}
              className={pill(current === c.slug)}
              aria-current={current === c.slug ? "page" : undefined}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
