"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, analyticsEnabled, contactEventFor, trackEvent } from "@/lib/analytics";

const STUDIO_PATH = "/studio";

/**
 * Loads GA4 (when configured) and tracks the contact actions that count as
 * conversions on a real-estate site: phone taps, email taps and the YouTube
 * subscribe button. One delegated listener covers every `tel:` / `mailto:`
 * anchor on the site — header, footer, appraisal and contact pages, listing
 * cards — so nothing has to remember to opt in.
 *
 * Nothing loads inside the embedded Sanity Studio: the client editing content
 * is not a visitor.
 */
export function Analytics() {
  const pathname = usePathname();
  const inStudio = pathname === STUDIO_PATH || pathname.startsWith(`${STUDIO_PATH}/`);

  useEffect(() => {
    if (!analyticsEnabled || inStudio) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const name = contactEventFor(anchor.getAttribute("href") ?? "", anchor.dataset.track);
      if (!name) return;
      trackEvent(name, {
        link_url: anchor.getAttribute("href") ?? undefined,
        link_text: anchor.textContent?.trim().slice(0, 80) || undefined,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [inStudio]);

  if (!analyticsEnabled || inStudio) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
