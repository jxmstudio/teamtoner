"use client";

import { usePathname } from "next/navigation";

// Literal rather than an import from lib/site-password so the gate's password
// fallback never ends up in the client bundle.
const PASSWORD_PATH = "/password";

/** Hides site chrome (header/footer) on the pre-launch password screen. */
export function HideOnGate({ children }: { children: React.ReactNode }) {
  return usePathname() === PASSWORD_PATH ? null : <>{children}</>;
}
