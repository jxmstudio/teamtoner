import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { ArticleGrid } from "@/components/brand/article-grid";
import { InsightsCategoryNav } from "@/components/brand/insights-category-nav";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getArticles, getInsightsCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.insights },
  description:
    "Market updates, selling and buying advice, and local knowledge for Palmerston North and Manawatū homeowners from Allan & Karen Toner.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const [articles, copy] = await Promise.all([getArticles(), getInsightsCopy()]);
  return (
    <>
      {articles.length ? (
        <ItemListJsonLd
          name="Property Insights"
          description="Articles from Team Toner on the Palmerston North and Manawatū property market."
          items={articles.map((a) => ({ name: a.title, path: `/insights/${a.slug}` }))}
        />
      ) : null}

      <PageHeader
        eyebrow={copy.headerEyebrow}
        title={copy.headerTitle}
        description={copy.headerDescription}
      />
      <Section>
        <Container>
          <InsightsCategoryNav />
          <div className="mt-8">
            <ArticleGrid
              articles={articles}
              emptyMessage="No articles yet — the first Property Insights are on their way."
            />
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
