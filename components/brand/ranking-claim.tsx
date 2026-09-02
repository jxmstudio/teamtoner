import { RankingAsterisk } from "@/components/brand/commission";
import { getSiteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * The site's one ranking claim.
 *
 * Client amendment (31 Aug 2026): the "#7 Arizto agents nationwide" figure was
 * retired, leaving a single claim — `stats.rankingLine` — which must always be
 * shown with its source footnote (`stats.rankingFootnote`) and a `*` linking to
 * the ranking terms. Rendering both together in one component is what keeps the
 * two from drifting apart as the line is reused across pages.
 *
 * Both strings are CMS-editable, so nothing here forces their case — the line
 * ships in caps and will render however the studio has it.
 */

/** The claim as a display line, with its footnote beneath. */
export async function RankingClaim({ className }: { className?: string }) {
  const { stats } = await getSiteConfig();
  return (
    <div className={className}>
      <p className="text-balance text-xl font-bold leading-tight text-primary sm:text-2xl lg:text-3xl">
        {stats.rankingLine}
        <RankingAsterisk />
      </p>
      <RankingFootnote className="mt-3" />
    </div>
  );
}

/**
 * The source small print on its own — for places that already show the line in
 * their own styling (the home hero badge, the appraisal proof box).
 */
export async function RankingFootnote({ className }: { className?: string }) {
  const { stats } = await getSiteConfig();
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      <sup aria-hidden>*</sup> {stats.rankingFootnote}
    </p>
  );
}
