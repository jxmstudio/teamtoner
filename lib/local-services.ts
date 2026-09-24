import type { Faq } from "./content/types";

/**
 * Service × location pages: /appraisal/<area> and /sell/<area>.
 *
 * These exist because the seller searches the client cares about are
 * area-qualified — "property appraisal Ashhurst", "selling a house in
 * Feilding" — and the area hub at /suburbs/<area> already owns the broader
 * "<area> real estate" intent. One page per intent per area, and only for the
 * four priority areas: rolling the template out to every suburb would be
 * doorway-page territory with no search volume behind it.
 */
export const LOCAL_SERVICES = ["appraisal", "sell"] as const;
export type LocalService = (typeof LOCAL_SERVICES)[number];

/** Area slugs (top-level entries in lib/content/suburbs.ts) that get service pages. */
export const LOCAL_SERVICE_AREAS = ["palmerston-north", "feilding", "ashhurst", "manawatu"] as const;
export type LocalServiceArea = (typeof LOCAL_SERVICE_AREAS)[number];

export interface LocalServicePage {
  service: LocalService;
  /** Area slug — must match a top-level suburb page. */
  area: LocalServiceArea;
  /** H1. */
  headline: string;
  /** One or two sentences under the H1. */
  intro: string;
  /** Google description (≤ 158 chars). Falls back to a trimmed `intro`. */
  description?: string;
  /** Heading over the commentary paragraphs. */
  whyTitle: string;
  /** Local commentary — the part that makes the page worth indexing. */
  commentary: string[];
  /** Heading over the points list. */
  pointsTitle: string;
  /** Short, scannable promises (what you get / how we sell here). */
  points: string[];
  faqs: Faq[];
}

export const SERVICE_META: Record<
  LocalService,
  { path: string; label: string; schemaType: string; breadcrumb: string }
> = {
  appraisal: {
    path: "/appraisal",
    label: "Free property appraisal",
    schemaType: "Property appraisal",
    breadcrumb: "Free Appraisal",
  },
  sell: {
    path: "/sell",
    label: "Selling a house",
    schemaType: "Real estate sales",
    breadcrumb: "Sell",
  },
};

export function isLocalService(value: string): value is LocalService {
  return (LOCAL_SERVICES as readonly string[]).includes(value);
}

export function isLocalServiceArea(value: string): value is LocalServiceArea {
  return (LOCAL_SERVICE_AREAS as readonly string[]).includes(value);
}

export function localServicePath(service: LocalService, area: LocalServiceArea): string {
  return `${SERVICE_META[service].path}/${area}`;
}

/**
 * Stable document id for the CMS twin of a fixture page, so seeding is
 * idempotent and the studio can't end up with two documents for one URL.
 */
export function localServiceDocId(service: LocalService, area: LocalServiceArea): string {
  return `localService-${service}-${area}`;
}

/** SERP title candidates, richest first — pass to fitTitle(). */
export function localServiceTitles(service: LocalService, areaName: string): string[] {
  return service === "appraisal"
    ? [
        `Free Property Appraisal ${areaName} | Team Toner`,
        `Property Appraisal ${areaName} | Team Toner`,
        `Property Appraisal ${areaName}`,
      ]
    : [
        `Selling a House in ${areaName} | Team Toner`,
        `Sell Your House in ${areaName} | Team Toner`,
        `Selling a House in ${areaName}`,
      ];
}

/** Google shows roughly this many characters of a description. */
export const DESCRIPTION_MAX = 158;

/**
 * Trim page copy to a meta description that ends cleanly: the longest run of
 * whole sentences that fits, else a whole-word cut with an ellipsis.
 */
export function metaDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  // Whole sentences that fit, as long as they make a useful description.
  const head = clean.slice(0, max + 1);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (sentenceEnd >= Math.floor(max * 0.6)) return head.slice(0, sentenceEnd + 1);
  // Otherwise cut at a word boundary, leaving room for the ellipsis.
  const room = clean.slice(0, max - 1);
  const wordEnd = room.lastIndexOf(" ");
  return `${room.slice(0, wordEnd > 0 ? wordEnd : room.length).replace(/[,;:—\-\s]+$/, "")}…`;
}
