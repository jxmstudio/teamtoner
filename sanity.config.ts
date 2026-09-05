"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { pageCopyTypes } from "./sanity/schemaTypes/pageCopy";
import { clearDocumentsOnSold } from "./sanity/actions/clear-documents-on-sold";

/**
 * Desk layout: Site settings and the per-page copy documents are singletons
 * (one fixed document each, _id === type name) pinned above the content lists.
 */
const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      singleton(S, "featuredListings", "Featured properties"),
      S.listItem()
        .title("Page copy")
        .id("pageCopy")
        .child(
          S.list()
            .title("Page copy")
            .items(
              pageCopyTypes.map((t) => singleton(S, t.name, t.title ?? t.name))
            )
        ),
      S.divider(),
      // Listed in the order the site shows them: numbered listings first, then
      // newest — the same ordering LISTINGS_QUERY applies.
      S.listItem()
        .title("Listings")
        .id("listing")
        .schemaType("listing")
        .child(
          S.documentTypeList("listing")
            .title("Listings")
            .defaultOrdering([
              { field: "sortOrder", direction: "asc" },
              { field: "_createdAt", direction: "desc" },
            ])
        ),
      S.documentTypeListItem("siteVideo").title("Videos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      // Same display order as /resources: numbered guides first, then oldest.
      S.listItem()
        .title("Guides")
        .id("guide")
        .schemaType("guide")
        .child(
          S.documentTypeList("guide")
            .title("Guides")
            .defaultOrdering([
              { field: "sortOrder", direction: "asc" },
              { field: "_createdAt", direction: "asc" },
            ])
        ),
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
    // Singletons are edited through their pinned desk entries, never created.
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (actions, context) => {
      // No duplicate/delete/unpublish on singletons.
      if (singletonTypes.has(context.schemaType)) {
        return actions.filter(
          (a) => a.action && ["publish", "discardChanges", "restore"].includes(a.action)
        );
      }
      // Publishing a listing as Sold clears its property documents.
      if (context.schemaType === "listing") {
        return actions.map((a) => (a.action === "publish" ? clearDocumentsOnSold(a) : a));
      }
      return actions;
    },
  },
});
