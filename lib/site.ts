/**
 * Central site configuration for Team Toner.
 *
 * These are the "siteSettings" values used across the marketing site. Anything
 * marked TODO(client) is a placeholder awaiting confirmation from Allan & Karen
 * (see the onboarding checklist) and will later be driven by Sanity siteSettings.
 *
 * Positioning (client brief, Aug 2026): Team Toner lead as a proven,
 * high-performing husband-and-wife team — two agents personally working for the
 * seller. The fee strengthens that proposition; it is not the headline.
 */
export const siteConfig = {
  name: "Team Toner",
  legalName: "Team Toner — Allan & Karen Toner",
  tagline: "Premium service. Proven results. A smarter fee.",
  strapline: "Premium service. Proven results. A smarter fee.",
  description:
    "Allan & Karen Toner — a husband-and-wife real estate team and Arizto's No.1 agents in Palmerston North & Manawatū. Two agents working for you, premium marketing, and a 2% + GST commission with No Upfront Costs.",
  /**
   * Footer blurb (launch brief §13) — deliberately shorter than `description`,
   * which continues to serve <meta> and JSON-LD. The `*` after the ranking
   * claim is rendered as a link to the rankings note by <FeeText>.
   */
  footerTagline: "Allan & Karen Toner | Team Toner",
  footerDescription:
    "Arizto's No.1 agents — Palmerston North & Manawatū.* Two experienced agents, premium marketing and a smarter 2% + GST commission.",
  // Env-driven so preview/staging deployments generate their own canonicals,
  // sitemap and OG URLs instead of pointing at production.
  // The apex domain 308-redirects to www on Vercel, so canonicals, the
  // sitemap and OG URLs must use www too — otherwise every URL Google is
  // handed is a redirect.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamtoner.co.nz",
  brand: {
    parent: "Arizto",
    // TODO(client): confirm REAA licence details to display
    reaa: "Arizto Ltd — Licensed REAA 2008",
  },
  /**
   * TODO(client): individual REAA licence numbers. NZ buyers and sellers can
   * verify a salesperson on the REA public register, and Google treats
   * verifiable credentials as a real E-E-A-T signal on property pages. Left
   * empty until Allan supplies them; nothing renders while they're blank.
   */
  agents: {
    allan: {
      name: "Allan Toner",
      phone: "027 255 8735",
      role: "Licensed Salesperson",
      licence: "",
    },
    karen: {
      name: "Karen Toner",
      phone: "027 214 5700",
      role: "Licensed Salesperson",
      licence: "",
    },
  },
  /**
   * Business location data for LocalBusiness schema and NAP consistency with
   * the Google Business Profile.
   *
   * TODO(client): confirm whether Team Toner publish a street address. Arizto
   * operates without shopfronts, so this may correctly stay a service-area
   * business — in which case leave `streetAddress` empty and `areaServed`
   * (derived from the suburb list) carries the local signal on its own.
   */
  business: {
    streetAddress: "",
    addressLocality: "Palmerston North",
    addressRegion: "Manawatū-Whanganui",
    postalCode: "",
    addressCountry: "NZ",
    /** Indicative, for schema `priceRange` — not a quote. */
    priceRange: "2% + GST commission",
  },
  contact: {
    // Enquiries route here per the client's onboarding answer.
    email: "thetoners@arizto.co.nz",
    // Landline shown in the footer and on /contact as an alternative for
    // clients who'd rather not call a mobile.
    // TODO(client): confirm this is the landline Allan wants published.
    office: "06 354 4722",
    region: "Palmerston North · Feilding · Ashhurst · Manawatū",
  },
  /**
   * Only *relative* performance figures live here. Absolute counts (e.g. a
   * running homes-sold total or the "of 350+ agents" pool size) date the site
   * and need manual upkeep, so they were removed at the client's request —
   * don't reintroduce one.
   *
   * The client amendment of 31 Aug 2026 retired the "#7 nationwide" claim:
   * there is now a *single* ranking claim, `rankingLine`, rendered verbatim
   * wherever the line appears (hero badge, Proven Results, Sold, About,
   * Appraisal) and always followed by `rankingFootnote` plus a `*` linking to
   * /terms#rankings. Prose that restates the claim uses sentence case
   * ("Arizto's No.1 agents — Palmerston North & Manawatū.*"). Don't
   * reintroduce a nationwide ranking figure without new terms copy to back it.
   */
  stats: {
    rankingLine: "ARIZTO'S No.1 AGENTS – PALMERSTON NORTH & MANAWATŪ",
    rankingFootnote: "Based on Arizto sales results as at August 2026.",
    commission: "2% + GST",
  },
  /**
   * The seller guarantee. Final launch brief (Aug 2026) reverted the earlier
   * "The Toner Guarantee" branding — always render `guarantee.name`, and keep
   * it "No Sale — No Fee".
   */
  guarantee: {
    name: "No Sale — No Fee",
    summary: "If your property doesn't sell, you don't pay us a commission.",
  },
  /** Site-wide appraisal banner (client brief §11), shown on every page. */
  cta: {
    title: "Curious what your property could sell for?",
    description:
      "Get an honest, evidence-based appraisal from Arizto's No.1 agents in Palmerston North & Manawatū.*",
    note: "No pressure. No obligation. Just straightforward advice.",
  },
  /** The three fee pillars, shown as a strip under the Sell/About intros. */
  feePillars: ["2% + GST Commission", "No Upfront Costs", "No Sale — No Fee"],
  /**
   * The four "Why Team Toner" benefits. Home and Sell carry the same four
   * pillars with slightly different supporting lines (per the client brief).
   */
  sellingPoints: [
    {
      title: "Two agents working for you",
      detail:
        "Allan & Karen personally work together throughout your sale — from strategy and marketing to buyer follow-up and negotiation.",
    },
    {
      title: "Proven results",
      detail: "Arizto's No.1 agents — Palmerston North & Manawatū.*",
    },
    {
      title: "Premium marketing",
      detail:
        "Professional marketing designed to get your property noticed by more buyers.",
    },
    {
      title: "A smarter fee",
      detail: "2% + GST Commission. No Upfront Costs. No Sale — No Fee.",
    },
  ],
  sellingPointsSell: [
    {
      title: "Two agents working for you",
      detail:
        "Allan & Karen personally work together throughout your sale — from strategy and marketing to buyer follow-up and negotiation.",
    },
    {
      title: "Proven results",
      detail: "Arizto's No.1 agents — Palmerston North & Manawatū.*",
    },
    {
      title: "Premium marketing",
      detail: "Professional marketing designed to maximise buyer exposure.",
    },
    {
      title: "A smarter fee",
      detail: "2% + GST Commission. No Upfront Costs. No Sale — No Fee.",
    },
  ],
  suburbs: [
    { name: "Palmerston North", slug: "palmerston-north" },
    { name: "Feilding", slug: "feilding" },
    { name: "Ashhurst", slug: "ashhurst" },
    { name: "Manawatū", slug: "manawatu" },
  ],
  /**
   * TODO(client): Allan to supply the real profile URLs.
   *
   * Deliberately empty rather than pointing at facebook.com / instagram.com /
   * youtube.com — a link to a network's home page is a dead link that costs
   * credibility. Empty entries are filtered out of the footer and out of the
   * schema `sameAs` graph, so the icons simply don't render until they're real.
   */
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  /**
   * Header/footer menu wording, editable under Site settings → Menu labels.
   * Only the labels are client-editable; the routes in `mainNav` are fixed
   * (they're indexed URLs).
   */
  navLabels: {
    home: "Home",
    listings: "Listings",
    sold: "Sold",
    sell: "Sell",
    suburbs: "Suburbs",
    about: "About",
    resources: "Resources",
    contact: "Contact",
  },
  /**
   * Independent profiles that describe the *same* entity. These become schema
   * `sameAs` links, which is how Google and the AI answer engines connect
   * teamtoner.co.nz to the reviews and listings held on other platforms.
   */
  externalProfiles: {
    arizto: "https://www.arizto.co.nz/our-people/profile/team%20-toner",
    // TODO(client): Google Business Profile URL — the single highest-value
    // entry here. Needs the profile created and verified first.
    googleBusiness: "",
    // TODO(client): the Toners' RateMyAgent profile (they have reviews there).
    rateMyAgent: "",
  },
};

export type SiteConfig = typeof siteConfig;

/**
 * Every configured external profile, placeholders removed. Used for schema
 * `sameAs` and anywhere else the entity graph is expressed.
 */
export function entitySameAs(config: SiteConfig = siteConfig): string[] {
  return [
    ...Object.values(config.social),
    ...Object.values(config.externalProfiles),
  ].filter((url) => url.length > 0);
}

/** Google truncates SERP titles past roughly this many characters. */
export const TITLE_MAX = 60;

/**
 * Pick the most informative title that still fits in the SERP.
 *
 * Generated titles (listings, suburbs) vary wildly in length — a long suburb
 * name plus a city plus the brand suffix runs well past 60 characters. Pass
 * candidates from richest to leanest and the first that fits wins, so nothing
 * gets truncated mid-word and no page silently loses its brand suffix when it
 * didn't need to.
 */
export function fitTitle(candidates: string[]): string {
  return (
    candidates.find((c) => c.length <= TITLE_MAX) ??
    candidates[candidates.length - 1]
  );
}

export type SocialNetwork =
  | keyof typeof siteConfig.social
  | "googleBusiness"
  | "rateMyAgent";

/**
 * Profiles that are actually configured, for rendering the footer icons:
 * the social networks plus the Google Business and RateMyAgent profiles,
 * which the client also expects to see as icons.
 */
export function configuredSocials(config: SiteConfig = siteConfig) {
  const { googleBusiness, rateMyAgent } = config.externalProfiles;
  return (
    [
      ...Object.entries(config.social),
      ["googleBusiness", googleBusiness],
      ["rateMyAgent", rateMyAgent],
    ] as [SocialNetwork, string][]
  ).filter(([, url]) => Boolean(url));
}

/**
 * SEO page titles supplied by the client. These are set as `title.absolute`
 * so they replace (rather than append to) the "| Team Toner" template.
 */
export const seoTitles = {
  home: "Team Toner | Palmerston North Real Estate Agents | Arizto",
  about: "Allan & Karen Toner | Palmerston North Real Estate Agents",
  sell: "Sell Your Home | Team Toner Palmerston North Real Estate",
  suburbs: "Palmerston North & Manawatū Real Estate | Team Toner",
  resources: "Free Property Selling Guides | Team Toner",
  contact: "Contact Team Toner | Palmerston North Real Estate Agents",
  listings: "Homes for Sale | Team Toner Palmerston North & Manawatū",
  sold: "Recently Sold | Team Toner Palmerston North & Manawatū",
  appraisal: "Free Property Appraisal | Team Toner Palmerston North",
} as const;

export type NavItem = { title: string; href: string };

/**
 * Header/footer menu with the CMS-editable labels applied. Pass the result
 * of `getSiteConfig()`; the bare default is only right for build-time code.
 */
export function mainNav(config: SiteConfig = siteConfig): NavItem[] {
  const labels = config.navLabels;
  return [
    { title: labels.home, href: "/" },
    { title: labels.listings, href: "/listings" },
    { title: labels.sold, href: "/sold" },
    { title: labels.sell, href: "/sell" },
    { title: labels.suburbs, href: "/suburbs" },
    { title: labels.about, href: "/about" },
    { title: labels.resources, href: "/resources" },
    { title: labels.contact, href: "/contact" },
  ];
}
