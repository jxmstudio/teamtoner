import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { ArticleGrid } from "@/components/brand/article-grid";
import { InsightsCategoryNav } from "@/components/brand/insights-category-nav";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { fitTitle } from "@/lib/site";
import { getArticlesByCategory, getInsightsCopy } from "@/lib/data";
import { ARTICLE_CATEGORIES, categoryBySlug } from "@/lib/insights";

export function generateStaticParams() {
  return ARTICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/category/[category]">
): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: {
      absolute: fitTitle([
        `${category.label} | Property Insights | Team Toner`,
        `${category.label} | Team Toner`,
      ]),
    },
    description: `${category.label} articles from Team Toner, Palmerston North and Manawatū real estate agents.`,
    alternates: { canonical: `/insights/category/${category.slug}` },
  };
}

export default async function InsightsCategoryPage(
  props: PageProps<"/insights/category/[category]">
) {
  const { category: slug } = await props.params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const [articles, copy] = await Promise.all([getArticlesByCategory(category.slug), getInsightsCopy()]);

  return (
    <>
      {articles.length ? (
        <ItemListJsonLd
          name={`${category.label} — Property Insights`}
          items={articles.map((a) => ({ name: a.title, path: `/insights/${a.slug}` }))}
        />
      ) : null}

      <PageHeader eyebrow={copy.headerEyebrow} title={category.label} description={copy.headerDescription} />
      <Section>
        <Container>
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Home", path: "/" },
              { name: "Property Insights", path: "/insights" },
              { name: category.label, path: `/insights/category/${category.slug}` },
            ]}
          />
          <InsightsCategoryNav current={category.slug} />
          <div className="mt-8">
            <ArticleGrid
              articles={articles}
              emptyMessage={`No ${category.label} articles yet — check back soon.`}
            />
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
