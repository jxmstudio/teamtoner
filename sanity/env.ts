/*
 * Sanity project coordinates. Values come from .env.local (see .env.example).
 *
 * Until NEXT_PUBLIC_SANITY_PROJECT_ID is set the site runs entirely from the
 * typed fixtures in lib/content/* — nothing breaks, /studio just shows a
 * setup notice. See README "Sanity CMS" for the one-time project setup.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-08-01";

/** True once a real project id is configured. Gates every CMS read. */
export const sanityConfigured = /^[a-z0-9][a-z0-9-]*$/.test(projectId);
