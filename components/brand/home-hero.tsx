import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/brand/primitives";
import { FeeText, RankingAsterisk } from "@/components/brand/commission";
import { RankingFootnote } from "@/components/brand/ranking-claim";
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
      {/* Mobile gets a tighter rhythm than desktop: smaller type steps and
          shorter paddings, and no photo at all — any crop of the square duo
          portrait either ate a screen-height or clipped heads. The portraits
          belong to the "Meet Allan & Karen" cards below; the hero photo
          returns from lg, where the two-column layout gives it a 4:5 frame. */}
      <Container className="relative grid items-center gap-8 py-10 sm:py-16 lg:grid-cols-2 lg:gap-10 lg:py-24">
        <div>
          {/* The ranking line runs ~50 characters in caps — too long for a pill
              at phone widths, where it would wrap into a lopsided stadium. So
              the pill chrome (border, fill, padding) only starts at sm; below
              that the line reads as a plain teal eyebrow and wraps cleanly. */}
          <p className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-teal sm:gap-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:px-4 sm:py-1.5 sm:text-sm sm:font-medium sm:tracking-wide">
            {stats.rankingLine}
            <RankingAsterisk />
          </p>
          <h1 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
            {copy.heroTitleStart}{" "}
            <span className="font-script font-normal text-teal">
              {copy.heroTitleHighlight}
            </span>{" "}
            {copy.heroTitleEnd}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-white/80 sm:mt-5 sm:text-lg">
            <FeeText>{copy.heroParagraph}</FeeText>
          </p>
          <p className="mt-3 max-w-xl text-pretty text-sm text-white/60 sm:text-base">
            {copy.heroSecondary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <ButtonLink
              href="/appraisal"
              className="h-11 flex-1 bg-teal px-5 text-base text-teal-foreground hover:bg-teal/90 sm:h-12 sm:flex-none sm:px-7"
            >
              Get a Free Appraisal
            </ButtonLink>
            <ButtonLink
              href="/listings"
              variant="outline"
              className="h-11 flex-1 border-white/25 bg-transparent px-5 text-base text-white hover:bg-white/10 hover:text-white sm:h-12 sm:flex-none sm:px-7"
            >
              View Properties
            </ButtonLink>
          </div>

          {/* Was a two-stat row (#7 / No.1). With the nationwide figure retired
              the badge above already carries the whole claim, so this slot
              holds the source note rather than restating "No.1" twice. */}
          <RankingFootnote className="mt-8 max-w-lg border-t border-white/10 pt-5 text-white/50 sm:mt-10 sm:pt-6" />
        </div>

        <div className="relative hidden w-full lg:block">
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
              sizes="(min-width: 1024px) 40vw, 1px"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
