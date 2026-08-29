"use client";

import { usePathname } from "next/navigation";

// Literal rather than an import from lib/site-password so the gate's password
// fallback never ends up in the client bundle.
const PASSWORD_PATH = "/password";
const STUDIO_PATH = "/studio";

/**
 * Hides site chrome (header/footer) on the pre-launch password screen and in
 * the embedded Sanity Studio, which brings its own full-viewport UI.
 */
export function HideOnGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden =
    pathname === PASSWORD_PATH ||
    pathname === STUDIO_PATH ||
    pathname.startsWith(`${STUDIO_PATH}/`);
  return hidden ? null : <>{children}</>;
}
