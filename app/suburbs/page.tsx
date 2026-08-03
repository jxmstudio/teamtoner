import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { getSuburbs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Suburbs",
  description:
    "Local real estate expertise across Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
};

export default function SuburbsPage() {
  const suburbs = getSuburbs();
  return (
    <>
      <PageHeader
        eyebrow="Local experts"
        title="Areas we know inside out"
        description="Deep local knowledge across the Manawatū — the difference between a good result and a great one."
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {suburbs.map((s) => (
              <Card key={s.slug} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col pt-6">
                  <h2 className="text-2xl font-bold text-foreground">{s.name}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{s.blurb}</p>
                  <Link
                    href={`/suburbs/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                  >
                    Explore {s.name} <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
