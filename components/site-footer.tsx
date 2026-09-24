import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Facebook, Google, Instagram, RateMyAgent, Youtube } from "@/components/brand/social-icons";
import { FeeText, TermsFootnote } from "@/components/brand/commission";
import { configuredSocials, mainNav } from "@/lib/site";
import { localServicePath, type LocalServiceArea } from "@/lib/local-services";
import { getLocalServiceAreas, getSiteConfig, hasArticles } from "@/lib/data";

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
  const [siteConfig, insights, areas] = await Promise.all([
    getSiteConfig(),
    hasArticles(),
    getLocalServiceAreas(),
  ]);
  const socials = configuredSocials(siteConfig);
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2">
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
            {[...mainNav(siteConfig, { insights }), { title: "Free Appraisal", href: "/appraisal" }].map(
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

        {/* Areas — every page links the four area hubs and their appraisal
            pages, so the local cluster is never more than one click away. */}
        {areas.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Areas we sell in
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/suburbs/${area.slug}`} className="hover:text-teal">
                    {area.name}
                  </Link>
                  <span className="text-white/40"> · </span>
                  <Link
                    href={localServicePath("appraisal", area.slug as LocalServiceArea)}
                    className="text-white/60 hover:text-teal"
                  >
                    appraisal
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

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
