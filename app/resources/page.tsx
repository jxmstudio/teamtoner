import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getGuides, getResourcesCopy } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.resources },
  description:
    "Free property selling guides from Team Toner — practical advice to help Palmerston North and Manawatū homeowners prepare, sell and move with confidence.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  // Guides with neither a PDF nor a content page stay hidden (client brief,
  // Aug 2026) — no "coming soon" placeholders. They reappear automatically
  // once a PDF path is set in the CMS or fixtures.
  const guides = (await getGuides()).filter((g) => g.pdf || g.body?.length);
  const copy = await getResourcesCopy();
  return (
    <>
      <ItemListJsonLd
        name="Free property selling guides"
        description="Team Toner's free guides for Palmerston North and Manawatū homeowners."
        items={guides.map((g) => ({
          name: g.title,
          path: g.body?.length ? `/resources/${g.slug}` : "/resources",
        }))}
      />

      <PageHeader
        eyebrow={copy.headerEyebrow}
        title={copy.headerTitle}
        description={copy.headerDescription}
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => {
              const available = Boolean(guide.pdf);
              const hasPage = Boolean(guide.body?.length);
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
                        {!available && !hasPage && (
                          <Badge variant="secondary" className="text-xs">
                            Coming soon
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {hasPage && (
                          <Link
                            href={`/resources/${guide.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                          >
                            <BookOpen className="size-4" /> Read the guide
                          </Link>
                        )}
                        {(available || !hasPage) && (
                          <Wrapper
                            {...(available
                              ? { href: guide.pdf, target: "_blank", rel: "noopener" }
                              : {})}
                            className={
                              available
                                ? "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                : "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
                            }
                          >
                            <Download className="size-4" />
                            {available ? "Download PDF" : "PDF available soon"}
                          </Wrapper>
                        )}
                      </div>
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
