import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { LegalText } from "@/components/brand/legal-text";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";
import { getPrivacyCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: `How ${siteConfig.name} collects, uses, stores and protects the personal information you share when you request an appraisal or contact Allan & Karen Toner.`,
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const copy = await getPrivacyCopy();
  return (
    <>
      <PageHeader title="Privacy Statement" eyebrow="Legal" />
      <Section>
        <Container className="prose-brand max-w-3xl space-y-6 text-foreground/90">
          {copy.note ? (
            <p className="text-sm text-muted-foreground">{copy.note}</p>
          ) : null}
          {copy.sections.map((section) => (
            <div key={section.heading}>
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
