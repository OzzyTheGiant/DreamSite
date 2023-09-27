import { defineConfig } from 'astro/config'
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import i18n from "./src/services/i18n"

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), i18n()]
});