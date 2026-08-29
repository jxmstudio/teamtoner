import { defineField, defineType } from "sanity";

/**
 * A standalone YouTube video the agency can swap at will — e.g. the current
 * showcase / brand video. Videos marked "Show on the home page" render in the
 * home-page video section (the section is hidden while there are none).
 */
export const siteVideo = defineType({
  name: "siteVideo",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown above the video, e.g. “See how Team Toner markets your home”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "YouTube link",
      type: "url",
      description: "Paste any YouTube link (watch, share or Shorts URL). Replace it here to swap the video on the site.",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["https", "http"] })
          .custom((value) =>
            value && /(youtube\.com|youtu\.be)\//.test(value)
              ? true
              : "Must be a YouTube link"
          ),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
      description: "Optional line under the title.",
    }),
    defineField({
      name: "published",
      title: "Date published to YouTube",
      type: "date",
      description:
        "Google needs an upload date before it will show a video result. Without it the video still plays — it just isn't eligible for video-rich results.",
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
  },
});
