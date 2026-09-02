import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/brand/home-hero";
import { AgentCards } from "@/components/brand/agent-cards";
import { ValueProps } from "@/components/brand/value-props";
import { CtaSection } from "@/components/brand/cta-section";
import { FeaturedListingCard } from "@/components/brand/featured-listing-card";
import { cn } from "@/lib/utils";
import { TestimonialCarousel } from "@/components/brand/testimonial-carousel";
import { FeeText } from "@/components/brand/commission";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { seoTitles } from "@/lib/site";
import { VideoEmbed } from "@/components/brand/video-embed";
import { VideoObjectJsonLd } from "@/components/seo/json-ld";
import {
  getAreas,
  getFeaturedListings,
  getFeaturedTestimonials,
  getHomeCopy,
  getSiteVideos,
  getSuburbs,
} from "@/lib/data";

// Listings and videos are CMS-managed — refresh the static page periodically.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: seoTitles.home },
  // Kept under 160 characters so Google shows it whole rather than truncating.
  description:
    "Palmerston North real estate agents Allan & Karen Toner — Arizto's No.1 agents in Palmerston North & Manawatū. Get a free appraisal.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featured = await getFeaturedListings(3);
  const videos = await getSiteVideos();
  const reviews = await getFeaturedTestimonials(3);
  const areas = await getAreas();
  const localities = (await getSuburbs()).filter((s) => s.parent);
  const copy = await getHomeCopy();
  return (
    <>
      <HomeHero />
      <ValueProps />

      {/* Featured listings — ahead of the story sections. Property is what most
          home-page visitors arrived for, and it's the strongest internal link
          target on the page. Full-bleed photo cards in an editorial grid: the
          lead listing gets a double-width cell, so its photo runs roughly four
          times the size the old uniform grid allowed. */}
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
            <div className="mt-10 grid auto-rows-fr gap-5 lg:grid-cols-3 lg:grid-rows-2">
              {featured.map((listing, i) => (
                <div
                  key={listing.slug}
                  className={cn(
                    "grid",
                    i === 0 && "lg:col-span-2 lg:row-span-2 lg:min-h-[34rem]"
                  )}
                >
                  <FeaturedListingCard listing={listing} hero={i === 0} />
                </div>
              ))}
            </div>
            <ButtonLink
              href="/listings"
              variant="outline"
              className="mt-6 h-11 w-full sm:hidden"
            >
              View All Properties
            </ButtonLink>
          </Container>
        </Section>
      )}

      {/* Recognition */}
      {/* TODO(client): the recognition graphic still reads "TOP 10 NATIONWIDE
          / #7 NATIONWIDE ARIZTO AGENTS / OUT OF 350+ AGENTS" — a claim the
          31 Aug 2026 amendment retired from the copy and from the ranking
          terms. Needs replacement artwork from Allan & Karen leading with
          "Arizto's No.1 agents — Palmerston North & Manawatū"; the alt text
          describes what is currently in the image and should change with it. */}
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

      {/* Meet Allan & Karen (launch brief §5) — their individual portraits, so
          the two-agent proposition is shown rather than just stated. */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
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
          <AgentCards />
        </Container>
      </Section>

      {/* Videos — managed in /studio; the section is hidden while there are none. */}
      {videos.length > 0 && (
        <Section className="bg-secondary/60">
          <Container>
            <VideoObjectJsonLd video={videos[0]} />
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

          {/* Every suburb and town page, linked from the home page. The four
              area cards alone left the individual location pages two clicks
              deep with no link from the site's strongest page. */}
          {localities.length > 0 && (
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {localities.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/suburbs/${s.slug}`}
                    className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
