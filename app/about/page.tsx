import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/brand/page-header";
import { FeePillars } from "@/components/brand/fee-pillars";
import { CtaSection } from "@/components/brand/cta-section";
import { RankingClaim } from "@/components/brand/ranking-claim";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { PageEntityJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getAboutCopy, getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.about },
  description:
    "Meet Allan & Karen Toner — a husband-and-wife real estate team serving Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const { agents, brand } = await getSiteConfig();
  const copy = await getAboutCopy();
  return (
    <>
      <PageEntityJsonLd
        type="AboutPage"
        path="/about"
        name="About Allan & Karen Toner"
        description={`Allan & Karen Toner — ${agents.allan.role}s with ${brand.parent}, serving Palmerston North, Feilding, Ashhurst and the wider Manawatū.`}
      />

      <PageHeader
        eyebrow={copy.headerEyebrow}
        title={copy.headerTitle}
        description={copy.headerDescription}
      />

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border lg:sticky lg:top-24">
            <Image
              src="/team/allan-karen.jpg"
              alt="Allan and Karen Toner, husband-and-wife real estate agents in Palmerston North"
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 text-lg text-foreground/90">
            {copy.bodyParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === copy.bodyParagraphs.length - 1
                    ? "font-semibold text-foreground"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Arizto model and the fee — deliberately after the team story. */}
      <Section className="bg-secondary/50">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow={`Part of ${brand.parent}`}
            title={copy.modelTitle}
            description={copy.modelDescription}
          />
          <FeePillars className="mt-8 justify-center" />
          <p className="mt-8 text-muted-foreground">
            {brand.reaa}.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <RankingClaim className="text-center" />
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Talk to us:{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href={`tel:${agents.allan.phone.replace(/\s/g, "")}`}
            >
              {agents.allan.name} {agents.allan.phone}
            </a>{" "}
            ·{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href={`tel:${agents.karen.phone.replace(/\s/g, "")}`}
            >
              {agents.karen.name} {agents.karen.phone}
            </a>
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
