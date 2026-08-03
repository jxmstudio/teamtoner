import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";
import { getSoldListings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recently Sold",
  description:
    "Recent sales by Team Toner across Palmerston North, Feilding, Ashhurst and the Manawatū. Results that speak for themselves.",
};

export default function SoldPage() {
  const sold = getSoldListings();
  return (
    <>
      <PageHeader
        eyebrow="Proven results"
        title="Recently sold"
        description={`Nobody sells more property than Team Toner. Ranked ${siteConfig.stats.nationalRank} of ${siteConfig.stats.agentPool} Arizto agents nationwide.`}
      />
      <Section>
        <Container>
          {sold.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sold.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Recent sales will appear here soon.
            </p>
          )}
        </Container>
      </Section>
      <CtaSection
        title="Curious what your home is worth?"
        description="Get a free, no-obligation appraisal from the region's top team."
      />
    </>
  );
}
