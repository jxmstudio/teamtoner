import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

/**
 * Read-only client for published content. `null` until the project id is
 * configured — callers (lib/data.ts) fall back to the typed fixtures, so the
 * site keeps working before the CMS is connected.
 */
export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Live API rather than the CDN: pages are already cached by Next (ISR +
      // the publish webhook), and reading the CDN here meant a webhook-driven
      // re-render could re-cache a stale value for another revalidate window.
      useCdn: false,
      perspective: "published",
    })
  : null;
