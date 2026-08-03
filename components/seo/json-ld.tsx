import { siteConfig } from "@/lib/site";

export function RealEstateAgentJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.agents.allan.phone,
    areaServed: siteConfig.suburbs.map((s) => s.name),
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brand.parent,
    },
    employee: [siteConfig.agents.allan, siteConfig.agents.karen].map((a) => ({
      "@type": "Person",
      name: a.name,
      telephone: a.phone,
      jobTitle: a.role,
    })),
    slogan: siteConfig.strapline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
