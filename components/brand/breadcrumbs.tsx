import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail plus its BreadcrumbList markup, emitted from one
 * source. Google expects the structured data to reflect a trail the visitor can
 * actually see; keeping both in one component means they can't drift apart.
 *
 * The last crumb is the current page — rendered as text, not a link.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const trail = items.slice(0, -1);
  const current = items[items.length - 1];

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav
        aria-label="Breadcrumb"
        className={cn("text-sm text-muted-foreground", className)}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {trail.map((crumb) => (
            <li key={crumb.path} className="flex items-center gap-1">
              <Link href={crumb.path} className="hover:text-primary hover:underline">
                {crumb.name}
              </Link>
              <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden />
            </li>
          ))}
          <li>
            <span aria-current="page" className="font-medium text-foreground/80">
              {current.name}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}
