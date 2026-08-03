import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/brand/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-script text-5xl text-teal">Oops</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you're looking for has moved or no longer exists. Let's get you
        back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" className="h-11 bg-teal px-6 text-teal-foreground hover:bg-teal/90">
          Back to home
        </ButtonLink>
        <ButtonLink href="/listings" variant="outline" className="h-11 px-6">
          Browse listings
        </ButtonLink>
      </div>
    </Container>
  );
}
