"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

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
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
