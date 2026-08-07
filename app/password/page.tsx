import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/lib/site";
import { safeNext } from "@/lib/site-password";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = {
  title: "Password required",
  robots: { index: false, follow: false },
};

export default async function PasswordPage(props: PageProps<"/password">) {
  const { next } = await props.searchParams;
  const target = safeNext(typeof next === "string" ? next : "/");

  return (
    // Site header/footer are hidden on this route (see HideOnGate).
    <div className="flex min-h-[100svh] items-center justify-center bg-night px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <Image
          src="/brand/team-toner-arizto-lockup.png"
          alt={siteConfig.name}
          width={220}
          height={80}
          priority
          className="mx-auto h-auto w-48"
        />

        <h1 className="mt-8 text-2xl font-semibold text-white">
          This site is private
        </h1>
        <p className="mt-2 text-sm text-white/70">
          {siteConfig.name}&rsquo;s new website is still being finalised. Enter
          the password to take a look.
        </p>

        <div className="mt-8">
          <PasswordForm next={target} />
        </div>

        <p className="mt-8 text-xs text-white/40">
          {siteConfig.brand.reaa}
        </p>
      </div>
    </div>
  );
}
