"use client";

import { useEffect, useState } from "react";
import { Studio } from "sanity";
import config from "@/sanity.config";

/**
 * The Studio is browser-only (it talks to api.sanity.io and measures the
 * viewport), so mount it after hydration rather than during prerender.
 */
export function StudioClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ height: "100dvh" }} data-ui="StudioRoot">
      <Studio config={config} unstable_globalStyles />
    </div>
  );
}
