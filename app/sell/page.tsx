import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { ValueProps } from "@/components/brand/value-props";
import { MarketingGallery } from "@/components/brand/marketing-gallery";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell with Team Toner",
  description:
    "Why pay more when you can get the same result for less? Sell with Team Toner — 2% +GST commission, premium marketing, no sale no fee.",
};

const steps = [
  {
    title: "Free appraisal",
    detail: "We visit your home and give you an honest, evidence-based market appraisal.",
  },
  {
    title: "Tailored plan",
    detail: "We agree the right method of sale and a premium marketing plan for your property.",
  },
  {
    title: "Premium marketing",
    detail: "Professional photography, online, print and social — your home seen by the right buyers.",
  },
  {
    title: "Negotiate & sell",
    detail: "We manage enquiries, viewings and negotiation to secure you the best possible price.",
  },
];

const faqs = [
  {
    q: "How much is your commission?",
    a: `${siteConfig.stats.commission} — a smarter fee than the traditional model, with no upfront costs and no sale, no fee.`,
  },
  {
    q: "What does 'no sale, no fee' mean?",
    a: "You don't pay our commission unless your property sells. There's no risk in listing with us.",
  },
  {
    q: "Do I still get full marketing?",
    a: "Absolutely. You get the complete premium marketing package buyers expect — photography, online portals, print and social media.",
  },
  {
    q: "What areas do you cover?",
    a: `We service ${siteConfig.contact.region}.`,
  },
];

export default function SellPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sell smarter"
        title="Sell with Team Toner and save"
        description="Why pay more when you can get the same result for less? Choose the smarter real estate option."
      />

      <ValueProps />

      <Section className="bg-secondary/50">
        <Container>
          <SectionHeading eyebrow="How it works" title="A simple, proven process" />
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
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
