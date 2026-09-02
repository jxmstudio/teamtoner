import { listing } from "./listing";
import { featuredListings } from "./featuredListings";
import { siteVideo } from "./siteVideo";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";
import { guide } from "./guide";
import { suburb } from "./suburb";
import { pageCopyTypes } from "./pageCopy";

/** Types edited through a pinned singleton desk entry (never created/deleted). */
export const singletonTypes = new Set([
  "siteSettings",
  "featuredListings",
  ...pageCopyTypes.map((t) => t.name),
]);

export const schemaTypes = [
  listing,
  featuredListings,
  siteVideo,
  testimonial,
  guide,
  suburb,
  siteSettings,
  ...pageCopyTypes,
];
