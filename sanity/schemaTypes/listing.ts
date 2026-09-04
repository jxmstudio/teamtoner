import { defineField, defineType } from "sanity";
import { suburbs } from "../../lib/content/suburbs";

/**
 * A property listing. Mirrors the `Listing` type in lib/content/types.ts —
 * lib/data.ts maps documents of this type onto that shape, so a field added
 * here needs a matching field there (and in the GROQ projection) to reach
 * the site.
 */
export const listing = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Photos & video" },
    { name: "documents", title: "Documents" },
    { name: "sold", title: "Sold" },
  ],
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description: "Street address shown as the page heading, e.g. “12 Rata Street, Hokowhitu”.",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "Marketing headline, e.g. “Sunny family home in a sought-after pocket”.",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address (slug)",
      type: "slug",
      description: "The listing lives at /listings/<this>. Click Generate after entering the address.",
      options: { source: "address", maxLength: 96 },
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "For sale", value: "for-sale" },
          { title: "Under offer", value: "under-offer" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "for-sale",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "suburb",
      title: "Suburb / area",
      type: "string",
      options: {
        list: suburbs.map((s) => ({ title: s.name, value: s.slug })),
      },
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beds",
      title: "Bedrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: "baths",
      title: "Bathrooms",
      type: "number",
      group: "details",
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: "parking",
      title: "Parking spaces",
      type: "number",
      group: "details",
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: "priceDisplay",
      title: "Price / method of sale",
      type: "string",
      description: "Shown exactly as written, e.g. “Enquiries over $829,000”, “Deadline Sale”, “By Negotiation”.",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      type: "number",
      description:
        "Controls where this listing appears on the Listings page, suburb pages and the home page. Lower numbers show first (1 is the top spot). Leave blank to sort by newest after any numbered listings.",
      group: "details",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "One entry per paragraph.",
      group: "details",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "features",
      title: "Feature bullet points",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),
    defineField({
      name: "openHomes",
      title: "Open homes",
      type: "array",
      description:
        "Shown as an “Open homes” panel on the listing page. Each one disappears from the website by itself once its end time has passed — you can delete old ones here whenever you like, but you don’t have to.",
      group: "details",
      hidden: ({ document }) => document?.status === "sold",
      of: [
        {
          type: "object",
          name: "openHome",
          title: "Open home",
          fields: [
            defineField({
              name: "start",
              title: "Starts",
              type: "datetime",
              options: { timeStep: 15 },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "end",
              title: "Ends",
              type: "datetime",
              options: { timeStep: 15 },
              validation: (rule) =>
                rule.required().custom((value, context) => {
                  const start = (context.parent as { start?: string } | undefined)?.start;
                  if (!value || !start) return true;
                  return new Date(value) > new Date(start) ? true : "Must be after the start time";
                }),
            }),
          ],
          preview: {
            select: { start: "start", end: "end" },
            prepare({ start, end }) {
              const fmt = (iso?: string) =>
                iso
                  ? new Date(iso).toLocaleString("en-NZ", {
                      timeZone: "Pacific/Auckland",
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "…";
              const past = end ? new Date(end) < new Date() : false;
              return {
                title: `${fmt(start)} – ${fmt(end)}`,
                subtitle: past ? "Finished — no longer shown on the website" : undefined,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      // Grid layout shows each photo as a large tile that can be dragged to
      // reorder — the default list rows are too small to tell photos apart.
      options: { layout: "grid" },
      description:
        "To add many photos at once, select them all in the file dialog via the Upload button, or drag them from your computer onto this box. Drag tiles to reorder — the first photo is the hero / card image.",
      group: "media",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube video",
      type: "url",
      description: "Paste a YouTube link (watch, share or Shorts URL). Shown on the listing page under the photos. Swap or clear it any time.",
      group: "media",
      validation: (rule) =>
        rule.uri({ scheme: ["https", "http"] }).custom((value) => {
          if (!value) return true;
          return /(youtube\.com|youtu\.be)\//.test(value)
            ? true
            : "Must be a YouTube link";
        }),
    }),
    defineField({
      name: "documents",
      title: "Property documents",
      type: "array",
      description:
        "Shown as a “Property documents” panel on the listing page — e.g. Certificate of Title, rates, LIM, disclosure form. Each entry needs a title plus either an uploaded file or a link. Removed automatically when the listing is published as Sold.",
      group: "documents",
      of: [
        {
          type: "object",
          name: "propertyDocument",
          title: "Document",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "e.g. “Certificate of Title”, “PNCC Rates”, “Disclosure Form”.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "file",
              title: "File",
              type: "file",
              options: { accept: "application/pdf,.doc,.docx" },
              description: "Upload the document (PDF preferred).",
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              description:
                "Use instead of an upload for documents hosted elsewhere, e.g. the REA Sale and Purchase Agreement guide.",
              validation: (rule) =>
                rule.uri({ scheme: ["https", "http"] }).custom((value, context) => {
                  const parent = context.parent as { file?: { asset?: unknown } } | undefined;
                  if (!value && !parent?.file?.asset) {
                    return "Add a file upload or a link";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: { title: "title", url: "url" },
            prepare({ title, url }) {
              return { title, subtitle: url ?? "Uploaded file" };
            },
          },
        },
      ],
    }),
    defineField({
      name: "soldPrice",
      title: "Sold price",
      type: "string",
      description: "e.g. “$712,000”. Leave blank to show just “Sold”.",
      group: "sold",
      hidden: ({ document }) => document?.status !== "sold",
    }),
    defineField({
      name: "soldDate",
      title: "Sold date",
      type: "date",
      description: "Orders the Sold page (newest first).",
      group: "sold",
      hidden: ({ document }) => document?.status !== "sold",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    { title: "Newest first", name: "newest", by: [{ field: "_createdAt", direction: "desc" }] },
    { title: "Address A–Z", name: "address", by: [{ field: "address", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "address",
      subtitle: "priceDisplay",
      media: "images.0",
      status: "status",
      sortOrder: "sortOrder",
    },
    prepare({ title, subtitle, media, status, sortOrder }) {
      const label =
        status === "sold" ? "SOLD" : status === "under-offer" ? "UNDER OFFER" : "FOR SALE";
      const order = typeof sortOrder === "number" ? `#${sortOrder} · ` : "";
      return { title, subtitle: `${order}${label} — ${subtitle ?? ""}`, media };
    },
  },
});
