import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for the ${siteConfig.name} website, including the commission and fee terms that apply to ${siteConfig.guarantee.name} and our advertised ${siteConfig.stats.commission} rate.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Use" eyebrow="Legal" />
      <Section>
        <Container className="max-w-3xl space-y-6 text-foreground/90">
          <p className="text-sm text-muted-foreground">
            Template terms — to be reviewed/replaced with {siteConfig.name}&rsquo;s
            approved wording.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Use of this site</h2>
            <p className="mt-2">
              This website is provided by {siteConfig.legalName} for general
              information about our real estate services. By using it you agree to
              these terms.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Property information
            </h2>
            <p className="mt-2">
              Listing details are provided in good faith and believed to be
              accurate, but are not guaranteed. Prospective purchasers should make
              their own enquiries and rely on their own investigations.
            </p>
          </div>
          {/*
            Every asterisk beside the commission rate on the site links to this
            section (see components/brand/commission.tsx). Keep the `id` stable.
            TODO(client): Allan to have this wording confirmed before launch.
          */}
          <div id="commission" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-foreground">
              Commission and fees &mdash; T&rsquo;s &amp; C&rsquo;s
            </h2>
            <p className="mt-2">
              The {siteConfig.stats.commission} commission quoted on this site is
              our standard residential selling fee and is calculated on the final
              sale price. It is indicative only and does not form an offer or an
              agency agreement. The fee that applies to your property is the one
              recorded in the signed agency agreement between you and{" "}
              {siteConfig.legalName}.
            </p>
            <p className="mt-2">
              Marketing inclusions, the fee, and any minimum fee may vary
              depending on the property, the method of sale and the marketing
              package selected. Fees are exclusive of GST unless stated
              otherwise. Third-party costs, where they apply, are additional and
              will be disclosed to you in writing before you commit to them.
            </p>
            <p className="mt-2">
              <strong className="font-semibold text-foreground">
                {siteConfig.guarantee.name}:
              </strong>{" "}
              {siteConfig.guarantee.summary} The guarantee applies to the selling
              commission only and is subject to the terms of your signed agency
              agreement, including any agreed marketing costs and the conditions
              under which the agreement may end.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Licensing
            </h2>
            <p className="mt-2">
              {siteConfig.brand.reaa}. All real estate agency work is carried out
              in accordance with the Real Estate Agents Act 2008.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Email{" "}
              <a className="text-primary underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
