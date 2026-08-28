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
import { seoTitles, type SiteConfig } from "@/lib/site";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.sell },
  description:
    "Sell your home with Allan & Karen Toner — two agents working together, premium marketing and proven Palmerston North results, for a 2% + GST commission.",
  alternates: { canonical: "/sell" },
};

const steps = [
  {
    title: "Free, evidence-based appraisal",
    detail:
      "We visit your property, discuss your plans and provide an honest assessment based on current market evidence and recent comparable sales.",
  },
  {
    title: "Your selling strategy",
    detail:
      "Together we'll choose the right method of sale, pricing strategy and marketing plan for your property.",
  },
  {
    title: "Launch & market",
    detail:
      "Professional marketing showcases your property while we manage enquiries, viewings, open homes and buyer follow-up.",
  },
  {
    title: "Negotiate & sell",
    detail:
      "When the offers arrive, we negotiate on your behalf to achieve the strongest possible result — then stay involved right through to settlement.",
  },
];

const buildFaqs = (siteConfig: SiteConfig) => [
  {
    q: "How much is your commission?",
    a: `Our commission is ${siteConfig.stats.commission} of the sale price. There are no upfront costs, and under ${siteConfig.guarantee.name} you only pay when your property sells.`,
  },
  {
    q: "Are there any upfront costs?",
    a: "No. You don't pay anything to list with us. Your premium marketing package is included, so there's nothing to fund before your property goes to market.",
  },
  {
    q: `What is ${siteConfig.guarantee.name}?`,
    a: `${siteConfig.guarantee.summary} The risk sits with us, not with you — which is exactly why we're honest with you about value from the very first appraisal.`,
  },
  {
    q: "What marketing is included?",
    a: "Professional property photography, free aerial photography, premium placement across the major online property portals, signage, and Team Toner social and video marketing — plus your own seller dashboard to track it all in real time.",
  },
  {
    q: "Which method of sale should I choose?",
    a: "It depends on your property, your timeframe and the current level of buyer demand. We'll talk you through auction, deadline sale, price by negotiation and asking price, and recommend the approach the evidence supports for your home.",
  },
  {
    q: "How should I prepare my home for sale?",
    a: "Presentation matters more than most sellers expect, and the highest-impact work is usually the least expensive — decluttering, a deep clean, tidy grounds and small repairs. We'll walk through your property with you and prioritise what's genuinely worth doing.",
  },
  {
    q: "What happens if my property doesn't sell?",
    a: `We review what the market told us — enquiry numbers, viewings, feedback and buyer objections — and adjust the strategy with you. Because of ${siteConfig.guarantee.name}, we're just as motivated as you are to get it right.`,
  },
  {
    q: "What happens once an offer is accepted?",
    a: "We stay involved right through to settlement: managing conditions, chasing builders' reports and finance dates, keeping your solicitor informed and making sure nothing stalls.",
  },
  {
    q: "What areas do you cover?",
    a: `We sell throughout ${siteConfig.contact.region}, including the Palmerston North suburbs of Hokowhitu, Kelvin Grove, Terrace End, Roslyn, West End, Awapuni, Milson and Summerhill / Fitzherbert.`,
  },
];

export default async function SellPage() {
  const siteConfig = await getSiteConfig();
  const faqs = buildFaqs(siteConfig);
  return (
    <>
      <FaqJsonLd faqs={faqs} />

      <PageHeader
        eyebrow="Sell smarter"
        title="Sell your home with confidence"
        description="Proven results. Premium marketing. Two agents working for you — for a smarter fee."
      >
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          With Team Toner, you don&rsquo;t have to choose between great service
          and a fair commission. Allan &amp; Karen personally work together
          throughout your sale, backed by premium marketing, proven local
          results and Arizto&rsquo;s nationwide reach.
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
          <SectionHeading eyebrow="How it works" title="The selling process" />
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
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
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
