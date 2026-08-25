"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/lib/site";

const allanTel = `tel:${siteConfig.agents.allan.phone.replace(/\s/g, "")}`;
const teal = "bg-teal text-teal-foreground hover:bg-teal/90";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Header height tracks the logo — enlarged at the client's request for
          readability, so the bar grows with it rather than cropping. */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.name}>
          {/* team-toner-signature-mark.png is the original signature cropped
              to its ink with the white background removed — the source PNG is
              62% empty margin, which is why the mark rendered tiny. The
              full white-background original stays for JSON-LD/schema use. */}
          <Image
            src="/brand/team-toner-signature-mark.png"
            alt={`${siteConfig.name} Real Estate`}
            width={1256}
            height={417}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-foreground/70"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={allanTel}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
          >
            <Phone className="size-4" />
            {siteConfig.agents.allan.phone}
          </a>
          <ButtonLink href="/appraisal" className={cn("h-10 px-4", teal)}>
            Get a Free Appraisal
          </ButtonLink>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink href="/appraisal" size="sm" className={teal}>
            Appraisal
          </ButtonLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-script text-2xl text-primary">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col px-4" aria-label="Mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-secondary",
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <SheetFooter>
                <ButtonLink
                  href="/appraisal"
                  onClick={() => setOpen(false)}
                  className={cn("h-10 px-4", teal)}
                >
                  Get a Free Appraisal
                </ButtonLink>
                <a
                  href={allanTel}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
                >
                  <Phone className="size-4" /> Call Allan
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
