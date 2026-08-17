import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getAreas, getSuburbChildren, getSuburbs } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.suburbs },
  description:
    "Local knowledge across Palmerston North and the Manawatū — Hokowhitu, Kelvin Grove, Terrace End, Roslyn, West End, Awapuni, Milson, Feilding and Ashhurst.",
  alternates: { canonical: "/suburbs" },
};

export default function SuburbsPage() {
  const areas = getAreas();
  const pnSuburbs = getSuburbChildren("palmerston-north");

  return (
    <>
      <ItemListJsonLd
        name="Areas and suburbs served by Team Toner"
        description="Palmerston North and wider Manawatū suburbs where Allan & Karen Toner sell."
        items={getSuburbs().map((s) => ({
          name: s.name,
          path: `/suburbs/${s.slug}`,
        }))}
      />

      <PageHeader
        eyebrow="Local experts"
        title="Local real estate knowledge across Palmerston North & Manawatū"
        description="From Hokowhitu and Kelvin Grove to Feilding, Ashhurst and the wider Manawatū, we understand the local property markets we sell in — the homes, the buyers and what makes each area different."
      >
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Explore our local areas, current properties and recent Team Toner
          sales.
        </p>
      </PageHeader>

      {/* Four area cards — retained per the client brief. */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {areas.map((s) => (
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

      {/* Individual Palmerston North suburbs — each its own indexable page. */}
      {pnSuburbs.length > 0 && (
        <Section className="bg-secondary/50">
          <Container>
            <SectionHeading
              eyebrow="Palmerston North"
              title="Explore Palmerston North suburbs"
              description="Local information, current listings, recent Team Toner sales and market commentary for the suburbs we sell in most."
            />
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {pnSuburbs.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/suburbs/${s.slug}`}
                    className="group flex h-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-teal hover:bg-background"
                  >
                    <span className="font-semibold text-foreground group-hover:text-primary">
                      {s.name}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
