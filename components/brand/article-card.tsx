import Link from "next/link";
import Image from "next/image";
import { Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { categoryBySlug } from "@/lib/insights";
import type { Article } from "@/lib/content/types";

export const nzDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function ArticleCard({ article }: { article: Article }) {
  const category = categoryBySlug(article.category);
  return (
    <Card className="h-full overflow-hidden pt-0">
      <Link href={`/insights/${article.slug}`} className="relative block aspect-[3/2] w-full">
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-petrol to-night"
            aria-hidden
          >
            <Newspaper className="size-12 text-white/40" strokeWidth={1.5} />
          </div>
        )}
      </Link>
      <CardContent className="flex flex-col gap-3">
        <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          {category ? (
            <Link href={`/insights/category/${category.slug}`} className="hover:underline">
              {category.label}
            </Link>
          ) : null}
          <span aria-hidden className="text-muted-foreground/50">·</span>
          <time dateTime={article.published} className="font-medium normal-case tracking-normal text-muted-foreground">
            {nzDate(article.published)}
          </time>
        </p>
        <h2 className="text-lg font-semibold leading-snug text-foreground">
          <Link href={`/insights/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
      </CardContent>
    </Card>
  );
}
