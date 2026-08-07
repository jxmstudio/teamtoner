/**
 * Simple site-wide password gate (pre-launch).
 *
 * The site is now pointed at the client's own domain, so it shouldn't be
 * publicly readable until Allan & Karen sign off. This is a soft gate to keep
 * casual visitors and search engines out — not real authentication.
 *
 * To lift the gate at launch: set SITE_PASSWORD_ENABLED=false in Vercel (or
 * delete proxy.ts and app/password/).
 */

export const ACCESS_COOKIE = "tt_access";
export const PASSWORD_PATH = "/password";

/** 30 days — long enough that the client isn't re-typing it constantly. */
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

export function gateEnabled(): boolean {
  return process.env.SITE_PASSWORD_ENABLED !== "false";
}

export function sitePassword(): string {
  return process.env.SITE_PASSWORD || "toner123";
}

/**
 * Cookie value = SHA-256 of the current password, so the plain password is
 * never stored in the browser and changing SITE_PASSWORD invalidates everyone.
 * Web Crypto (rather than node:crypto) so this works on either runtime.
 */
export async function accessToken(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(`teamtoner:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string compare — both values are same-length hex here. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Only allow same-site paths back out of the gate (no open redirects). */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith(PASSWORD_PATH)) return "/";
  return value;
}
