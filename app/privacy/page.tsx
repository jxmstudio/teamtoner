import type { Metadata } from "next";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, stores and protects the personal information you share when you request an appraisal or contact Allan & Karen Toner.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" eyebrow="Legal" />
      <Section>
        <Container className="prose-brand max-w-3xl space-y-6 text-foreground/90">
          <p className="text-sm text-muted-foreground">
            Template policy — to be reviewed/replaced with {siteConfig.name}&rsquo;s
            approved wording.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Who we are</h2>
            <p className="mt-2">
              {siteConfig.legalName} ({siteConfig.brand.reaa}) operates{" "}
              {siteConfig.url}. We are committed to protecting your privacy in
              accordance with the Privacy Act 2020.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Information we collect
            </h2>
            <p className="mt-2">
              When you submit an enquiry or appraisal request, we collect the
              information you provide — such as your name, email, phone number and
              property details — so we can respond to you.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              How we use your information
            </h2>
            <p className="mt-2">
              We use your information solely to respond to your enquiry and provide
              our real estate services. We do not sell your information, and we
              only share it where necessary to deliver those services or where
              required by law.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
            <p className="mt-2">
              You may request access to, or correction of, the personal information
              we hold about you by contacting us at{" "}
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
