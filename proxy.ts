import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_COOKIE,
  PASSWORD_PATH,
  accessToken,
  gateEnabled,
  safeEqual,
  sitePassword,
} from "@/lib/site-password";

// Next 16: `middleware.ts` is deprecated — this file convention is `proxy.ts`.
export async function proxy(request: NextRequest) {
  if (!gateEnabled()) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  // The gate itself (and the server action that posts to it) must stay open.
  if (pathname === PASSWORD_PATH) return NextResponse.next();

  // Sanity's revalidation webhook has no cookie; it authenticates with its
  // own HMAC signature inside the route instead.
  if (pathname === "/api/revalidate") return NextResponse.next();

  const cookie = request.cookies.get(ACCESS_COOKIE)?.value;
  if (cookie && safeEqual(cookie, await accessToken(sitePassword()))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = PASSWORD_PATH;
  url.search = "";
  if (pathname !== "/") url.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next's own assets and static files (the password page
  // needs its CSS/JS to load).
  matcher: ["/((?!_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
