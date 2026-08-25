import { ButtonLink } from "@/components/ui/button-link";
import { FeeText } from "@/components/brand/commission";
import { Container } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

/**
 * Site-wide appraisal banner (client brief §11). Copy is shared across every
 * page; pass `title`/`description` only where a page needs a local variant.
 */
export function CtaSection({
  title = "Curious what your property could sell for?",
  description = `Get an honest, evidence-based appraisal from ${siteConfig.stats.regionName}'s ${siteConfig.stats.regionRank} Arizto team.*`,
  note = "No pressure. No obligation. Just straightforward advice.",
}: {
  title?: string;
  description?: string;
  note?: string | null;
}) {
  return (
    <section className="bg-petrol text-white">
      <Container className="flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-white/80">
            <FeeText>{description}</FeeText>
          </p>
          {note ? (
            <p className="mt-3 text-sm text-white/60">{note}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <ButtonLink
            href="/appraisal"
            className="h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
          >
            Get a Free Appraisal
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            className="h-12 border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
          >
            Contact Team Toner
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
