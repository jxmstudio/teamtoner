import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { FeeText } from "@/components/brand/commission";
import { getSiteConfig } from "@/lib/data";

type Point = { title: string; detail: string };

/**
 * The four "Why Team Toner" benefit cards. Home and Sell use the same four
 * pillars with slightly different supporting lines — pass `points` to override.
 */
export async function ValueProps({
  points,
  eyebrow = "Why Team Toner",
  title = "Two agents. Premium marketing. A smarter fee.",
  description = "Everything you'd expect from a top-performing agency — and two experienced agents personally invested in your result.",
  className,
}: {
  points?: readonly Point[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  const resolved = points ?? (await getSiteConfig()).sellingPoints;
  return (
    <Section className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resolved.map((point) => (
            <Card key={point.title} className="border-border/70">
              <CardContent className="pt-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Check className="size-6" strokeWidth={3} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  <FeeText>{point.detail}</FeeText>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
