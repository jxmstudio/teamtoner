import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bed, Bath, Car, Check, MapPin } from "lucide-react";
import { fitTitle } from "@/lib/site";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { ListingGallery } from "@/components/brand/listing-gallery";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { ListingJsonLd } from "@/components/seo/json-ld";
import {
  formatListingAddress,
  getAllListingSlugs,
  getListingBySlug,
  getSuburbName,
} from "@/lib/data";

// Sold listings are prerendered too — they stay indexable and are linked from
// /sold and the suburb pages.
export function generateStaticParams() {
  return getAllListingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/listings/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };

  const suburbName = getSuburbName(listing.suburb);
  const sold = listing.status === "sold";
  const full = formatListingAddress(listing.address, suburbName);
  // "Sold by Team Toner" already names the brand, so the usual "| Team Toner"
  // suffix duplicated it. Addresses also vary a lot in length, so drop the
  // brand rather than let Google truncate the street address.
  const title = fitTitle(
    sold
      ? [`${full} — Sold by Team Toner`, `${full} — Sold | Team Toner`, `${full} — Sold`]
      : [`${full} — For Sale | Team Toner`, `${full} — For Sale`]
  );

  // Listing blurbs run short; pad to a useful SERP length with the concrete
  // details a buyer scans for rather than leaving a 70-character description.
  const spec =
    listing.beds > 0 || listing.baths > 0 || listing.parking > 0
      ? `${listing.beds} bed, ${listing.baths} bath, ${listing.parking} car. ${listing.priceDisplay}.`
      : `${listing.priceDisplay}.`;
  const description = [listing.description[0], spec]
    .filter(Boolean)
    .join(" ")
    .slice(0, 158);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      type: "website",
      title: full,
      description,
      images: listing.images.length ? listing.images : undefined,
    },
  };
}

export default async function ListingPage(props: PageProps<"/listings/[slug]">) {
  const { slug } = await props.params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const suburbName = getSuburbName(listing.suburb);
  const sold = listing.status === "sold";

  return (
    <>
      <ListingJsonLd listing={listing} suburbName={suburbName} />

      <PageHeader
        eyebrow={
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />{" "}
            <Link href={`/suburbs/${listing.suburb}`} className="hover:underline">
              {suburbName}
            </Link>
          </span>
        }
        title={listing.address}
      >
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Badge
            className={
              sold
                ? "bg-night text-white"
                : listing.status === "under-offer"
                  ? "bg-gold text-night"
                  : "bg-teal text-teal-foreground"
            }
          >
            {sold ? "Sold" : listing.status === "under-offer" ? "Under Offer" : "For Sale"}
          </Badge>
          <p className="text-xl font-bold text-primary">
            {sold ? (listing.soldPrice ?? "Sold") : listing.priceDisplay}
          </p>
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              {
                name: sold ? "Recently sold" : "Listings",
                path: sold ? "/sold" : "/listings",
              },
              { name: suburbName, path: `/suburbs/${listing.suburb}` },
              { name: listing.address, path: `/listings/${listing.slug}` },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ListingGallery
                images={listing.images}
                alt={`${listing.address}, ${suburbName} — ${listing.beds > 0 ? `${listing.beds} bedroom home` : "property"} ${sold ? "sold" : "for sale"} with Team Toner`}
              />

              {/* Bare-land listings have no bed/bath/car counts — skip the row. */}
              {(listing.beds > 0 || listing.baths > 0 || listing.parking > 0) && (
                <div className="mt-6 flex flex-wrap gap-6 border-y border-border py-5 text-foreground">
                  <Spec icon={<Bed className="size-5" />} value={listing.beds} label="Beds" />
                  <Spec icon={<Bath className="size-5" />} value={listing.baths} label="Baths" />
                  <Spec icon={<Car className="size-5" />} value={listing.parking} label="Parking" />
                </div>
              )}

              <div className="mt-8 space-y-4 text-lg text-foreground/90">
                {listing.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {listing.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-foreground">Features</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {listing.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-teal" strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    {sold ? "Sold something similar?" : "Enquire about this property"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sold
                      ? "Ask us what your home could achieve."
                      : "Send a message and we'll get straight back to you."}
                  </p>
                  <div className="mt-5">
                    <LeadForm
                      kind="enquiry"
                      listing={`${listing.address}, ${suburbName}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Spec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-teal">{icon}</span>
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
