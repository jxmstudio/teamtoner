"use client";

import { usePathname } from "next/navigation";

const STUDIO_PATH = "/studio";

/**
 * Hides site chrome (header/footer) inside the embedded Sanity Studio, which
 * brings its own full-viewport UI.
 */
export function HideOnStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden =
    pathname === STUDIO_PATH || pathname.startsWith(`${STUDIO_PATH}/`);
  return hidden ? null : <>{children}</>;
}
