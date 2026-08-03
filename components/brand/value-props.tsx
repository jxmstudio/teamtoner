import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export function ValueProps() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Why Team Toner"
          title="The smarter way to sell your home"
          description="Everything you expect from a premium agency — for a fee that makes sense."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {siteConfig.sellingPoints.map((point) => (
            <Card key={point.title} className="border-border/70">
              <CardContent className="pt-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Check className="size-6" strokeWidth={3} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{point.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
