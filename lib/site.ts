/**
 * Central site configuration for Team Toner.
 *
 * These are the "siteSettings" values used across the marketing site. Anything
 * marked TODO(client) is a placeholder awaiting confirmation from Allan & Karen
 * (see the onboarding checklist) and will later be driven by Sanity siteSettings.
 */
export const siteConfig = {
  name: "Team Toner",
  legalName: "Team Toner — Allan & Karen Toner",
  // TODO(client): confirm final tagline ("Good Honest Real Estate" vs Arizto "Smarter Real Estate")
  tagline: "Smarter Real Estate",
  strapline: "Nobody sells more property than Team Toner.",
  description:
    "Allan & Karen Toner — a top-ranked Arizto real estate team serving Palmerston North, Feilding, Ashhurst and the wider Manawatū. Premium marketing, low commission, no sale no fee.",
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
    commission: "2% +GST",
  },
  sellingPoints: [
    { title: "2% +GST Commission", detail: "A smarter fee that keeps more in your pocket." },
    { title: "Premium Marketing", detail: "The full marketing package buyers expect — and more." },
    { title: "No Sale, No Fee", detail: "No upfront costs. You only pay when we sell." },
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
