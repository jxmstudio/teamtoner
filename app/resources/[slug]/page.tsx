import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getGuideBySlug, getGuidesWithPages } from "@/lib/data";

export function generateStaticParams() {
  return getGuidesWithPages().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  props: PageProps<"/resources/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);
  if (!guide?.body?.length) return { title: "Guide not found" };
  return {
    title: { absolute: `${guide.title} | Team Toner Palmerston North` },
    description: guide.description,
    alternates: { canonical: `/resources/${guide.slug}` },
  };
}

export default async function GuidePage(props: PageProps<"/resources/[slug]">) {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);
  if (!guide?.body?.length) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Free property selling guides", path: "/resources" },
          { name: guide.title, path: `/resources/${guide.slug}` },
        ]}
      />

      <PageHeader
        eyebrow={guide.category}
        title={guide.title}
        description={guide.description}
      />

      <Section>
        <Container className="max-w-3xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> All guides
          </Link>

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
