import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Car, Home, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getSuburbName } from "@/lib/data";
import type { Listing } from "@/lib/content/types";

const statusLabel: Record<Listing["status"], string> = {
  "for-sale": "For Sale",
  "under-offer": "Under Offer",
  sold: "Sold",
};

export function ListingImage({
  listing,
  className,
  sizes,
}: {
  listing: Listing;
  className?: string;
  sizes?: string;
}) {
  const src = listing.images[0];
  if (src) {
    return (
      <Image
        src={src}
        alt={listing.address}
        fill
        sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-petrol to-night",
        className
      )}
      aria-hidden
    >
      <Home className="size-12 text-white/40" strokeWidth={1.5} />
    </div>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const sold = listing.status === "sold";
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ListingImage
          listing={listing}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          className={cn(
            "absolute left-3 top-3 border-transparent",
            sold
              ? "bg-night text-white"
              : listing.status === "under-offer"
                ? "bg-gold text-night"
                : "bg-teal text-teal-foreground"
          )}
        >
          {statusLabel[listing.status]}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {getSuburbName(listing.suburb)}
        </p>
        <h3 className="mt-1 font-semibold text-foreground">{listing.address}</h3>
        <p className="mt-2 text-lg font-bold text-primary">
          {sold ? (listing.soldPrice ?? "Sold") : listing.priceDisplay}
        </p>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Bed className="size-4" /> {listing.beds}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="size-4" /> {listing.baths}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Car className="size-4" /> {listing.parking}
          </span>
        </div>
      </div>
    </Link>
  );
}
