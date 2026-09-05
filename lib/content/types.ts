export type ListingStatus = "for-sale" | "under-offer" | "sold";

/** A per-listing document: an uploaded file's CDN URL or an external link. */
export interface ListingDocument {
  title: string;
  url: string;
}

/** A scheduled open home; both ends are ISO date-times (UTC). */
export interface OpenHome {
  start: string;
  end: string;
}

export interface Listing {
  slug: string;
  title: string;
  status: ListingStatus;
  address: string;
  suburb: string; // suburb slug
  beds: number;
  baths: number;
  parking: number;
  /** Display price or method of sale, e.g. "Enquiries over $749,000", "Auction 27 July", "Deadline Sale". */
  priceDisplay: string;
  description: string[];
  features: string[];
  images: string[]; // paths under /public (fixtures) or CDN URLs (CMS); empty → branded placeholder
  /** YouTube URL — rendered as an embed on the listing page when present. */
  video?: string;
  /** Property documents (title, rates, LIM, disclosures…) shown on the listing page. */
  documents?: ListingDocument[];
  /** Upcoming open homes only — the CMS query drops any that have already ended. */
  openHomes?: OpenHome[];
  /**
   * Fixture-only fallback for the home-page featured grid, used while the CMS
   * is unconnected or its "Featured properties" document is empty.
   */
  featured?: boolean;
  /** Manual position (1 = first). Unnumbered listings follow, newest first. */
  sortOrder?: number;
  soldPrice?: string;
  soldDate?: string; // ISO date
}

/** A standalone YouTube video managed in the CMS (home-page video section). */
export interface SiteVideo {
  title: string;
  url: string;
  caption?: string;
  /**
   * ISO date the video went up on YouTube. Google requires an upload date for
   * video rich results, so `VideoObject` markup is only emitted when it's set.
   */
  published?: string;
}

export interface Testimonial {
  author: string;
  source: "Google" | "RateMyAgent";
  rating: number; // 1-5
  quote: string;
  suburb?: string;
  featured?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date first published — drives Article schema and the visible byline. */
  published?: string;
  /** ISO date last substantively revised. Falls back to `published`. */
  updated?: string;
  /** Path to the PDF under /public/guides. Empty string = coming soon. */
  pdf: string;
  cover?: string;
  /**
   * On-page, Google-indexable version of the guide at /resources/<slug>.
   * Guides without `body` remain download-only. Adding sections here is all
   * that's needed to publish a guide as a content page.
   */
  body?: GuideSection[];
  /**
   * True when `body` describes a sequence of steps rather than a set of
   * options. Drives HowTo markup, which Google can surface as steps directly.
   */
  process?: boolean;
  /** Optional at-a-glance comparison table — a strong table-snippet candidate. */
  comparison?: GuideComparison;
  /** Manual position on /resources (1 = first). Unnumbered guides follow, oldest first. */
  sortOrder?: number;
}

export interface GuideComparison {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Suburb {
  slug: string;
  name: string;
  blurb: string;
  hero?: string;
  /**
   * Slug of the wider area this suburb sits inside (e.g. "palmerston-north").
   * Top-level areas leave this undefined. Suburbs with a parent are listed
   * under it on /suburbs and inherit its listings when they have none of
   * their own.
   */
  parent?: string;
  /**
   * Local market commentary paragraphs. Agency: extend per suburb over time —
   * this is what makes each suburb page worth indexing.
   */
  commentary?: string[];
}
