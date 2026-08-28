import { defineField, defineType } from "sanity";

/**
 * Singleton (one document, `_id: "siteSettings"`) holding every site-wide
 * value the client can edit: taglines, contact details, stats, fee pillars,
 * selling points, social links. lib/data.ts deep-merges this document over
 * the typed defaults in lib/site.ts, so any field left empty here simply
 * falls back to the value shipped in code.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & taglines", default: true },
    { name: "contact", title: "Contact details" },
    { name: "stats", title: "Rankings & fee" },
    { name: "selling", title: "Why Team Toner" },
    { name: "social", title: "Social & profiles" },
    { name: "cta", title: "Appraisal banner" },
  ],
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown in the browser tab title and metadata, e.g. “Premium service. Proven results. A smarter fee.”",
      group: "brand",
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      description: "The description search engines show for the site.",
      group: "brand",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "string",
      description: "The line under the Team Toner script logo in the footer.",
      group: "brand",
    }),
    defineField({
      name: "footerDescription",
      title: "Footer description",
      type: "text",
      rows: 3,
      description: "Short blurb in the footer. A “*” after a ranking claim becomes a link to the rankings note.",
      group: "brand",
    }),
    defineField({
      name: "reaa",
      title: "REAA licence line",
      type: "string",
      description: "e.g. “Arizto Ltd — Licensed REAA 2008”. Shown in the footer and on legal pages.",
      group: "brand",
    }),
    defineField({
      name: "guaranteeName",
      title: "Guarantee name",
      type: "string",
      description: "e.g. “No Sale — No Fee”.",
      group: "brand",
    }),
    defineField({
      name: "guaranteeSummary",
      title: "Guarantee summary",
      type: "text",
      rows: 2,
      description: "One-sentence explanation of the guarantee.",
      group: "brand",
    }),

    defineField({
      name: "allanPhone",
      title: "Allan — mobile",
      type: "string",
      description: "e.g. “027 255 8735”. Shown in the header, footer and contact page.",
      group: "contact",
    }),
    defineField({
      name: "karenPhone",
      title: "Karen — mobile",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Enquiries email",
      type: "string",
      description: "Where site enquiries and lead-form emails are sent.",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "officePhone",
      title: "Office / landline",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "region",
      title: "Service region line",
      type: "string",
      description: "e.g. “Palmerston North · Feilding · Ashhurst · Manawatū”.",
      group: "contact",
    }),

    defineField({
      name: "nationalRank",
      title: "National ranking",
      type: "string",
      description: "e.g. “#7”. Update when the Arizto rankings change.",
      group: "stats",
    }),
    defineField({
      name: "regionRank",
      title: "Regional ranking",
      type: "string",
      description: "e.g. “No.1”.",
      group: "stats",
    }),
    defineField({
      name: "regionName",
      title: "Region name",
      type: "string",
      description: "e.g. “Palmerston North & Manawatū”.",
      group: "stats",
    }),
    defineField({
      name: "commission",
      title: "Commission rate",
      type: "string",
      description: "e.g. “2% + GST”. Every visible instance automatically carries the linked terms asterisk.",
      group: "stats",
    }),
    defineField({
      name: "feePillars",
      title: "Fee pillars",
      type: "array",
      of: [{ type: "string" }],
      description: "The pill strip, e.g. “2% + GST Commission”, “No Upfront Costs”, “No Sale — No Fee”.",
      group: "stats",
    }),

    defineField({
      name: "sellingPoints",
      title: "Why Team Toner — home page",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "detail", title: "Detail", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
        },
      ],
      description: "The four benefit cards on the home page. A “*” becomes a linked rankings asterisk.",
      group: "selling",
    }),
    defineField({
      name: "sellingPointsSell",
      title: "Why Team Toner — sell page",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "detail", title: "Detail", type: "text", rows: 2, validation: (r) => r.required() }),
          ],
        },
      ],
      description: "Same cards with sell-page wording. Leave empty to use the built-in wording.",
      group: "selling",
    }),

    defineField({
      name: "ctaTitle",
      title: "Banner title",
      type: "string",
      description: "The site-wide appraisal banner, e.g. “Curious what your property could sell for?”",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "Banner description",
      type: "text",
      rows: 2,
      description: "A “*” after a ranking claim becomes the linked rankings asterisk.",
      group: "cta",
    }),
    defineField({
      name: "ctaNote",
      title: "Banner note",
      type: "string",
      description: "Small line under the description.",
      group: "cta",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      description: "Full profile URL. Leave empty to hide the icon.",
      group: "social",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "googleBusiness",
      title: "Google Business Profile URL",
      type: "url",
      description: "Helps Google connect the site to your reviews.",
      group: "social",
    }),
    defineField({
      name: "rateMyAgent",
      title: "RateMyAgent profile URL",
      type: "url",
      group: "social",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
