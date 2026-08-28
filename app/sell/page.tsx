import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { ValueProps } from "@/components/brand/value-props";
import { FeePillars } from "@/components/brand/fee-pillars";
import { MarketingGallery } from "@/components/brand/marketing-gallery";
import { ProvenResults } from "@/components/brand/proven-results";
import { CtaSection } from "@/components/brand/cta-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { FeeText, TermsFootnote } from "@/components/brand/commission";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { seoTitles } from "@/lib/site";
import { getSellCopy, getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.sell },
  description:
    "Sell your home with Allan & Karen Toner — two agents working together, premium marketing and proven Palmerston North results, for a 2% + GST commission.",
  alternates: { canonical: "/sell" },
};

export default async function SellPage() {
  const siteConfig = await getSiteConfig();
  const copy = await getSellCopy();
  const { steps, faqs } = copy;
  return (
    <>
      <FaqJsonLd faqs={faqs} />

      <PageHeader
        eyebrow={copy.headerEyebrow}
        title={copy.headerTitle}
        description={copy.headerDescription}
      >
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {copy.intro}
        </p>
        <FeePillars className="mt-7" />
        <ButtonLink
          href="/appraisal"
          className="mt-7 h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
        >
          Get a Free Appraisal
        </ButtonLink>
      </PageHeader>

      <ValueProps points={siteConfig.sellingPointsSell} />

      <Section className="bg-secondary/50">
        <Container>
          <SectionHeading eyebrow={copy.processEyebrow} title={copy.processTitle} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-script text-4xl text-teal">{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <MarketingGallery />

      <ProvenResults className="bg-secondary/50" />

      <Section>
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
          <Accordion className="mt-8">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <FeeText>{faq.a}</FeeText>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <TermsFootnote />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
