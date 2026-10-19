/**
 * Google Analytics 4 event helpers — the one place the site's event names
 * live (documented for the client in docs/analytics-events.md).
 *
 * The site reports the things the client actually cares about — appraisal
 * requests, other enquiries, phone taps and email taps — plus the YouTube
 * subscribe click, each with the page it happened on (`page_path`), so the
 * monthly report can show enquiries by source. Everything is a no-op until
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (see .env.example), so local dev and
 * preview deployments never pollute the production property.
 */

/** The GA4 measurement id ("G-XXXXXXXXXX"), or "" when analytics is off. */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();

export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

/** Every GA4 event the site sends. Mark the first four as key events in GA4. */
export const ANALYTICS_EVENTS = [
  "appraisal_form_submit",
  "contact_form_submit",
  "phone_click",
  "email_click",
  "youtube_subscribe_click",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

/** Which lead forms count as appraisal requests and which as other enquiries. */
export type LeadFormKind = "appraisal" | "contact" | "enquiry";

/**
 * The event for a successfully delivered lead form. Listing enquiries count
 * as contact enquiries; `form_kind` on the event still tells them apart.
 */
export function leadEventFor(kind: LeadFormKind): AnalyticsEvent {
  return kind === "appraisal" ? "appraisal_form_submit" : "contact_form_submit";
}

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event from client code. Safe to call anywhere: it does nothing
 * on the server, when analytics is disabled, or before the gtag script has
 * loaded. Every event carries `page_path` (the current path unless the caller
 * passes one); undefined params are dropped so the payload stays tidy.
 */
export function trackEvent(name: AnalyticsEvent, params: Params = {}, enabled = analyticsEnabled): void {
  if (typeof window === "undefined" || !enabled) return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  const clean = Object.fromEntries(
    Object.entries({ page_path: window.location?.pathname, ...params }).filter(
      ([, v]) => v !== undefined && v !== ""
    )
  );
  gtag("event", name, clean);
}

/**
 * Classify a clicked anchor for the delegated contact-link tracker. Returns
 * the event to send, or null for links that aren't contact actions.
 * Exported so the mapping is unit-testable without a DOM.
 */
export function contactEventFor(href: string, trackAttr?: string | null): AnalyticsEvent | null {
  if (trackAttr === "youtube_subscribe_click") return "youtube_subscribe_click";
  if (/^tel:/i.test(href)) return "phone_click";
  if (/^mailto:/i.test(href)) return "email_click";
  return null;
}
