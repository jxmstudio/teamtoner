import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGuides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Seller Resources & Guides",
  description:
    "Free downloadable guides from Team Toner to help you prepare, price and sell your home with confidence.",
};

export default function ResourcesPage() {
  const guides = getGuides();
  return (
    <>
      <PageHeader
        eyebrow="Free downloads"
        title="Guides & resources"
        description="Practical, no-nonsense guides to help you sell your home for the best possible price."
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => {
              const available = Boolean(guide.pdf);
              const Wrapper = available ? "a" : "div";
              return (
                <Card key={guide.slug} className="h-full">
                  <CardContent className="flex h-full items-start gap-4 pt-6">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                      <FileText className="size-6" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-foreground">
                          {guide.title}
                        </h2>
                        {!available && (
                          <Badge variant="secondary" className="text-xs">
                            Coming soon
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                      <Wrapper
                        {...(available
                          ? { href: guide.pdf, target: "_blank", rel: "noopener" }
                          : {})}
                        className={
                          available
                            ? "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                            : "mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
                        }
                      >
                        <Download className="size-4" />
                        {available ? "Download PDF" : "Available soon"}
                      </Wrapper>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
