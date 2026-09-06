import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { ArticleCard, nzDate } from "@/components/brand/article-card";
import { InsightArticleJsonLd } from "@/components/seo/json-ld";
import { getArticleBySlug, getArticles, getArticlesByCategory, getSiteConfig } from "@/lib/data";
import { categoryBySlug } from "@/lib/insights";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: { absolute: `${article.title} | Team Toner` },
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: article.cover ? { images: [{ url: article.cover }] } : undefined,
  };
}

export default async function InsightArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const category = categoryBySlug(article.category);
  const [siteConfig, related] = await Promise.all([
    getSiteConfig(),
    getArticlesByCategory(article.category),
  ]);
  const more = related.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <InsightArticleJsonLd article={article} category={category?.label ?? article.category} />

      <PageHeader
        eyebrow={
          category ? (
            <Link href={`/insights/category/${category.slug}`} className="hover:underline">
              {category.label}
            </Link>
          ) : undefined
        }
        title={article.title}
        description={article.excerpt}
      />

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Property Insights", path: "/insights" },
              ...(category
                ? [{ name: category.label, path: `/insights/category/${category.slug}` }]
                : []),
              { name: article.title, path: `/insights/${article.slug}` },
            ]}
          />

          {/* Visible byline and dates — the E-E-A-T signal Google looks for
              on advice content, matching the guide pages. */}
          <p className="mt-6 border-y border-border py-3 text-sm text-muted-foreground">
            Written by{" "}
            <Link href="/about" className="font-medium text-foreground hover:underline">
              {siteConfig.agents.allan.name} &amp; {siteConfig.agents.karen.name}
            </Link>
            , {siteConfig.agents.allan.role}s at {siteConfig.brand.parent}.{" "}
            <span className="whitespace-nowrap">
              Published <time dateTime={article.published}>{nzDate(article.published)}</time>
              {article.updated && article.updated !== article.published ? (
                <>
                  , updated <time dateTime={article.updated}>{nzDate(article.updated)}</time>
                </>
              ) : null}
              .
            </span>
          </p>

          {article.cover ? (
            <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-xl">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 space-y-10">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
                <div className="mt-3 space-y-4 text-lg text-foreground/90">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2 text-foreground/90">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>

      {more.length ? (
        <Section className="border-t border-border bg-secondary/40">
          <Container>
            <h2 className="text-2xl font-bold text-foreground">
              More {category?.label ?? "insights"}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
