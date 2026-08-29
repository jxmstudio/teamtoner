import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Home, Images, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getSuburbName } from "@/lib/data";
import type { Listing } from "@/lib/content/types";

const statusLabel: Record<Listing["status"], string> = {
  "for-sale": "For Sale",
  "under-offer": "Under Offer",
  sold: "Sold",
};

/**
 * Full-bleed photo card for the home-page "Featured properties" section.
 *
 * The standard ListingCard gives the photo a 4:3 slice above a text panel;
 * here the photo IS the card and the details sit on a gradient scrim over its
 * lower edge, so the same grid cell shows roughly twice as much photograph.
 * Where a listing has a second photo it crossfades in on hover — a cheap way
 * to show more of the property without a carousel's tap/swipe conflicts
 * inside a link. Overlay colours are literal night/white rather than theme
 * tokens: they sit on the photo, not on the page, so they must not flip in
 * dark mode.
 */
export async function FeaturedListingCard({
  listing,
  hero = false,
}: {
  listing: Listing;
  /** The lead card of the grid — larger type, taller image, eager load. */
  hero?: boolean;
}) {
  const sold = listing.status === "sold";
  const suburbName = await getSuburbName(listing.suburb);
  const [photo, secondPhoto] = listing.images;

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-sm ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {photo ? (
        <>
          <Image
            src={photo}
            alt={listing.address}
            fill
            priority={hero}
            sizes={
              hero
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {secondPhoto && (
            <Image
              src={secondPhoto}
              alt=""
              aria-hidden
              fill
              sizes={
                hero
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, 100vw"
              }
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
            />
          )}
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-petrol to-night"
        >
          <Home className="size-12 text-white/40" strokeWidth={1.5} />
        </div>
      )}

      {/* Scrim — carries the text contrast over any photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent"
      />

      <Badge
        className={cn(
          "absolute left-4 top-4 border-transparent",
          sold
            ? "bg-night text-white"
            : listing.status === "under-offer"
              ? "bg-gold text-night"
              : "bg-teal text-teal-foreground"
        )}
      >
        {statusLabel[listing.status]}
      </Badge>

      {secondPhoto && listing.images.length > 1 && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-night/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Images className="size-3.5" aria-hidden />
          {listing.images.length} photos
        </span>
      )}

      <div className={cn("relative p-5 text-white", hero && "sm:p-7")}>
        <p className="flex items-center gap-1.5 text-sm text-white/80">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {suburbName}
        </p>
        <h3
          className={cn(
            "mt-1 font-semibold text-balance",
            hero ? "text-xl sm:text-2xl" : "text-lg"
          )}
        >
          {listing.address}
        </h3>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className={cn("font-bold", hero ? "text-xl" : "text-lg")}>
            {sold ? (listing.soldPrice ?? "Sold") : listing.priceDisplay}
          </p>
          {(listing.beds > 0 || listing.baths > 0 || listing.parking > 0) && (
            <div className="flex items-center gap-3.5 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Bed className="size-4" aria-hidden /> {listing.beds}
                <span className="sr-only">bedrooms</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bath className="size-4" aria-hidden /> {listing.baths}
                <span className="sr-only">bathrooms</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Car className="size-4" aria-hidden /> {listing.parking}
                <span className="sr-only">parking</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
