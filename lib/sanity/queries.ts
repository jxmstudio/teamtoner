import groq from "groq";

/**
 * Projections map Sanity documents straight onto the fixture types in
 * lib/content/types.ts, so everything downstream of lib/data.ts is agnostic
 * about where content came from.
 */
export const LISTINGS_QUERY = groq`*[_type == "listing" && defined(slug.current)] | order(coalesce(soldDate, _createdAt) desc) {
  "slug": slug.current,
  title,
  status,
  address,
  suburb,
  beds,
  baths,
  parking,
  priceDisplay,
  "description": coalesce(description, []),
  "features": coalesce(features, []),
  "images": coalesce(images[].asset->url, []),
  "video": videoUrl,
  featured,
  soldPrice,
  soldDate
}`;

export const SITE_VIDEOS_QUERY = groq`*[_type == "siteVideo" && featured == true && defined(url)] | order(coalesce(order, 0) asc) {
  title,
  url,
  caption
}`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(coalesce(order, 0) asc, _createdAt asc) {
  author,
  source,
  rating,
  quote,
  suburb,
  featured
}`;

export const GUIDES_QUERY = groq`*[_type == "guide" && defined(slug.current)] | order(_createdAt asc) {
  "slug": slug.current,
  title,
  description,
  category,
  "published": published,
  "updated": updated,
  "pdf": coalesce(pdfFile.asset->url, ""),
  process,
  "body": body[]{
    heading,
    "paragraphs": coalesce(paragraphs, []),
    bullets
  },
  "comparison": comparison{
    caption,
    "columns": coalesce(columns, []),
    "rows": coalesce(rows[].cells, [])
  }
}`;

export const SUBURBS_QUERY = groq`*[_type == "suburb" && defined(slug.current)] | order(_createdAt asc) {
  "slug": slug.current,
  name,
  parent,
  blurb,
  "commentary": commentary
}`;

/**
 * The settings singleton, projected onto the nested shape of `siteConfig` in
 * lib/site.ts so lib/data.ts can deep-merge it over the typed defaults.
 * Empty/unset fields come back null and fall through to the defaults.
 */
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  tagline,
  "strapline": tagline,
  description,
  footerTagline,
  footerDescription,
  "brand": { "reaa": reaa },
  "guarantee": { "name": guaranteeName, "summary": guaranteeSummary },
  "agents": {
    "allan": { "phone": allanPhone },
    "karen": { "phone": karenPhone }
  },
  "contact": { "email": contactEmail, "office": officePhone, "region": region },
  "stats": { nationalRank, regionRank, regionName, commission },
  feePillars,
  "sellingPoints": sellingPoints[]{ title, detail },
  "sellingPointsSell": sellingPointsSell[]{ title, detail },
  "social": { facebook, instagram, youtube },
  "externalProfiles": { googleBusiness, rateMyAgent }
}`;
