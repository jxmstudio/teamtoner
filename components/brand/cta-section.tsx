import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export function CtaSection({
  title = "Thinking of selling? Chat to Team Toner.",
  description = "Book a free, no-obligation appraisal and find out what your property is worth.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-petrol text-white">
      <Container className="flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-white/80">{description}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <ButtonLink
            href="/appraisal"
            className="h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
          >
            Book a free appraisal
          </ButtonLink>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 px-7 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Email us
          </a>
        </div>
      </Container>
    </section>
  );
}
