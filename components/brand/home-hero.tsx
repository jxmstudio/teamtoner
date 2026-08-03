import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export function HomeHero() {
  const { stats } = siteConfig;
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[36rem] rounded-full bg-teal/20 blur-3xl"
      />
      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-teal">
            {stats.nationalRank} of {stats.agentPool} Arizto agents nationwide
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Nobody sells more property than{" "}
            <span className="font-script font-normal text-teal">Team Toner</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-white/80">
            Allan &amp; Karen Toner deliver premium marketing and{" "}
            {stats.commission} commission across Palmerston North, Feilding,
            Ashhurst &amp; the wider Manawatū. No sale, no fee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/appraisal"
              className="h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
            >
              Book a free appraisal
            </ButtonLink>
            <ButtonLink
              href="/listings"
              variant="outline"
              className="h-12 border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              View listings
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
            <Stat value={stats.nationalRank} label="Nationwide ranking" />
            <Stat value={stats.regionRank} label={stats.regionName} />
            <Stat value={stats.homesSold} label="Homes sold" />
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-3xl bg-gradient-to-b from-petrol/40 to-teal/30" />
          <Image
            src="/brand/team-toner-profile.png"
            alt="Allan and Karen Toner"
            width={1000}
            height={1000}
            priority
            className="relative z-10 mx-auto w-full max-w-md object-contain drop-shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-bold text-white">{value}</dd>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}
