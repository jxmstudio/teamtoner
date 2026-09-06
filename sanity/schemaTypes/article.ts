import { defineField, defineType } from "sanity";
import { ARTICLE_CATEGORIES } from "../../lib/insights";

/**
 * A Property Insights article, published at /insights/<slug> and listed under
 * its category at /insights/category/<category>. Mirrors `Article` in
 * lib/content/types.ts. The body reuses the guide's section editor.
 */
export const article = defineType({
  name: "article",
  title: "Insight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address (slug)",
      type: "slug",
      description: "Publishes at /insights/<this>. Click Generate after entering the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ARTICLE_CATEGORIES.map((c) => ({ title: c.label, value: c.slug })),
        layout: "radio",
      },
      initialValue: ARTICLE_CATEGORIES[0].slug,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the article card and used as the Google description.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "date",
      description: "Articles list newest first. Set a future date to hold an article back until then.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      description: "Update when the article is substantively revised.",
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Landscape works best (roughly 3:2). A branded placeholder shows without one.",
    }),
    defineField({
      name: "body",
      title: "Article sections",
      type: "array",
      description: "Each section has a heading, paragraphs and optional bullet points — the same editor as the guides.",
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: "object",
          name: "articleSection",
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
  ],
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "published", direction: "desc" }] },
    { title: "Title A–Z", name: "title", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", category: "category", published: "published", media: "cover" },
    prepare({ title, category, published, media }) {
      const label = ARTICLE_CATEGORIES.find((c) => c.slug === category)?.label ?? category ?? "";
      return { title, subtitle: [published, label].filter(Boolean).join(" · "), media };
    },
  },
});
