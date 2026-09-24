/**
 * Google Analytics 4 event helpers.
 *
 * The site reports three things the client actually cares about — appraisal
 * and enquiry form submissions, phone taps and email taps — as GA4 events,
 * plus the YouTube subscribe click. Everything is a no-op until
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (see .env.example), so local dev and
 * preview deployments never pollute the production property.
 *
 * Event names follow GA4's recommended-event vocabulary where one exists
 * (`generate_lead`) so they can be flagged as key events without renaming.
 */

/** The GA4 measurement id ("G-XXXXXXXXXX"), or "" when analytics is off. */
export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();

export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

export type AnalyticsEvent =
  | "generate_lead"
  | "phone_click"
  | "email_click"
  | "youtube_subscribe_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event from client code. Safe to call anywhere: it does nothing
 * on the server, when analytics is disabled, or before the gtag script has
 * loaded. Undefined params are dropped so the payload stays tidy.
 */
export function trackEvent(name: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined" || !analyticsEnabled) return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
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
