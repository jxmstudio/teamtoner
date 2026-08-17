import { entitySameAs, siteConfig } from "@/lib/site";
import { suburbs } from "@/lib/content/suburbs";
import { formatListingAddress } from "@/lib/data";
import type { Guide, Listing } from "@/lib/content/types";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Strip keys whose value is empty, so unconfirmed client data never ships. */
function defined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && !v.length)
    )
  ) as Partial<T>;
}

const ORG_ID = `${siteConfig.url}#organization`;

/**
 * The Team Toner business entity, rendered site-wide from the root layout.
 *
 * Everything hanging off `@id` elsewhere (listings, breadcrumbs) resolves back
 * to this node, so it needs to be present on every page rather than just the
 * home page — that's what lets Google and the AI answer engines treat the whole
 * domain as one known entity.
 */
export function OrganizationJsonLd() {
  const { business, agents, contact, brand } = siteConfig;
  const sameAs = entitySameAs();

  const address = defined({
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    postalCode: business.postalCode,
    addressCountry: business.addressCountry,
  });

  return (
    <>
      <JsonLd
        data={defined({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": ORG_ID,
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          description: siteConfig.description,
          url: siteConfig.url,
          email: contact.email,
          telephone: contact.office,
          image: `${siteConfig.url}/team/allan-karen.jpg`,
          logo: `${siteConfig.url}/brand/team-toner-signature.png`,
          priceRange: business.priceRange,
          address,
          // Service-area business: the suburbs are the local signal, whether or
          // not a street address is ever published.
          areaServed: suburbs.map((s) => ({ "@type": "Place", name: s.name })),
          sameAs,
          parentOrganization: {
            "@type": "Organization",
            name: brand.parent,
            url: "https://www.arizto.co.nz",
          },
          employee: [agents.allan, agents.karen].map((a) =>
            defined({
              "@type": "Person",
              name: a.name,
              telephone: a.phone,
              jobTitle: a.role,
              worksFor: { "@id": ORG_ID },
              // REAA licence, when supplied, is a verifiable credential.
              identifier: a.licence
                ? {
                    "@type": "PropertyValue",
                    name: "REAA 2008 licence number",
                    value: a.licence,
                  }
                : undefined,
            })
          ),
          slogan: siteConfig.strapline,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteConfig.url}#website`,
          url: siteConfig.url,
          name: siteConfig.name,
          inLanguage: "en-NZ",
          publisher: { "@id": ORG_ID },
        }}
      />
    </>
  );
}

/**
 * Declares what kind of page this is and ties it back to the business entity.
 * Cheap, and it stops /about and /contact — the two pages carrying the
 * strongest trust signals — from shipping with no markup at all.
 */
export function PageEntityJsonLd({
  type,
  path,
  name,
  description,
}: {
  type: "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description?: string;
}) {
  return (
    <JsonLd
      data={defined({
        "@context": "https://schema.org",
        "@type": type,
        url: `${siteConfig.url}${path}`,
        name,
        description,
        inLanguage: "en-NZ",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": ORG_ID },
      })}
    />
  );
}

/** Breadcrumb trail for nested pages (listings, suburbs, guides). */
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

/**
 * Collection markup for the index pages (/listings, /sold, /suburbs,
 * /resources) so the set of things on the page is machine-readable rather than
 * just a grid of links.
 */
export function ItemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={defined({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        description,
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: `${siteConfig.url}${item.path}`,
        })),
      })}
    />
  );
}

/** Guide pages published at /resources/<slug>. */
export function GuideArticleJsonLd({ guide }: { guide: Guide }) {
  return (
    <JsonLd
      data={defined({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        url: `${siteConfig.url}/resources/${guide.slug}`,
        datePublished: guide.published,
        dateModified: guide.updated ?? guide.published,
        inLanguage: "en-NZ",
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: guide.category,
      })}
    />
  );
}

/**
 * Step-by-step markup. Google can surface HowTo steps directly, and the answer
 * engines lean on it heavily when summarising a process.
 */
export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <JsonLd
      data={defined({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      })}
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
        name: formatListingAddress(listing.address, suburbName),
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
        broker: { "@id": ORG_ID },
      }}
    />
  );
}
