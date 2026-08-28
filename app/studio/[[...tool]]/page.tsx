import type { Metadata } from "next";
import { sanityConfigured } from "@/sanity/env";
import { StudioClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

// The studio is a pure client app — one static shell serves every /studio path.
export const dynamic = "force-static";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center gap-3 px-6 py-24">
        <h1 className="text-2xl font-bold">Content Studio isn’t connected yet</h1>
        <p className="text-muted-foreground">
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> (and in the
          Vercel project settings) to the Sanity project id, then restart the dev server. See
          “Sanity CMS” in the README for the one-time setup.
        </p>
      </main>
    );
  }
  return <StudioClient />;
}
