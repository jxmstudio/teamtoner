import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { Breadcrumbs } from "@/components/brand/breadcrumbs";
import { CtaSection } from "@/components/brand/cta-section";
import { FeePillars } from "@/components/brand/fee-pillars";
import { ListingCard } from "@/components/brand/listing-card";
import { TestimonialCard } from "@/components/brand/testimonial-card";
import { Container, Section } from "@/components/brand/primitives";
import { FeeText, RankingAsterisk, TermsFootnote } from "@/components/brand/commission";
import { RankingFootnote } from "@/components/brand/ranking-claim";
import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import {
  SERVICE_META,
  localServicePath,
  type LocalService,
  type LocalServiceArea,
  type LocalServicePage as LocalServiceCopy,
} from "@/lib/local-services";
import type { Suburb } from "@/lib/content/types";
import {
  getFeaturedTestimonials,
  getListingsBySuburb,
  getLocalServiceAreas,
  getSellCopy,
  getSiteConfig,
  getSoldBySuburb,
} from "@/lib/data";

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

/** How many recent sales / current listings to show as local proof. */
const PROOF_LIMIT = 3;

/**
 * The shared body of /appraisal/<area> and /sell/<area>. The two variants
 * differ in what sits beside the copy (the appraisal form vs. the fee pillars
 * and process) and in the closing CTA; everything else — local commentary,
 * points, proof of local sales, FAQs, cross-links — is the same shape.
 */
export async function LocalServicePage({
  service,
  area,
  copy,
}: {
  service: LocalService;
  area: Suburb;
  copy: LocalServiceCopy;
}) {
  const meta = SERVICE_META[service];
  const [config, sold, listings, [testimonial], areas, sellCopy] = await Promise.all([
    getSiteConfig(),
    getSoldBySuburb(area.slug),
    getListingsBySuburb(area.slug),
    getFeaturedTestimonials(1),
    getLocalServiceAreas(),
    getSellCopy(),
  ]);
  const { agents, stats } = config;
  const otherAreas = areas.filter((a) => a.slug !== area.slug);
  const otherService: LocalService = service === "appraisal" ? "sell" : "appraisal";
  const path = localServicePath(service, area.slug as LocalServiceArea);

  return (
    <>
      <ServiceJsonLd
        name={copy.headline}
        description={copy.intro}
        serviceType={meta.schemaType}
        areaName={area.name}
        path={path}
        free={service === "appraisal"}
      />
      <FaqJsonLd faqs={copy.faqs} />

      <PageHeader
        compact={service === "appraisal"}
        eyebrow={`${meta.label} · ${area.name}`}
        title={copy.headline}
      >
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          <FeeText>{copy.intro}</FeeText>
        </p>
        {service === "sell" ? (
          <>
            <FeePillars className="mt-7" />
            <ButtonLink
              href={localServicePath("appraisal", area.slug as LocalServiceArea)}
              className="mt-7 h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
            >
              Get a Free {area.name} Appraisal
            </ButtonLink>
          </>
        ) : null}
      </PageHeader>

      <Section className="py-10 sm:py-12 lg:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: meta.breadcrumb, path: meta.path },
              { name: area.name, path },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Copy */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-foreground">{copy.whyTitle}</h2>
              <div className="mt-5 space-y-4 text-lg text-foreground/90">
                {copy.commentary.map((paragraph, i) => (
                  <p key={i}>
                    <FeeText>{paragraph}</FeeText>
                  </p>
                ))}
              </div>

              <h2 className="mt-10 text-2xl font-bold text-foreground">{copy.pointsTitle}</h2>
              <ul className="mt-5 space-y-3">
                {copy.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">
                      <FeeText>{point}</FeeText>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Local proof, from the listing data — never typed into copy. */}
              {(sold.length > 0 || listings.length > 0) && (
                <div className="mt-10 rounded-xl border border-border bg-secondary/40 p-5">
                  <h3 className="font-semibold text-foreground">Team Toner in {area.name}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {sold.length > 0 ? (
                      <>
                        <strong className="text-foreground">{sold.length}</strong> recent Team Toner{" "}
                        {sold.length === 1 ? "sale" : "sales"} in {area.name}
                      </>
                    ) : null}
                    {sold.length > 0 && listings.length > 0 ? " · " : null}
                    {listings.length > 0 ? (
                      <>
                        <strong className="text-foreground">{listings.length}</strong> currently for sale
                      </>
                    ) : null}
                    .{" "}
                    <Link href={`/suburbs/${area.slug}`} className="text-primary underline">
                      See the {area.name} market page
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-xl border border-teal/30 bg-teal/10 px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
                    Local experience. Proven results.
                  </p>
                  <p className="mt-2 text-balance font-semibold text-foreground">
                    {stats.rankingLine}
                    <RankingAsterisk />
                  </p>
                  <RankingFootnote className="mt-2" />
                </div>

                {service === "appraisal" ? (
                  <Card className="mt-6">
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold text-foreground">
                        Book your free {area.name} appraisal
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Allan and Karen will be in touch to arrange a time that suits you.
                      </p>
                      <div className="mt-5">
                        <LeadForm kind="appraisal" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mt-6">
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold text-foreground">{sellCopy.processTitle}</h2>
                      <ol className="mt-4 space-y-3">
                        {sellCopy.steps.map((step, i) => (
                          <li key={step.title} className="flex gap-3">
                            <span className="font-script text-2xl leading-none text-teal">{i + 1}</span>
                            <div>
                              <p className="font-semibold text-foreground">{step.title}</p>
                              <p className="text-sm text-muted-foreground">{step.detail}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <ButtonLink
                        href={localServicePath("appraisal", area.slug as LocalServiceArea)}
                        className="mt-6 h-11 w-full bg-teal text-teal-foreground hover:bg-teal/90"
                      >
                        Start with a free appraisal
                      </ButtonLink>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-6 rounded-xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <Phone className="size-4 text-teal" /> Prefer to talk?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Call{" "}
                    <a className="font-semibold text-primary hover:underline" href={tel(agents.allan.phone)}>
                      Allan {agents.allan.phone}
                    </a>{" "}
                    or{" "}
                    <a className="font-semibold text-primary hover:underline" href={tel(agents.karen.phone)}>
                      Karen {agents.karen.phone}
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <TermsFootnote />
        </Container>
      </Section>

      {/* Recent local sales — the evidence behind the appraisal claim. */}
      {sold.length > 0 && (
        <Section className="bg-secondary/50">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">
                Recent Team Toner sales in {area.name}
              </h2>
              <Link href={`/suburbs/${area.slug}`} className="text-sm font-medium text-primary hover:underline">
                All {area.name} sales
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sold.slice(0, PROOF_LIMIT).map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {testimonial && (
        <Section className="py-12 sm:py-14 lg:py-16">
          <Container className="max-w-3xl">
            <TestimonialCard testimonial={testimonial} />
          </Container>
        </Section>
      )}

      <Section className="bg-secondary/50">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">
            {service === "appraisal"
              ? `${area.name} appraisal questions, answered`
              : `Selling in ${area.name} — common questions`}
          </h2>
          <Accordion className="mt-8">
            {copy.faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <FeeText>{faq.a}</FeeText>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* Cross-links: the sibling service for this area, the area hub, and the
          same service in the other areas — so the eight pages form a cluster
          rather than eight dead ends. */}
      <Section>
        <Container>
          <h2 className="text-2xl font-bold text-foreground">More for {area.name} homeowners</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            <li>
              <Link
                href={localServicePath(otherService, area.slug as LocalServiceArea)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
              >
                {SERVICE_META[otherService].label} in {area.name} <ArrowRight className="size-3.5" />
              </Link>
            </li>
            <li>
              <Link
                href={`/suburbs/${area.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
              >
                {area.name} real estate <ArrowRight className="size-3.5" />
              </Link>
            </li>
            <li>
              <Link
                href={meta.path}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
              >
                {meta.label} — all areas <ArrowRight className="size-3.5" />
              </Link>
            </li>
          </ul>
          {otherAreas.length > 0 && (
            <>
              <h3 className="mt-8 font-semibold text-foreground">
                {meta.label} in other areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {otherAreas.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={localServicePath(service, other.slug as LocalServiceArea)}
                      className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-teal hover:text-primary"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </Section>

      <CtaSection
        description={
          service === "appraisal"
            ? `Get an honest, evidence-based appraisal built from recent ${area.name} sales — from two agents who sell here.`
            : `Find out what your ${area.name} home could sell for before you decide anything — free, and with no obligation.`
        }
      />
    </>
  );
}
