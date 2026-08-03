import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/content/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full border-border/70">
      <CardContent className="flex h-full flex-col pt-6">
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < testimonial.rating
                  ? "fill-gold text-gold"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <blockquote className="mt-4 flex-1 text-pretty text-foreground/90">
          “{testimonial.quote}”
        </blockquote>
        <footer className="mt-5 flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">
            {testimonial.author}
            {testimonial.suburb ? (
              <span className="font-normal text-muted-foreground">
                {" "}· {testimonial.suburb}
              </span>
            ) : null}
          </span>
          <span className="text-xs text-muted-foreground">via {testimonial.source}</span>
        </footer>
      </CardContent>
    </Card>
  );
}
