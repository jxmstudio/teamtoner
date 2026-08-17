import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/brand/home-hero";
import { ValueProps } from "@/components/brand/value-props";
import { CtaSection } from "@/components/brand/cta-section";
import { ListingCard } from "@/components/brand/listing-card";
import { TestimonialCarousel } from "@/components/brand/testimonial-carousel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { seoTitles, siteConfig } from "@/lib/site";
import { getAreas, getFeaturedListings, getFeaturedTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.home },
  // Kept under 160 characters so Google shows it whole rather than truncating.
  description:
    "Palmerston North real estate agents Allan & Karen Toner — ranked #7 of 350+ Arizto agents nationwide and #1 in the Manawatū. Book a free appraisal.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedListings(3);
  const reviews = getFeaturedTestimonials(3);
  return (
    <>
      <HomeHero />
      <ValueProps />

      {/* Recognition */}
      <Section className="bg-secondary/60">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
            <Image
              src="/brand/top-10-nationwide.jpg"
              alt="Team Toner recognised in the top 10 Arizto agents nationwide"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Proven results"
              title="Proud to be recognised"
              description={`Ranked ${siteConfig.stats.nationalRank} of ${siteConfig.stats.agentPool} Arizto agents across New Zealand, and ${siteConfig.stats.regionRank} in ${siteConfig.stats.regionName}. When you list with Team Toner, you get two experienced agents personally working on your sale.`}
            />
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
            >
              Meet Allan &amp; Karen <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <Section>
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                align="left"
                eyebrow="Current listings"
                title="Featured properties"
              />
              <ButtonLink
                href="/listings"
                variant="outline"
                className="hidden h-10 shrink-0 px-4 sm:inline-flex"
              >
                View all
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonials */}
      {reviews.length > 0 && (
        <Section className="bg-secondary/60">
          <Container>
            <SectionHeading
              eyebrow="What our clients say"
              title="Trusted across the Manawatū"
              description="Real feedback from families who've sold with Team Toner."
            />
            <TestimonialCarousel className="mt-10" testimonials={reviews} />
          </Container>
        </Section>
      )}

      {/* Suburbs strip */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Local experts"
            title="Suburbs we know inside out"
            description="Deep local knowledge across Palmerston North and the wider Manawatū."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {getAreas().map((s) => (
              <Link
                key={s.slug}
                href={`/suburbs/${s.slug}`}
                className="group rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-teal hover:bg-secondary/50"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
