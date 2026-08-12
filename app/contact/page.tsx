import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/brand/page-header";
import { Container, Section } from "@/components/brand/primitives";
import { LeadForm } from "@/components/forms/lead-form";
import { Card, CardContent } from "@/components/ui/card";
import { seoTitles, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: seoTitles.contact },
  description:
    "Contact Allan & Karen Toner — Palmerston North real estate agents. Call either of us directly, or send a message and we'll get straight back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { agents, contact } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Team Toner"
        description="Thinking of selling, buying, or simply have a property question? We'd love to hear from you. Call Allan or Karen directly, or send us a message below."
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Call Allan or Karen directly
            </h2>
            <ContactRow icon={<Phone className="size-5" />} label={agents.allan.name}>
              <a className="hover:text-primary" href={`tel:${agents.allan.phone.replace(/\s/g, "")}`}>
                {agents.allan.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-5" />} label={agents.karen.name}>
              <a className="hover:text-primary" href={`tel:${agents.karen.phone.replace(/\s/g, "")}`}>
                {agents.karen.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="size-5" />} label="Email">
              <a className="hover:text-primary" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="size-5" />} label="Servicing">
              {contact.region}
            </ContactRow>
            <p className="rounded-xl border border-border bg-secondary/50 p-5 text-sm text-muted-foreground">
              {siteConfig.brand.reaa}. Part of the {siteConfig.brand.parent} network.
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-foreground">
                Send us a message
              </h2>
              <div className="mt-6">
                <LeadForm kind="contact" />
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-lg font-semibold text-foreground">{children}</p>
      </div>
    </div>
  );
}
