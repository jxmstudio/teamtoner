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
