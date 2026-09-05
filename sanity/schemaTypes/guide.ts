import { defineField, defineType } from "sanity";

/**
 * A downloadable seller guide, optionally with an on-page article version at
 * /resources/<slug>. Mirrors `Guide` in lib/content/types.ts.
 */
export const guide = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  groups: [
    { name: "guide", title: "Guide", default: true },
    { name: "article", title: "Article page" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "guide",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address (slug)",
      type: "slug",
      description: "Guides with article content publish at /resources/<this>. Click Generate after entering the title.",
      options: { source: "title", maxLength: 96 },
      group: "guide",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the guide card.",
      group: "guide",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. “Selling”, “Moving”, “Buying”.",
      initialValue: "Selling",
      group: "guide",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      type: "number",
      description:
        "Controls where this guide appears on the Guides page. Lower numbers show first (1 is the top spot). Leave blank to follow the numbered guides, oldest first.",
      group: "guide",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "pdfFile",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
      description: "The downloadable booklet. Leave empty to show a “coming soon” badge.",
      group: "guide",
    }),
    defineField({
      name: "published",
      title: "First published",
      type: "date",
      description: "Shown in the article byline.",
      group: "article",
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      description: "Update when the article content is substantively revised.",
      group: "article",
    }),
    defineField({
      name: "process",
      title: "Step-by-step guide",
      type: "boolean",
      description: "Turn on when the sections below describe a sequence of steps (helps Google show them as steps).",
      initialValue: false,
      group: "article",
    }),
    defineField({
      name: "body",
      title: "Article sections",
      type: "array",
      description: "Adding sections here publishes the guide as a web page at /resources/<slug>. Leave empty for a download-only guide.",
      group: "article",
      of: [
        {
          type: "object",
          name: "guideSection",
          title: "Section",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text", rows: 3 }],
              description: "One entry per paragraph.",
              validation: (r) => r.required().min(1),
            }),
            defineField({
              name: "bullets",
              title: "Bullet points",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "comparison",
      title: "Comparison table",
      type: "object",
      description: "Optional at-a-glance table shown above the sections.",
      group: "article",
      fields: [
        defineField({ name: "caption", title: "Caption", type: "string" }),
        defineField({
          name: "columns",
          title: "Column headings",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              name: "comparisonRow",
              title: "Row",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells (one per column, in order)",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
              preview: {
                select: { cells: "cells" },
                prepare: ({ cells }: { cells?: string[] }) => ({
                  title: cells?.join(" · ") ?? "Row",
                }),
              },
            },
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "_createdAt", direction: "asc" },
      ],
    },
    { title: "Title A–Z", name: "title", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", sortOrder: "sortOrder" },
    prepare({ title, subtitle, sortOrder }) {
      const order = typeof sortOrder === "number" ? `#${sortOrder} · ` : "";
      return { title, subtitle: `${order}${subtitle ?? ""}` };
    },
  },
});
