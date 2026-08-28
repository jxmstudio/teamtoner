import { defineCliConfig } from "sanity/cli";

/**
 * Targets `npx sanity …` CLI commands (cors, dataset, exec) at the Team Toner
 * project. The id is public (it ships in NEXT_PUBLIC_SANITY_PROJECT_ID), so
 * hardcoding it here is fine and keeps the CLI working without env loading.
 */
export default defineCliConfig({
  api: {
    projectId: "l0i206kw",
    dataset: "production",
  },
});
