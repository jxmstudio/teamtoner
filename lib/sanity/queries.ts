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
