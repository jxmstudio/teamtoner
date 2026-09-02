import { Star } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { RankingClaim } from "@/components/brand/ranking-claim";
import { getFeaturedTestimonials } from "@/lib/data";

/**
 * Proven Results block — the ranking claim plus one strong five-star seller
 * testimonial. Used on the Sell page (before the FAQs) and reusable anywhere
 * the proof needs restating.
 */
export async function ProvenResults({
  className,
  showTestimonial = true,
}: {
  className?: string;
  showTestimonial?: boolean;
}) {
  const [testimonial] = await getFeaturedTestimonials(1);

  return (
    <Section className={className}>
      <Container>
        <SectionHeading
          eyebrow="Proven results"
          title="Results that back up the promise"
          description="Our smarter, technology-driven model allows us to deliver premium service and proven results, while keeping our fee fair — so you keep more of your hard-earned money in your pocket."
        />

        <RankingClaim className="mt-12 text-center" />

        {showTestimonial && testimonial ? (
          <figure className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div
              className="flex justify-center gap-0.5"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="mt-5 text-balance text-xl font-medium text-foreground sm:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {testimonial.author}
              </span>
              {testimonial.suburb ? ` · ${testimonial.suburb}` : ""} · via{" "}
              {testimonial.source}
            </figcaption>
          </figure>
        ) : null}
      </Container>
    </Section>
  );
}
