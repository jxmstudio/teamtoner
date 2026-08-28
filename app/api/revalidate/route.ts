import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Sanity → Next revalidation webhook. Sanity POSTs here on publish/unpublish
 * (configured in sanity.io/manage → API → Webhooks), and we drop the whole
 * page cache so edits show instantly instead of waiting out the 60 s ISR
 * window (which stays on as the fallback if this hook ever breaks).
 *
 * The site is small enough that revalidating everything beats maintaining a
 * doc-type → affected-paths map: listings surface on the home page, /listings,
 * /sold, every suburb page and the sitemap.
 */

const SIGNATURE_HEADER = "sanity-webhook-signature";

/**
 * Sanity signs `<timestamp>.<rawBody>` with HMAC-SHA256 (base64url, no
 * padding) and sends `t=<timestamp>,v1=<signature>`.
 */
function isValidSignature(body: string, header: string, secret: string): boolean {
  const match = /t=(\d+)[, ]+v1=([\w-]+)/.exec(header);
  if (!match) return false;
  const [, timestamp, signature] = match;
  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, error: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const header = request.headers.get(SIGNATURE_HEADER) ?? "";
  if (!isValidSignature(body, header, secret)) {
    return NextResponse.json(
      { revalidated: false, error: "invalid signature" },
      { status: 401 }
    );
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
