import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/brand/primitives";
import { FeeText, RankingAsterisk } from "@/components/brand/commission";
import { getHomeCopy, getSiteConfig } from "@/lib/data";

export async function HomeHero() {
  const { stats } = await getSiteConfig();
  const copy = await getHomeCopy();
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[36rem] rounded-full bg-teal/20 blur-3xl"
      />
      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-teal">
            {stats.nationalRank} Arizto Agents Nationwide
            <RankingAsterisk />
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {copy.heroTitleStart}{" "}
            <span className="font-script font-normal text-teal">
              {copy.heroTitleHighlight}
            </span>{" "}
            {copy.heroTitleEnd}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-white/80">
            <FeeText>{copy.heroParagraph}</FeeText>
          </p>
          <p className="mt-3 max-w-xl text-pretty text-white/60">
            {copy.heroSecondary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/appraisal"
              className="h-12 bg-teal px-7 text-base text-teal-foreground hover:bg-teal/90"
            >
              Get a Free Appraisal
            </ButtonLink>
            <ButtonLink
              href="/listings"
              variant="outline"
              className="h-12 border-white/25 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              View Properties
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <Stat value={stats.nationalRank} label="Arizto Agents Nationwide*" />
            <Stat value={stats.regionRank} label={`Arizto Team — ${stats.regionName}*`} />
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/25 to-petrol/30 blur-xl"
          />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <Image
              src="/team/allan-karen.jpg"
              alt="Allan and Karen Toner — Team Toner, Arizto real estate agents in Palmerston North"
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label.replace("*", "")}</dt>
      <dd className="text-3xl font-bold text-white">{value}</dd>
      <p className="mt-1 text-xs text-white/60">
        <FeeText>{label}</FeeText>
      </p>
    </div>
  );
}
