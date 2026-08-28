import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/brand/home-hero";
import { ValueProps } from "@/components/brand/value-props";
import { CtaSection } from "@/components/brand/cta-section";
import { ListingCard } from "@/components/brand/listing-card";
import { TestimonialCarousel } from "@/components/brand/testimonial-carousel";
import { FeeText } from "@/components/brand/commission";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { seoTitles } from "@/lib/site";
import { VideoEmbed } from "@/components/brand/video-embed";
import {
  getAreas,
  getFeaturedListings,
  getFeaturedTestimonials,
  getHomeCopy,
  getSiteVideos,
} from "@/lib/data";

// Listings and videos are CMS-managed — refresh the static page periodically.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: seoTitles.home },
  // Kept under 160 characters so Google shows it whole rather than truncating.
  description:
    "Palmerston North real estate agents Allan & Karen Toner — ranked #7 Arizto agents nationwide and No.1 in the Manawatū. Get a free appraisal.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featured = await getFeaturedListings(3);
  const videos = await getSiteVideos();
  const reviews = await getFeaturedTestimonials(3);
  const areas = await getAreas();
  const copy = await getHomeCopy();
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
              eyebrow={copy.recognitionEyebrow}
              title={copy.recognitionTitle}
              description={<FeeText>{copy.recognitionDescription}</FeeText>}
            />
          </div>
        </Container>
      </Section>

      {/* Meet Allan & Karen (launch brief §5) — official supplied photo only. */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-[2fr_3fr]">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-border lg:mx-0">
            <Image
              src="/team/allan-karen.jpg"
              alt="Allan and Karen Toner — Team Toner, Arizto real estate agents in Palmerston North"
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow={copy.meetEyebrow}
              title={copy.meetTitle}
              description={copy.meetDescription}
            />
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
            >
              Meet Team Toner <ArrowRight className="size-4" />
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
                eyebrow={copy.featuredEyebrow}
                title={copy.featuredTitle}
              />
              <ButtonLink
                href="/listings"
                variant="outline"
                className="hidden h-10 shrink-0 px-4 sm:inline-flex"
              >
                View All Properties
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

      {/* Videos — managed in /studio; the section is hidden while there are none. */}
      {videos.length > 0 && (
        <Section className="bg-secondary/60">
          <Container>
            <SectionHeading
              eyebrow="Watch"
              title={videos[0].title}
              description={videos[0].caption}
            />
            <VideoEmbed
              url={videos[0].url}
              title={videos[0].title}
              className="mx-auto mt-10 max-w-3xl"
            />
          </Container>
        </Section>
      )}

      {/* Testimonials */}
      {reviews.length > 0 && (
        <Section className="bg-secondary/60">
          <Container>
            <SectionHeading
              eyebrow={copy.testimonialsEyebrow}
              title={copy.testimonialsTitle}
              description={copy.testimonialsDescription}
            />
            <TestimonialCarousel className="mt-10" testimonials={reviews} />
          </Container>
        </Section>
      )}

      {/* Suburbs strip */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={copy.suburbsEyebrow}
            title={copy.suburbsTitle}
            description={copy.suburbsDescription}
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {areas.map((s) => (
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
