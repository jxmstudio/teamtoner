import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { LeadForm } from "@/components/forms/lead-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CommissionRate,
  FeeText,
  RankingAsterisk,
  TermsFootnote,
} from "@/components/brand/commission";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.appraisal },
  description:
    "What could your property sell for? Get a clear, evidence-based appraisal from Allan & Karen Toner — Palmerston North's No.1 Arizto team. No obligation.",
  alternates: { canonical: "/appraisal" },
};

const benefits = [
  "A free, no-obligation property appraisal",
  "An evidence-based assessment, backed by recent local sales",
  "Allan & Karen personally — two experienced agents, not one",
  "An honest discussion about price, buyer demand and current competition",
  "Advice on the best strategy and timing if you're considering selling",
  "Clear answers to your questions — with absolutely no pressure to list",
];

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

/**
 * Appraisal FAQs. The appraisal-versus-valuation answer is deliberately written
 * as a plain definition — that's the shape Google lifts into a featured snippet
 * and the AI answer engines quote.
 */
const faqs = [
  {
    q: "Is a Team Toner property appraisal really free?",
    a: "Yes. The appraisal is completely free and carries no obligation to list with us. There are also no upfront costs if you do decide to sell — with No Sale — No Fee, you only pay when your property sells. T's and C's apply.",
  },
  {
    q: "What is the difference between a property appraisal and a registered valuation?",
    a: "A property appraisal is a licensed salesperson's evidence-based estimate of what your property should sell for in the current market, based on recent comparable sales. It is free and used to guide your pricing and marketing decisions. A registered valuation is a formal, paid assessment carried out by a registered valuer, and is what a lender will usually ask for.",
  },
  {
    q: "What happens at a Team Toner appraisal?",
    a: "Allan and Karen both visit your property, discuss your plans and timeframe, then look at recent comparable sales, current competition and buyer demand. You get a realistic price range and the evidence behind it — not a number designed to win your listing.",
  },
  {
    q: "Do I have to list my property after getting an appraisal?",
    a: "No. There is no obligation and no pressure. Plenty of people get an appraisal a year or more before they sell, simply to understand where they stand.",
  },
];

export default async function AppraisalPage() {
  const { agents, contact, guarantee } = await getSiteConfig();

  return (
    <>
      <FaqJsonLd faqs={faqs} />

      <PageHeader
        compact
        eyebrow="Free appraisal"
        title="What Could Your Property Sell For in Today's Market?"
        description="Get a clear, evidence-based appraisal from Allan & Karen Toner — Team Toner, Palmerston North & Manawatū's No.1 Arizto team."
      >
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We&rsquo;ll personally assess your property, look at recent comparable
          sales, current competition and buyer demand, and give you
          straightforward advice on where your property sits in today&rsquo;s
          market.
        </p>
        <p className="mt-3 font-semibold text-foreground">
          No pressure. No obligation. Just experienced, honest advice.
        </p>
      </PageHeader>

      <Section className="py-10 sm:py-12 lg:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Form first on mobile so it's reachable without scrolling past the list. */}
            <div className="order-1 lg:order-2">
              <div className="rounded-xl border border-teal/30 bg-teal/10 px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
                  Local experience. Proven results.
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  No.1 Arizto Team — Palmerston North &amp; Manawatū
                  <RankingAsterisk />
                </p>
                <p className="font-semibold text-foreground">
                  #7 Arizto Agents Nationwide
                  <RankingAsterisk />
                </p>
              </div>

              <Card className="mt-6">
                <CardContent className="pt-6">
                  <LeadForm kind="appraisal" />
                </CardContent>
              </Card>
            </div>

            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-foreground">
                What you&rsquo;ll get
              </h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
                <h3 className="font-semibold text-foreground">
                  Thinking of selling?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We can also explain our premium marketing approach, No Upfront
                  Costs, and {guarantee.name} &mdash; along with our
                  competitive <CommissionRate /> commission.
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground">
                  <Phone className="size-4 text-teal" /> Prefer to talk?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Call{" "}
                  <a className="font-semibold text-primary hover:underline" href={tel(agents.allan.phone)}>
                    Allan {agents.allan.phone}
                  </a>{" "}
                  or{" "}
                  <a className="font-semibold text-primary hover:underline" href={tel(agents.karen.phone)}>
                    Karen {agents.karen.phone}
                  </a>
                </p>
                <p className="mt-1 text-muted-foreground">
                  Office{" "}
                  <a className="font-semibold text-primary hover:underline" href={tel(contact.office)}>
                    {contact.office}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footnote sits under everything, per the client's request. */}
          <TermsFootnote />
        </Container>
      </Section>

      <Section className="bg-secondary/50">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            Appraisal questions, answered
          </h2>
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
        </Container>
      </Section>
    </>
  );
}
