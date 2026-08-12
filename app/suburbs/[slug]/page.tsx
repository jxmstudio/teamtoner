import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { TestimonialCard } from "@/components/brand/testimonial-card";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  getSuburbs,
  getSuburbBySlug,
  getSuburbChildren,
  getListingsBySuburb,
  getSoldBySuburb,
  getFeaturedTestimonials,
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

  const parent = suburb.parent ? getSuburbBySlug(suburb.parent) : undefined;
  const scope = parent ? `${parent.name}` : "Manawatū";

  return {
    title: { absolute: `${suburb.name} Real Estate | Team Toner ${scope}` },
    description: `${suburb.name} property market insight, current listings and recent Team Toner sales. Book a free, evidence-based appraisal with Allan & Karen Toner.`,
    alternates: { canonical: `/suburbs/${suburb.slug}` },
  };
}

export default async function SuburbPage(props: PageProps<"/suburbs/[slug]">) {
  const { slug } = await props.params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) notFound();

  const parent = suburb.parent ? getSuburbBySlug(suburb.parent) : undefined;
  const children = getSuburbChildren(suburb.slug);

  const listings = getListingsBySuburb(slug);
  const sold = getSoldBySuburb(slug);

  // Individual suburbs inherit their area's listings until the live feed
  // carries suburb-level data.
  const areaListings =
    listings.length === 0 && parent ? getListingsBySuburb(parent.slug) : [];
  const areaSold = sold.length === 0 && parent ? getSoldBySuburb(parent.slug) : [];

  const [testimonial] = getFeaturedTestimonials(1);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Suburbs", path: "/suburbs" },
          ...(parent ? [{ name: parent.name, path: `/suburbs/${parent.slug}` }] : []),
          { name: suburb.name, path: `/suburbs/${suburb.slug}` },
        ]}
      />

      <PageHeader
        eyebrow={parent ? `${parent.name} suburb` : "Local experts"}
        title={`${suburb.name} real estate`}
        description={suburb.blurb}
      />

      <Section>
        <Container>
          <Link
            href="/suburbs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> All areas
          </Link>

          {/* Market commentary */}
          {suburb.commentary?.length ? (
            <div className="mt-8 max-w-3xl space-y-4 text-lg text-foreground/90">
              <h2 className="text-2xl font-bold text-foreground">
                The {suburb.name} market
              </h2>
              {suburb.commentary.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {/* Suburbs within this area */}
          {children.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground">
                {suburb.name} suburbs
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`/suburbs/${child.slug}`}
                      className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {/* Current listings */}
      <Section className="bg-secondary/50">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              {listings.length > 0 || areaListings.length === 0
                ? `Listings in ${suburb.name}`
                : `Current listings in ${parent?.name}`}
            </h2>
            <Link href="/listings" className="text-sm font-medium text-primary hover:underline">
              All listings
            </Link>
          </div>

          {listings.length > 0 || areaListings.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(listings.length > 0 ? listings : areaListings).map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted-foreground">
              No current listings in {suburb.name} right now — new properties are
              added regularly.{" "}
              <Link href="/contact" className="text-primary underline">
                Get in touch
              </Link>{" "}
              to be the first to know.
            </p>
          )}
        </Container>
      </Section>

      {/* Recent Team Toner sales */}
      {(sold.length > 0 || areaSold.length > 0) && (
        <Section>
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">
                Recent Team Toner sales{" "}
                {sold.length > 0 ? `in ${suburb.name}` : `in ${parent?.name}`}
              </h2>
              <Link href="/sold" className="text-sm font-medium text-primary hover:underline">
                All recent sales
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(sold.length > 0 ? sold : areaSold).map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonial */}
      {testimonial && (
        <Section className="bg-secondary/50 py-12 sm:py-14 lg:py-16">
          <Container className="max-w-3xl">
            <TestimonialCard testimonial={testimonial} />
          </Container>
        </Section>
      )}

      {/* Free appraisal CTA — site-wide banner copy, localised description. */}
      <CtaSection
        description={`Get an honest, evidence-based appraisal based on recent ${suburb.name} sales — from two agents who sell here.`}
      />
    </>
  );
}
