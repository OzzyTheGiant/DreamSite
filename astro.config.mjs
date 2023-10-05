import { defineConfig } from 'astro/config'
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import dotenv from "dotenv"
import i18n from "./src/services/i18n"
import sitemap from "@astrojs/sitemap"

dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: process.env.APP_URL,
  integrations: [svelte(), tailwind(), i18n(), sitemap()],
  server: {
    port: 8080
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000"
        }
      }
    }
  }
})
