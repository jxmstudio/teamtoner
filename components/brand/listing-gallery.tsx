"use client";

import Image from "next/image";
import { Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ListingGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-petrol to-night">
        <div className="text-center text-white/50">
          <Home className="mx-auto size-14" strokeWidth={1.5} />
          <p className="mt-3 text-sm">Photos coming soon</p>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <Image src={images[0]} alt={alt} fill className="object-cover" priority sizes="100vw" />
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={`${alt} — photo ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
