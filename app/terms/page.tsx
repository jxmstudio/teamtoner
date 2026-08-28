import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { LegalText } from "@/components/brand/legal-text";
import { Container, Section } from "@/components/brand/primitives";
import { getSiteConfig, getTermsCopy } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: "Terms of Use",
    description: `Terms of use for the ${config.name} website, including the commission and fee terms that apply to ${config.guarantee.name} and our advertised ${config.stats.commission} rate.`,
    alternates: { canonical: "/terms" },
  };
}

export default async function TermsPage() {
  const copy = await getTermsCopy();
  return (
    <>
      <PageHeader title="Terms of Use" eyebrow="Legal" />
      <Section>
        <Container className="max-w-3xl space-y-6 text-foreground/90">
          {copy.note ? (
            <p className="text-sm text-muted-foreground">{copy.note}</p>
          ) : null}
          {/* The #commission and #rankings anchors are the landing points for
              every fee/ranking asterisk on the site — the section anchors come
              from the CMS document but are read-only there. */}
          {copy.sections.map((section) => (
            <div
              key={section.heading}
              id={section.anchor || undefined}
              className={section.anchor ? "scroll-mt-24" : undefined}
            >
              <h2 className="text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-2">
                  <LegalText>{paragraph}</LegalText>
                </p>
              ))}
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
