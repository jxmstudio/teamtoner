import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { LeadForm } from "@/components/forms/lead-form";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Appraisal",
  description:
    "Request a free, no-obligation market appraisal from Team Toner and find out what your Manawatū property is worth.",
};

const reasons = [
  "A free, no-obligation market appraisal",
  "Honest advice on your best method of sale",
  "A premium marketing plan tailored to your property",
  "2% +GST commission — no sale, no fee",
];

export default function AppraisalPage() {
  return (
    <>
      <PageHeader
        eyebrow="No obligation"
        title="Book a free appraisal"
        description="Thinking of selling? Find out what your home is worth. Fill in the form and Allan or Karen will be in touch."
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              What you'll get
            </h2>
            <ul className="mt-6 space-y-4">
              {reasons.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5 text-sm text-muted-foreground">
              Prefer to talk? Call{" "}
              <a
                className="font-semibold text-primary"
                href={`tel:${siteConfig.agents.allan.phone.replace(/\s/g, "")}`}
              >
                {siteConfig.agents.allan.name} on {siteConfig.agents.allan.phone}
              </a>{" "}
              or{" "}
              <a
                className="font-semibold text-primary"
                href={`tel:${siteConfig.agents.karen.phone.replace(/\s/g, "")}`}
              >
                {siteConfig.agents.karen.name} on {siteConfig.agents.karen.phone}
              </a>
              .
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              <LeadForm kind="appraisal" />
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
