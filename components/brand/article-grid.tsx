import { ArticleCard } from "@/components/brand/article-card";
import type { Article } from "@/lib/content/types";

export function ArticleGrid({ articles, emptyMessage }: { articles: Article[]; emptyMessage: string }) {
  if (!articles.length) {
    return (
      <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  );
}
