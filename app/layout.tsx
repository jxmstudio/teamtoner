import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { HideOnStudio } from "@/components/hide-on-studio";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import { getSiteConfig } from "@/lib/data";

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

// Site settings (tagline, contact details, …) are CMS-managed — refresh the
// static shell periodically so studio edits reach every page's chrome.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${config.name} — ${config.tagline}`,
    template: `%s | ${config.name}`,
  },
  description: config.description,
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
    siteName: config.name,
    title: `${config.name} — ${config.tagline}`,
    description: config.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} — ${config.tagline}`,
    description: config.description,
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  return (
    <html
      lang="en-NZ"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Site-wide so every page resolves to the same business entity — the
            listing and breadcrumb nodes reference this @id. */}
        <OrganizationJsonLd />
        <HideOnStudio>
          <SiteHeader phone={config.agents.allan.phone} />
        </HideOnStudio>
        <main className="flex-1">{children}</main>
        <HideOnStudio>
          <SiteFooter />
        </HideOnStudio>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
