import { Star } from "lucide-react";
import { FeeText } from "@/components/brand/commission";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { getSiteConfig } from "@/lib/data";
import { getFeaturedTestimonials } from "@/lib/data";

/**
 * Proven Results block — the #7 / No.1 ranking figures plus one strong five-star
 * seller testimonial. Used on the Sell page (before the FAQs) and reusable
 * anywhere the proof needs restating.
 */
export async function ProvenResults({
  className,
  showTestimonial = true,
}: {
  className?: string;
  showTestimonial?: boolean;
}) {
  const { stats } = await getSiteConfig();
  const [testimonial] = await getFeaturedTestimonials(1);

  return (
    <Section className={className}>
      <Container>
        <SectionHeading
          eyebrow="Proven results"
          title="Results that back up the promise"
          description="Our smarter, technology-driven model allows us to deliver premium service and proven results, while keeping our fee fair — so you keep more of your hard-earned money in your pocket."
        />

        <dl className="mt-12 grid gap-8 text-center sm:grid-cols-2">
          <Stat value={stats.nationalRank} label="Arizto Agents Nationwide*" />
          <Stat
            value={stats.regionRank}
            label={`Arizto Team — ${stats.regionName}*`}
          />
        </dl>

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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label.replace("*", "")}</dt>
      <dd className="text-5xl font-bold text-primary">{value}</dd>
      <p className="mt-2 text-muted-foreground">
        <FeeText>{label}</FeeText>
      </p>
    </div>
  );
}
