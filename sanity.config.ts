"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Desk layout: Site settings is a singleton (one fixed document) pinned to the
 * top; the content types follow as plain lists.
 */
const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("listing").title("Listings"),
      S.documentTypeListItem("siteVideo").title("Videos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("guide").title("Guides"),
      S.documentTypeListItem("suburb").title("Suburbs"),
    ]);

/**
 * Studio configuration for the embedded studio at /studio.
 * The "unconfigured" fallback only exists so the module can load before the
 * project id is set — app/studio never mounts the Studio in that state.
 */
export default defineConfig({
  name: "team-toner",
  title: "Team Toner",
  projectId: projectId || "unconfigured",
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // The singleton is edited through its pinned desk entry, never created.
    templates: (templates) =>
      templates.filter((t) => t.schemaType !== "siteSettings"),
  },
  document: {
    // No duplicate/delete/unpublish on the settings singleton.
    actions: (actions, context) =>
      context.schemaType === "siteSettings"
        ? actions.filter(
            (a) => a.action && ["publish", "discardChanges", "restore"].includes(a.action)
          )
        : actions,
  },
});
