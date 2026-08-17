"use client";

import * as React from "react";
import { Pause, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Testimonial } from "@/lib/content/types";

/** How long each testimonial holds before the carousel advances. */
const ROTATE_MS = 7000;

/**
 * Rotating testimonial carousel for the home page.
 *
 * Accessibility: rotation stops on hover, on keyboard focus, and via an
 * explicit play/pause control; it never starts at all when the visitor has
 * asked for reduced motion. Arrow keys and touch swipe both work (Embla),
 * and the slide region is announced politely whenever rotation is stopped.
 *
 * Degrades on its own if Allan features fewer than three testimonials: two or
 * more rotate, exactly one renders as a plain static quote with no controls,
 * and none renders nothing at all (the caller can skip the section entirely).
 */
export function TestimonialCarousel({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [interacting, setInteracting] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const count = testimonials.length;
  const rotating = playing && !interacting && !reducedMotion && count > 1;

  React.useEffect(() => {
    if (!api) return;
    const sync = () => setSelected(api.selectedScrollSnap());
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || !rotating) return;
    const timer = setInterval(() => api.scrollNext(), ROTATE_MS);
    return () => clearInterval(timer);
  }, [api, rotating]);

  if (count === 0) return null;
  if (count === 1) {
    return (
      <div className={cn("mx-auto max-w-3xl", className)}>
        <Quote testimonial={testimonials[0]} />
      </div>
    );
  }

  return (
    <div
      className={cn("mx-auto max-w-3xl", className)}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        aria-label="Client testimonials"
        className="px-0 sm:px-14"
      >
        {/* Announced only while stopped — a live region that keeps changing
            under an auto-rotating carousel is noise for screen reader users. */}
        <div aria-live={rotating ? "off" : "polite"}>
          <CarouselContent>
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={`${testimonial.author}-${i}`}>
                <Quote
                  testimonial={testimonial}
                  position={`${i + 1} of ${count}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {testimonials.map((testimonial, i) => (
            <button
              key={`${testimonial.author}-${i}`}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              aria-current={i === selected ? "true" : undefined}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                i === selected
                  ? "bg-teal"
                  : "bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setPlaying((p) => !p)}
          aria-label={
            playing ? "Pause testimonial rotation" : "Play testimonial rotation"
          }
          className="text-muted-foreground"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
      </div>
    </div>
  );
}

function Quote({
  testimonial,
  position,
}: {
  testimonial: Testimonial;
  position?: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
      {position ? <span className="sr-only">Testimonial {position}</span> : null}
      <div
        className="flex justify-center gap-0.5"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-5",
              i < testimonial.rating
                ? "fill-gold text-gold"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-balance text-xl font-medium text-foreground sm:text-2xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {testimonial.author}
        </span>
        {testimonial.suburb ? ` · ${testimonial.suburb}` : ""} · via{" "}
        {testimonial.source}
      </figcaption>
    </figure>
  );
}

/**
 * Reduced-motion preference as a subscription rather than effect state, so the
 * first client render already has the right value and nothing auto-rotates for
 * a frame before stopping.
 */
function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
