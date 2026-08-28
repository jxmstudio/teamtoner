import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { TestimonialCard } from "@/components/brand/testimonial-card";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { FeeText } from "@/components/brand/commission";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fitTitle, siteConfig } from "@/lib/site";
import {
  getSuburbs,
  getSuburbBySlug,
  getSuburbChildren,
  getListingsBySuburb,
  getSoldBySuburb,
  getFeaturedTestimonials,
} from "@/lib/data";

/**
 * Per-suburb FAQs. Every answer is drawn from facts already published
 * elsewhere on the site — nothing here asserts market data we don't hold.
 * These drive FAQPage markup, which is what makes a suburb page eligible for
 * People Also Ask and AI answer citations rather than just a listings grid.
 */
function suburbFaqs(suburbName: string) {
  const { agents, contact, stats, guarantee } = siteConfig;
  return [
    {
      q: `Do Team Toner sell houses in ${suburbName}?`,
      a: `Yes. Allan & Karen Toner sell throughout ${contact.region}, including ${suburbName}. You get two experienced agents personally working on your sale rather than one agent and an assistant.`,
    },
    {
      q: `What does it cost to sell a house in ${suburbName}?`,
      a: `Team Toner charge a ${stats.commission} commission on the sale price, with no upfront costs. Under ${guarantee.name} you only pay when your property sells. T's and C's apply.`,
    },
    {
      q: `How do I get a free property appraisal in ${suburbName}?`,
      a: `Book online, or call Allan on ${agents.allan.phone} or Karen on ${agents.karen.phone}. The appraisal is free, based on recent comparable sales near your property, and carries no obligation to list.`,
    },
    {
      q: `What marketing is included when selling in ${suburbName}?`,
      a: `Professional property photography, free aerial photography, premium placement across the major online property portals, signage, and Team Toner social and video marketing — with no upfront cost to you.`,
    },
  ];
}

// Suburb pages list CMS-managed listings — refresh them periodically.
export const revalidate = 60;

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
    title: {
      absolute: fitTitle([
        `${suburb.name} Real Estate | Team Toner ${scope}`,
        `${suburb.name} Real Estate | Team Toner`,
        `${suburb.name} Real Estate`,
      ]),
    },
    description: `${suburb.name} property market insight, current listings and recent Team Toner sales. Get a free appraisal with Allan & Karen Toner.`,
    alternates: { canonical: `/suburbs/${suburb.slug}` },
  };
}

export default async function SuburbPage(props: PageProps<"/suburbs/[slug]">) {
  const { slug } = await props.params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) notFound();

  const parent = suburb.parent ? getSuburbBySlug(suburb.parent) : undefined;
  const children = getSuburbChildren(suburb.slug);
  // Sibling suburbs — without these each suburb page is a dead end that only
  // links upward, so the local cluster gets no lateral link equity.
  const siblings = parent
    ? getSuburbChildren(parent.slug).filter((s) => s.slug !== suburb.slug)
    : [];
  const faqs = suburbFaqs(suburb.name);

  const listings = await getListingsBySuburb(slug);
  const sold = await getSoldBySuburb(slug);

  // Individual suburbs inherit their area's listings until the live feed
  // carries suburb-level data.
  const areaListings =
    listings.length === 0 && parent ? await getListingsBySuburb(parent.slug) : [];
  const areaSold = sold.length === 0 && parent ? await getSoldBySuburb(parent.slug) : [];

  const [testimonial] = getFeaturedTestimonials(1);

  return (
    <>
      <FaqJsonLd faqs={faqs} />

      <PageHeader
        eyebrow={parent ? `${parent.name} suburb` : "Local experts"}
        title={`${suburb.name} real estate`}
        description={suburb.blurb}
      />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Suburbs", path: "/suburbs" },
              ...(parent
                ? [{ name: parent.name, path: `/suburbs/${parent.slug}` }]
                : []),
              { name: suburb.name, path: `/suburbs/${suburb.slug}` },
            ]}
          />

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

          {/* Sibling suburbs — lateral links across the local cluster. */}
          {siblings.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground">
                Other {parent?.name} suburbs we sell in
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/suburbs/${sibling.slug}`}
                      className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
                    >
                      {sibling.name} real estate
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

      {/* Localised FAQs — the FAQPage markup above makes these eligible for
          People Also Ask and AI answer citations. */}
      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            Selling in {suburb.name} — common questions
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

      {/* Free appraisal CTA — site-wide banner copy, localised description. */}
      <CtaSection
        description={`Get an honest, evidence-based appraisal based on recent ${suburb.name} sales — from two agents who sell here.`}
      />
    </>
  );
}
