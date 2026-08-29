import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import type { Suburb } from "@/lib/content/types";
import { getAreas, getSuburbChildren, getSuburbs, getSuburbsCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.suburbs },
  description:
    "Local knowledge across Palmerston North and the Manawatū — Hokowhitu, Takaro, Highbury, Kelvin Grove, Terrace End, Awapuni, Milson, Feilding, Ashhurst, Sanson and more.",
  alternates: { canonical: "/suburbs" },
};

export default async function SuburbsPage() {
  const areas = await getAreas();
  const pnSuburbs = await getSuburbChildren("palmerston-north");
  const manawatuTowns = await getSuburbChildren("manawatu");
  const allSuburbs = await getSuburbs();
  const copy = await getSuburbsCopy();

  return (
    <>
      <ItemListJsonLd
        name="Areas and suburbs served by Team Toner"
        description="Palmerston North and wider Manawatū suburbs where Allan & Karen Toner sell."
        items={allSuburbs.map((s) => ({
          name: s.name,
          path: `/suburbs/${s.slug}`,
        }))}
      />

      <PageHeader
        eyebrow={copy.headerEyebrow}
        title={copy.headerTitle}
        description={copy.headerDescription}
      >
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {copy.intro}
        </p>
      </PageHeader>

      {/* Four area cards — retained per the client brief. */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Whole card is the link (brief §9 — "clearly useful and clickable"). */}
            {areas.map((s) => (
              <Link key={s.slug} href={`/suburbs/${s.slug}`} className="group flex">
                <Card className="flex flex-1 flex-col transition-colors group-hover:border-teal">
                  <CardContent className="flex flex-1 flex-col pt-6">
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary">
                      {s.name}
                    </h2>
                    <p className="mt-3 flex-1 text-muted-foreground">{s.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary transition-all group-hover:gap-3">
                      Local market insights &amp; properties{" "}
                      <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Individual suburbs and towns — each its own indexable page. */}
      <SuburbCluster
        suburbs={pnSuburbs}
        eyebrow={copy.pnEyebrow}
        title={copy.pnTitle}
        description={copy.pnDescription}
        className="bg-secondary/50"
      />
      <SuburbCluster
        suburbs={manawatuTowns}
        eyebrow={copy.manawatuEyebrow}
        title={copy.manawatuTitle}
        description={copy.manawatuDescription}
      />

      <CtaSection />
    </>
  );
}

function SuburbCluster({
  suburbs,
  eyebrow,
  title,
  description,
  className,
}: {
  suburbs: Suburb[];
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  if (suburbs.length === 0) return null;
  return (
    <Section className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {suburbs.map((s) => (
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
  );
}
