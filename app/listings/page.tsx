import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/brand/page-header";
import { ListingCard } from "@/components/brand/listing-card";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { ItemListJsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";
import { seoTitles } from "@/lib/site";
import { formatListingAddress, getListings, getAreas, getSuburbName } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.listings },
  description:
    "Current homes for sale with Team Toner across Palmerston North, Feilding, Ashhurst and the wider Manawatū. New properties added regularly.",
  alternates: { canonical: "/listings" },
};

// Listings are CMS-managed — refresh the static page periodically.
export const revalidate = 60;

export default async function ListingsPage(props: PageProps<"/listings">) {
  const { suburb } = await props.searchParams;
  const selected = typeof suburb === "string" ? suburb : undefined;

  const all = await getListings();
  const listings = selected ? all.filter((l) => l.suburb === selected) : all;
  const suburbs = getAreas();

  return (
    <>
      <ItemListJsonLd
        name="Homes for sale — Team Toner"
        description="Current Team Toner listings across Palmerston North, Feilding, Ashhurst and the wider Manawatū."
        items={listings.map((l) => ({
          name: formatListingAddress(l.address, getSuburbName(l.suburb)),
          path: `/listings/${l.slug}`,
        }))}
      />

      <PageHeader
        eyebrow="Current listings"
        title="Homes for sale"
        description="Browse our current listings across the Manawatū. New properties are added regularly."
      />

      <Section>
        <Container>
          {/* Suburb filter */}
          <div className="flex flex-wrap gap-2">
            <FilterChip href="/listings" active={!selected}>
              All
            </FilterChip>
            {suburbs.map((s) => (
              <FilterChip
                key={s.slug}
                href={`/listings?suburb=${s.slug}`}
                active={selected === s.slug}
              >
                {s.name}
              </FilterChip>
            ))}
          </div>

          {listings.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-muted-foreground">
              No current listings in this area. Please check back soon or{" "}
              <Link href="/contact" className="text-primary underline">
                get in touch
              </Link>
              .
            </p>
          )}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground/70 hover:border-teal hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
}
