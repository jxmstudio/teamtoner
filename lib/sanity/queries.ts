import groq from "groq";

/**
 * Projections map Sanity documents straight onto the fixture types in
 * lib/content/types.ts, so everything downstream of lib/data.ts is agnostic
 * about where content came from.
 */
/**
 * Listings in site display order: hand-numbered ones first (lowest number on
 * top), then everything else newest first. The Sold page re-sorts by sold
 * date in lib/data.ts.
 */
export const LISTINGS_QUERY = groq`*[_type == "listing" && defined(slug.current)] | order(coalesce(sortOrder, 1000000) asc, coalesce(soldDate, _createdAt) desc) {
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
  "documents": select(
    status == "sold" => [],
    coalesce(documents[defined(file.asset) || defined(url)]{
      title,
      "url": coalesce(file.asset->url, url)
    }, [])
  ),
  // Only upcoming open homes reach the site; finished ones drop off within
  // the page's revalidate window (60s) with no editing needed.
  "openHomes": select(
    status == "sold" => [],
    coalesce(openHomes[defined(start) && defined(end) && dateTime(end) > now()]{ start, end }, [])
  ),
  sortOrder,
  // Retired flag, still read so a deploy ahead of "npm run migrate:featured"
  // keeps the same three homes on the home page. Null once migrated.
  featured,
  soldPrice,
  soldDate
}`;

/**
 * The hand-picked home-page featured grid, as listing slugs: the hero plus up
 * to two others in display order. Resolved against the listings by
 * getFeaturedListings in lib/data.ts.
 */
export const FEATURED_LISTINGS_QUERY = groq`*[_type == "featuredListings"][0] {
  "hero": hero->slug.current,
  "others": coalesce(others[]->slug.current, [])
}`;

export const SITE_VIDEOS_QUERY = groq`*[_type == "siteVideo" && featured == true && defined(url)] | order(coalesce(order, 0) asc) {
  title,
  url,
  caption,
  published
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
  "stats": { rankingLine, rankingFootnote, commission },
  "cta": { "title": ctaTitle, "description": ctaDescription, "note": ctaNote },
  feePillars,
  "sellingPoints": sellingPoints[]{ title, detail },
  "sellingPointsSell": sellingPointsSell[]{ title, detail },
  "social": { facebook, instagram, youtube },
  "externalProfiles": { googleBusiness, rateMyAgent }
}`;
