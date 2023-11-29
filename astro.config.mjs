import { defineConfig } from 'astro/config'
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import dotenv from "dotenv"
import i18n from "./src/services/i18n"
import sitemap from "@astrojs/sitemap"
import remarkGFM from "remark-gfm"
import remarkDefinitionList from "remark-definition-list"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

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
  },
  markdown: {
    remarkPlugins: [remarkGFM, remarkDefinitionList, remarkMath],
    rehypePlugins: [rehypeKatex]
  }
})
