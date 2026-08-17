import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { HideOnGate } from "@/components/hide-on-gate";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Palmerston North real estate",
    "Palmerston North real estate agents",
    "Team Toner",
    "Allan and Karen Toner",
    "Arizto",
    "Manawatū real estate",
    "Feilding real estate",
    "Ashhurst real estate",
    "sell my house Palmerston North",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Site-wide so every page resolves to the same business entity — the
            listing and breadcrumb nodes reference this @id. */}
        <OrganizationJsonLd />
        <HideOnGate>
          <SiteHeader />
        </HideOnGate>
        <main className="flex-1">{children}</main>
        <HideOnGate>
          <SiteFooter />
        </HideOnGate>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
