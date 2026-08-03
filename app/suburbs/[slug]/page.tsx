import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import {
  getSuburbs,
  getSuburbBySlug,
  getListingsBySuburb,
} from "@/lib/data";

export function generateStaticParams() {
  return getSuburbs().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/suburbs/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return { title: "Suburb not found" };
  return {
    title: `${suburb.name} Real Estate`,
    description: suburb.blurb,
  };
}

export default async function SuburbPage(props: PageProps<"/suburbs/[slug]">) {
  const { slug } = await props.params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) notFound();

  const listings = getListingsBySuburb(slug);

  return (
    <>
      <PageHeader
        eyebrow="Suburb"
        title={`${suburb.name} real estate`}
        description={suburb.blurb}
      />
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Listings in {suburb.name}
            </h2>
            <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
              All listings
            </Link>
          </div>
          {listings.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted-foreground">
              No current listings in {suburb.name} right now — new properties are
              added regularly. Get in touch to be the first to know.
            </p>
          )}
        </Container>
      </Section>
      <CtaSection
        title={`Thinking of selling in ${suburb.name}?`}
        description="Book a free appraisal with the region's #1 team."
      />
    </>
  );
}
