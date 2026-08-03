import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/brand/page-header";
import { CtaSection } from "@/components/brand/cta-section";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Allan & Karen Toner",
  description:
    "Meet Team Toner — Allan & Karen Toner, a top-ranked Arizto real estate team serving Palmerston North and the Manawatū.",
};

export default function AboutPage() {
  const { stats, agents, brand } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="Meet the team"
        title="Allan & Karen Toner"
        description="Good honest real estate, backed by results. We're proud to be one of the country's top Arizto teams — and #1 in our region."
      />

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
            <Image
              src="/team/allan-karen.jpg"
              alt="Allan and Karen Toner"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 text-lg text-foreground/90">
            <p>
              Allan and Karen Toner are a husband-and-wife team who bring
              honesty, energy and genuine care to every sale. Selling your home
              is one of life's biggest decisions — and we treat it that way.
            </p>
            <p>
              As part of the {brand.parent} network, we pair a premium marketing
              package with a smarter fee structure: {stats.commission} commission,
              no upfront costs, and no sale, no fee. You get everything you'd
              expect from a top agency, without the traditional price tag.
            </p>
            <p>
              The result? We've helped hundreds of Manawatū families move on to
              their next chapter — and been recognised as {stats.nationalRank} of{" "}
              {stats.agentPool} Arizto agents nationwide, and {stats.regionRank} in{" "}
              {stats.regionName}.
            </p>
            <p className="text-base text-muted-foreground">{brand.reaa}.</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-secondary/50">
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <Stat value={stats.nationalRank} label={`of ${stats.agentPool} Arizto agents nationwide`} />
            <Stat value={stats.regionRank} label={`in ${stats.regionName}`} />
            <Stat value={stats.homesSold} label="homes sold" />
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Talk to us: {agents.allan.name} {agents.allan.phone} · {agents.karen.name}{" "}
            {agents.karen.phone}
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
      <p className="text-5xl font-bold text-primary">{value}</p>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  );
}
