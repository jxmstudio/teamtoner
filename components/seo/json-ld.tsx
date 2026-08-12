import { siteConfig } from "@/lib/site";
import { suburbs } from "@/lib/content/suburbs";
import type { Listing } from "@/lib/content/types";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RealEstateAgentJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: siteConfig.agents.allan.phone,
        image: `${siteConfig.url}/team/allan-karen.jpg`,
        areaServed: suburbs.map((s) => ({ "@type": "Place", name: s.name })),
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
      }}
    />
  );
}

/** Breadcrumb trail for nested pages (listings, suburbs). */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.path}`,
        })),
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }}
    />
  );
}

export function ListingJsonLd({
  listing,
  suburbName,
}: {
  listing: Listing;
  suburbName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SingleFamilyResidence",
        name: `${listing.address}, ${suburbName}`,
        description: listing.description.join(" "),
        url: `${siteConfig.url}/listings/${listing.slug}`,
        image: listing.images.map((src) => `${siteConfig.url}${src}`),
        numberOfBedrooms: listing.beds,
        numberOfBathroomsTotal: listing.baths,
        address: {
          "@type": "PostalAddress",
          streetAddress: listing.address,
          addressLocality: suburbName,
          addressRegion: "Manawatū-Whanganui",
          addressCountry: "NZ",
        },
        broker: { "@id": `${siteConfig.url}#organization` },
      }}
    />
  );
}
