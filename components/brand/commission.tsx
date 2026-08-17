import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * Commission display helpers.
 *
 * Client legal requirement: **every** visible instance of the commission rate
 * ("2% + GST") must carry an asterisk that leads to the T&Cs. Rather than hand-
 * placing asterisks — which drift as copy changes — render fee copy through
 * `CommissionRate` (for the bare rate) or `FeeText` (for prose that contains
 * it) and the asterisk is applied for you.
 *
 * Source strings in `lib/site.ts` and page-level copy stay plain, so the same
 * text can still be used for `metadata` descriptions and JSON-LD, where an
 * asterisk is meaningless noise.
 */

/** Anchor for the commission disclaimer on the Terms page. */
export const COMMISSION_TERMS_HREF = "/terms#commission";

/** Matches the commission rate in body copy, tolerating spacing variations. */
const COMMISSION_PATTERN = /2\s*%\s*\+\s*GST/g;

/** The asterisk itself — a link through to the commission T&Cs. */
export function FeeAsterisk() {
  return (
    <Link
      href={COMMISSION_TERMS_HREF}
      aria-label="Terms and conditions apply"
      title="T's & C's apply"
      className="text-inherit underline-offset-2 hover:underline"
    >
      <sup aria-hidden>*</sup>
    </Link>
  );
}

/** The commission rate with its mandatory asterisk, e.g. "2% + GST*". */
export function CommissionRate() {
  return (
    <>
      {siteConfig.stats.commission}
      <FeeAsterisk />
    </>
  );
}

/**
 * Renders a plain copy string, appending the asterisk to every commission rate
 * it contains. Strings with no rate in them pass straight through.
 */
export function FeeText({ children }: { children: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of children.matchAll(COMMISSION_PATTERN)) {
    const end = match.index + match[0].length;
    nodes.push(children.slice(cursor, end));
    nodes.push(<FeeAsterisk key={end} />);
    cursor = end;
  }

  if (cursor === 0) return <>{children}</>;

  nodes.push(children.slice(cursor));
  return <>{nodes}</>;
}

/**
 * The footnote the asterisks resolve to. Sits at the foot of any page that
 * displays the commission rate, and in the site footer so the disclaimer is
 * reachable from every page. `underline hover:opacity-80` rather than a brand
 * colour so it reads correctly on both the light pages and the dark footer.
 */
export function TermsFootnote({ className }: { className?: string }) {
  return (
    <p
      className={
        className ??
        "mt-10 border-t border-border pt-6 text-xs text-muted-foreground"
      }
    >
      <sup>*</sup> T&rsquo;s &amp; C&rsquo;s apply &mdash;{" "}
      <Link href={COMMISSION_TERMS_HREF} className="underline hover:opacity-80">
        see our commission terms
      </Link>
      .
    </p>
  );
}
