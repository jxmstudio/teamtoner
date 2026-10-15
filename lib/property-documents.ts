/**
 * Preset titles for a listing's Property documents dropdown (client request,
 * 7 Sep 2026), in the order Allan listed them. Anything else is entered under
 * "Other" with a typed title. Adding a name here means re-running
 * scripts/migrate-document-titles.ts so existing "Other" entries with that
 * wording snap onto the preset.
 */
export const PROPERTY_DOCUMENT_TITLES = [
  "Title",
  "Title Explanation Form",
  "PNCC Rates",
  "Horizons Rates",
  "MDC Rates",
  "Disclosure Document",
  "PNCC Property File",
  "MDC Property File",
] as const;

/** The dropdown value that reveals the free-text title field. */
export const OTHER_DOCUMENT_TITLE = "Other";

/**
 * REA consumer guides shown on every listing that isn't sold, after the
 * listing's own documents (client request, 17 Sep 2026). Agents must make
 * these available to buyers, so they're added here rather than re-entered
 * per listing; an entry the listing already links to isn't repeated.
 */
export const STANDARD_LISTING_DOCUMENTS = [
  {
    title: "REA Sale & Purchase Guide",
    url: "https://www.rea.govt.nz/buyers-and-sellers/read-our-guides/",
  },
  {
    title: "Buyers Guide",
    url: "https://www.settled.govt.nz/assets/Refreshed-Guides-2022-/Buying-journey-guide-/4864_REA_Buyer-Journey-Guide-2022-A4-DIGITAL-Update-_ENGLISH_FINAL-v3.pdf",
  },
] as const;
