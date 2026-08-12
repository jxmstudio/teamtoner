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
    "Allan & Karen Toner — a husband-and-wife real estate team ranked #7 of 350+ Arizto agents nationwide and #1 in Palmerston North & Manawatū. Two agents working for you, premium marketing, and a 2% + GST commission with no upfront costs.",
  url: "https://teamtoner.co.nz",
  brand: {
    parent: "Arizto",
    // TODO(client): confirm REAA licence details to display
    reaa: "Arizto Ltd — Licensed REAA 2008",
  },
  agents: {
    allan: { name: "Allan Toner", phone: "027 255 8735", role: "Licensed Salesperson" },
    karen: { name: "Karen Toner", phone: "027 214 5700", role: "Licensed Salesperson" },
  },
  contact: {
    // Enquiries route here per the client's onboarding answer.
    email: "thetoners@arizto.co.nz",
    region: "Palmerston North · Feilding · Ashhurst · Manawatū",
  },
  // Both figures appear in the client's materials — kept together, easy to update.
  stats: {
    nationalRank: "#7",
    agentPool: "350+",
    regionRank: "#1",
    regionName: "Palmerston North & Manawatū",
    // TODO(client): confirm exact homes-sold figure (">400+")
    homesSold: "400+",
    commission: "2% + GST",
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
      detail: "Allan & Karen personally work together throughout your sale.",
    },
    {
      title: "Proven results",
      detail: "Palmerston North & Manawatū's #1 Arizto team.",
    },
    {
      title: "Premium marketing",
      detail:
        "Professional marketing designed to get your property noticed by more buyers.",
    },
    {
      title: "A smarter fee",
      detail: "2% + GST commission. No upfront costs. No Sale — No Fee.",
    },
  ],
  sellingPointsSell: [
    {
      title: "Two agents working for you",
      detail: "Allan & Karen personally work together throughout your sale.",
    },
    {
      title: "Proven results",
      detail: "Palmerston North & Manawatū's #1 Arizto team.",
    },
    {
      title: "Premium marketing",
      detail: "Professional marketing designed to maximise buyer exposure.",
    },
    {
      title: "A smarter fee",
      detail: "2% + GST. No upfront costs. No Sale — No Fee.",
    },
  ],
  suburbs: [
    { name: "Palmerston North", slug: "palmerston-north" },
    { name: "Feilding", slug: "feilding" },
    { name: "Ashhurst", slug: "ashhurst" },
    { name: "Manawatū", slug: "manawatu" },
  ],
  // TODO(client): confirm social handles/links
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
  ariztoProfile:
    "https://www.arizto.co.nz/our-people/profile/team%20-toner",
} as const;

export type SiteConfig = typeof siteConfig;

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
  appraisal: "Book a Free Property Appraisal | Team Toner Palmerston North",
} as const;

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Listings", href: "/listings" },
  { title: "Sold", href: "/sold" },
  { title: "Sell", href: "/sell" },
  { title: "Suburbs", href: "/suburbs" },
  { title: "About", href: "/about" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
] as const;
