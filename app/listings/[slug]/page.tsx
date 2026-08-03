import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bed, Bath, Car, Check, MapPin } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { ListingGallery } from "@/components/brand/listing-gallery";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getListingBySlug,
  getListingSlugs,
  getSuburbName,
} from "@/lib/data";

export function generateStaticParams() {
  return getListingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/listings/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };
  return {
    title: `${listing.address} — ${getSuburbName(listing.suburb)}`,
    description: listing.description[0] ?? listing.title,
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
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {suburbName}
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
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to listings
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ListingGallery images={listing.images} alt={listing.address} />

              <div className="mt-6 flex flex-wrap gap-6 border-y border-border py-5 text-foreground">
                <Spec icon={<Bed className="size-5" />} value={listing.beds} label="Beds" />
                <Spec icon={<Bath className="size-5" />} value={listing.baths} label="Baths" />
                <Spec icon={<Car className="size-5" />} value={listing.parking} label="Parking" />
              </div>

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
