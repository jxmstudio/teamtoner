import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { CtaSection } from "@/components/brand/cta-section";
import { FeeText } from "@/components/brand/commission";
import { Container, Section } from "@/components/brand/primitives";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { seoTitles, siteConfig } from "@/lib/site";
import { formatListingAddress, getSoldListings, getSuburbName } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.sold },
  description:
    "Properties recently sold by Team Toner across Palmerston North, Feilding, Ashhurst and the wider Manawatū — proven results from the region's No.1 Arizto team.",
  alternates: { canonical: "/sold" },
};

export default function SoldPage() {
  const sold = getSoldListings();
  const { stats } = siteConfig;
  return (
    <>
      <ItemListJsonLd
        name="Recently sold by Team Toner"
        description="Properties recently sold by Team Toner across Palmerston North, Feilding, Ashhurst and the wider Manawatū."
        items={sold.map((l) => ({
          name: formatListingAddress(l.address, getSuburbName(l.suburb)),
          path: `/listings/${l.slug}`,
        }))}
      />

      <PageHeader
        eyebrow="Proven results"
        title="Recently sold by Team Toner"
        description="See some of the properties we've successfully sold across Palmerston North, Feilding, Ashhurst and the wider Manawatū."
      />

      {/* TODO(client): these are sample sales with stand-in photography.
          Real sold data and photography drop in via lib/content/listings.ts
          (or the live sold-data feed) with no layout change. */}
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

      <Section className="bg-secondary/50 py-12 sm:py-14 lg:py-16">
        <Container>
          <dl className="grid gap-8 text-center sm:grid-cols-2">
            <Stat value={stats.nationalRank} label="Arizto Agents Nationwide*" />
            <Stat value={stats.regionRank} label={`Arizto Team — ${stats.regionName}*`} />
          </dl>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label.replace("*", "")}</dt>
      <dd className="text-4xl font-bold text-primary sm:text-5xl">{value}</dd>
      <p className="mt-2 text-muted-foreground">
        <FeeText>{label}</FeeText>
      </p>
    </div>
  );
}
