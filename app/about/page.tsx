import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/brand/page-header";
import { FeePillars } from "@/components/brand/fee-pillars";
import { FeeText } from "@/components/brand/commission";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";
import { PageEntityJsonLd } from "@/components/seo/json-ld";
import { seoTitles } from "@/lib/site";
import { getSiteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: seoTitles.about },
  description:
    "Meet Allan & Karen Toner — a husband-and-wife real estate team serving Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const { stats, agents, brand } = await getSiteConfig();
  return (
    <>
      <PageEntityJsonLd
        type="AboutPage"
        path="/about"
        name="About Allan & Karen Toner"
        description={`Allan & Karen Toner — ${agents.allan.role}s with ${brand.parent}, serving Palmerston North, Feilding, Ashhurst and the wider Manawatū.`}
      />

      <PageHeader
        eyebrow="Meet Team Toner"
        title="Allan & Karen Toner"
        description="Two agents. One team."
      />

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border lg:sticky lg:top-24">
            <Image
              src="/team/allan-karen.jpg"
              alt="Allan and Karen Toner, husband-and-wife real estate agents in Palmerston North"
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 text-lg text-foreground/90">
            <p>
              We&rsquo;re Allan and Karen Toner — a husband-and-wife real estate
              team proudly helping homeowners throughout Palmerston North,
              Feilding, Ashhurst and the wider Manawatū.
            </p>
            <p>
              Selling your home is one of life&rsquo;s biggest financial
              decisions. We believe the people you trust with it should treat it
              that way.
            </p>
            <p>
              As a husband-and-wife team, we work together throughout the entire
              selling process — from your initial appraisal and marketing
              strategy through to buyer follow-up, negotiation and settlement.
            </p>
            <p>
              That means you&rsquo;re not simply getting an agent who lists your
              property. You&rsquo;re getting two experienced agents personally
              invested in achieving the best possible outcome.
            </p>
            <p>
              Our approach is straightforward: honest advice, regular
              communication, strong marketing, thorough buyer follow-up and hard
              work.
            </p>
            <p>
              We&rsquo;ll tell you what we believe your property is worth based
              on the evidence — not simply tell you what you want to hear to win
              the listing.
            </p>
            <p className="font-semibold text-foreground">
              That&rsquo;s the Team Toner difference.
            </p>
          </div>
        </Container>
      </Section>

      {/* The Arizto model and the fee — deliberately after the team story. */}
      <Section className="bg-secondary/50">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow={`Part of ${brand.parent}`}
            title="A smarter model behind the service"
            description={`We're part of ${brand.parent}, a nationwide agency built on a simpler, fairer fee structure. It lets us deliver the full premium service — and pass the difference on to you.`}
          />
          <FeePillars className="mt-8 justify-center" />
          <p className="mt-8 text-muted-foreground">
            {brand.reaa}.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <dl className="grid gap-8 text-center sm:grid-cols-2">
            <Stat value={stats.nationalRank} label="Arizto Agents Nationwide*" />
            <Stat value={stats.regionRank} label={`Arizto Team — ${stats.regionName}*`} />
          </dl>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Talk to us:{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href={`tel:${agents.allan.phone.replace(/\s/g, "")}`}
            >
              {agents.allan.name} {agents.allan.phone}
            </a>{" "}
            ·{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href={`tel:${agents.karen.phone.replace(/\s/g, "")}`}
            >
              {agents.karen.name} {agents.karen.phone}
            </a>
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label.replace("*", "")}</dt>
      <dd className="text-5xl font-bold text-primary">{value}</dd>
      <p className="mt-2 text-muted-foreground">
        <FeeText>{label}</FeeText>
      </p>
    </div>
  );
}
