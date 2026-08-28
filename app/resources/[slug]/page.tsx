import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { GuideArticleJsonLd, HowToJsonLd } from "@/components/seo/json-ld";
import { getGuideBySlug, getGuidesWithPages, getSiteConfig } from "@/lib/data";

const nzDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export async function generateStaticParams() {
  return (await getGuidesWithPages()).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  props: PageProps<"/resources/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = await getGuideBySlug(slug);
  if (!guide?.body?.length) return { title: "Guide not found" };
  return {
    title: { absolute: `${guide.title} | Team Toner Palmerston North` },
    description: guide.description,
    alternates: { canonical: `/resources/${guide.slug}` },
  };
}

export default async function GuidePage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  const guide = await getGuideBySlug(slug);
  if (!guide?.body?.length) notFound();

  const siteConfig = await getSiteConfig();

  return (
    <>
      <GuideArticleJsonLd guide={guide} />
      {guide.process ? (
        <HowToJsonLd
          name={guide.title}
          description={guide.description}
          steps={guide.body.map((section) => ({
            name: section.heading,
            text: section.paragraphs.join(" "),
          }))}
        />
      ) : null}

      <PageHeader
        eyebrow={guide.category}
        title={guide.title}
        description={guide.description}
      />

      <Section>
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Free property selling guides", path: "/resources" },
              { name: guide.title, path: `/resources/${guide.slug}` },
            ]}
          />

          {/* Visible byline and revision date — the E-E-A-T signal Google and
              the AI answer engines look for on advice content. */}
          {guide.published ? (
            <p className="mt-6 border-y border-border py-3 text-sm text-muted-foreground">
              Written by{" "}
              <Link href="/about" className="font-medium text-foreground hover:underline">
                {siteConfig.agents.allan.name} &amp; {siteConfig.agents.karen.name}
              </Link>
              , {siteConfig.agents.allan.role}s at {siteConfig.brand.parent}.{" "}
              <span className="whitespace-nowrap">
                Last updated{" "}
                <time dateTime={guide.updated ?? guide.published}>
                  {nzDate(guide.updated ?? guide.published)}
                </time>
                .
              </span>
            </p>
          ) : null}

          {guide.comparison ? (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{guide.comparison.caption}</caption>
                <thead>
                  <tr className="border-b border-border">
                    {guide.comparison.columns.map((col) => (
                      <th key={col} scope="col" className="px-3 py-3 font-semibold text-foreground">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.comparison.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border/60 align-top">
                      {row.map((value, i) => (
                        <td
                          key={i}
                          className={
                            i === 0
                              ? "px-3 py-3 font-semibold text-foreground"
                              : "px-3 py-3 text-muted-foreground"
                          }
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          <div className="mt-8 space-y-10">
            {guide.body.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-foreground">
                  {section.heading}
                </h2>
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

          {guide.pdf ? (
            <a
              href={guide.pdf}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Download className="size-4" /> Download the {guide.title} PDF
            </a>
          ) : null}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
