"use client";

import { useSyncExternalStore } from "react";
import { Studio } from "sanity";
import config from "@/sanity.config";

/**
 * The Studio is browser-only (it talks to api.sanity.io and measures the
 * viewport), so mount it after hydration rather than during prerender.
 */
const emptySubscribe = () => () => {};

export function StudioClient() {
  // True only after hydration (server snapshot is false) — the lint-clean
  // equivalent of the setState-in-effect mount flag.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  if (!mounted) return null;

  return (
    <div style={{ height: "100dvh" }} data-ui="StudioRoot">
      <Studio config={config} unstable_globalStyles />
    </div>
  );
}
