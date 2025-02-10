// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://chris2eliasgithub.io",
  base: "/valentines-project",
  integrations: [react()],
});
