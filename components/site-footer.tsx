import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FeeText, TermsFootnote } from "@/components/brand/commission";
import { configuredSocials, mainNav } from "@/lib/site";
import { getSiteConfig } from "@/lib/data";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Youtube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 12s0-3.5-.45-5.18a2.6 2.6 0 0 0-1.83-1.84C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.72.48a2.6 2.6 0 0 0-1.83 1.84C1 8.5 1 12 1 12s0 3.5.45 5.18a2.6 2.6 0 0 0 1.83 1.84C5.1 19.5 12 19.5 12 19.5s6.9 0 8.72-.48a2.6 2.6 0 0 0 1.83-1.84C23 15.5 23 12 23 12ZM9.75 15.02v-6l5.2 3-5.2 3Z" />
    </svg>
  );
}

/** The Google "G", for the Google Business Profile (reviews) link. */
function Google(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.32 2.98-7.26Z" />
      <path d="M12 22c2.7 0 4.97-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.75-5.6-4.1H3.07v2.58A10 10 0 0 0 12 22Z" />
      <path d="M6.4 13.92A6 6 0 0 1 6.09 12c0-.67.11-1.31.31-1.92V7.5H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.5l3.33-2.58Z" />
      <path d="M12 5.98c1.47 0 2.79.5 3.82 1.5l2.87-2.87C16.96 3 14.7 2 12 2a10 10 0 0 0-8.93 5.5l3.33 2.58c.8-2.35 3-4.1 5.6-4.1Z" />
    </svg>
  );
}

/** RateMyAgent has no public brand glyph; a rating star reads as "reviews". */
function RateMyAgent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.5l2.94 6.1 6.7.9-4.9 4.66 1.23 6.66L12 17.6l-5.97 3.22 1.23-6.66-4.9-4.66 6.7-.9L12 2.5Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  googleBusiness: Google,
  rateMyAgent: RateMyAgent,
} as const;

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  googleBusiness: "Google reviews",
  rateMyAgent: "RateMyAgent reviews",
} as const;

export async function SiteFooter() {
  const siteConfig = await getSiteConfig();
  const socials = configuredSocials(siteConfig);
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-script text-3xl text-white">{siteConfig.name}</p>
          <p className="mt-2 text-sm font-semibold text-white">
            {siteConfig.footerTagline}
          </p>
          <p className="mt-1 max-w-md text-sm text-white/70">
            <FeeText>{siteConfig.footerDescription}</FeeText>
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Image
              src="/brand/arizto-logo-white.png"
              alt="Arizto"
              width={120}
              height={32}
              className="h-6 w-auto opacity-90"
            />
            <span className="text-xs text-white/50">{siteConfig.brand.reaa}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {/* Footer-only "Free Appraisal" entry (brief §13); the header
                already carries its own appraisal CTA button. */}
            {[...mainNav(siteConfig), { title: "Free Appraisal", href: "/appraisal" }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-teal">
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-teal"
              >
                <Mail className="size-4" /> {siteConfig.contact.email}
              </a>
            </li>
            <li>
              {siteConfig.agents.allan.name} ·{" "}
              <a
                href={`tel:${siteConfig.agents.allan.phone.replace(/\s/g, "")}`}
                className="hover:text-teal"
              >
                {siteConfig.agents.allan.phone}
              </a>
            </li>
            <li>
              {siteConfig.agents.karen.name} ·{" "}
              <a
                href={`tel:${siteConfig.agents.karen.phone.replace(/\s/g, "")}`}
                className="hover:text-teal"
              >
                {siteConfig.agents.karen.phone}
              </a>
            </li>
            <li>
              Office ·{" "}
              <a
                href={`tel:${siteConfig.contact.office.replace(/\s/g, "")}`}
                className="hover:text-teal"
              >
                {siteConfig.contact.office}
              </a>
            </li>
            <li className="text-white/60">{siteConfig.contact.region}</li>
          </ul>
          {/* Only render icons for profiles that are actually configured —
              linking to a network's home page is a dead link, and empty
              entries are also excluded from the schema sameAs graph. */}
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map(([network, href]) => {
                const Icon = SOCIAL_ICONS[network];
                return (
                  <a
                    key={network}
                    href={href}
                    aria-label={SOCIAL_LABELS[network]}
                    className="hover:text-teal"
                    rel="me noopener"
                    target="_blank"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.brand.reaa}.
            </p>
            {/* Site-wide landing point for every commission asterisk. */}
            <TermsFootnote className="mt-1 text-white/50" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-teal">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-teal">
              Terms
            </Link>
            {/* Agency credit — intentionally a followed link (no `nofollow`)
                so it passes SEO value back to the studio. */}
            <span>
              Website by{" "}
              <a
                href="https://jxmstudio.com/"
                title="jxmstudio — web design & development"
                className="text-white/70 hover:text-teal"
                target="_blank"
                rel="noopener"
              >
                jxmstudio
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
