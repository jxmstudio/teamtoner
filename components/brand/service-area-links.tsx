import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { localServicePath, type LocalService, type LocalServiceArea } from "@/lib/local-services";
import { getLocalServiceAreas } from "@/lib/data";

/**
 * "Choose your area" strip on the generic /sell and /appraisal pages, linking
 * each to its four area-specific pages. That link is what tells Google the
 * area pages are the canonical home for "<service> <area>" searches.
 */
export async function ServiceAreaLinks({
  service,
  className,
}: {
  service: LocalService;
  className?: string;
}) {
  const areas = await getLocalServiceAreas();
  if (!areas.length) return null;
  const appraisal = service === "appraisal";
  return (
    <Section className={className}>
      <Container>
        <SectionHeading
          eyebrow="Your area"
          title={appraisal ? "Appraisals where you live" : "Selling in your area"}
          description={
            appraisal
              ? "Local sales evidence, local buyers, local advice — pick your area."
              : "How we sell in each area, with the local sales to back it up."
          }
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={localServicePath(service, area.slug as LocalServiceArea)}
                className="group flex h-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-teal hover:bg-secondary/50"
              >
                <span className="font-semibold text-foreground group-hover:text-primary">
                  {appraisal ? `${area.name} appraisal` : `Selling in ${area.name}`}
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
