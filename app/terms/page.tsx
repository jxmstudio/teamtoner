import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for the ${siteConfig.name} website.`,
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
