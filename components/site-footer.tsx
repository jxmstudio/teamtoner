import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";

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

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-script text-3xl text-white">{siteConfig.name}</p>
          <p className="mt-2 max-w-md text-sm text-white/70">
            {siteConfig.description}
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
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-teal">
                  {item.title}
                </Link>
              </li>
            ))}
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
            <li className="text-white/60">{siteConfig.contact.region}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-teal">
              <Facebook className="size-5" />
            </a>
            <a href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-teal">
              <Instagram className="size-5" />
            </a>
            <a href={siteConfig.social.youtube} aria-label="YouTube" className="hover:text-teal">
              <Youtube className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.brand.reaa}.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-teal">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-teal">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
