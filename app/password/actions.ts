"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  accessToken,
  safeNext,
  sitePassword,
} from "@/lib/site-password";

export type UnlockState = { error?: string };

export async function unlockSite(
  _prev: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const entered = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/"));

  if (entered !== sitePassword()) {
    // Small delay so the form can't be hammered too quickly.
    await new Promise((r) => setTimeout(r, 600));
    return { error: "That password isn't right. Please try again." };
  }

  const store = await cookies();
  store.set(ACCESS_COOKIE, await accessToken(sitePassword()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });

  // redirect() throws — must stay outside any try/catch.
  redirect(next);
}
