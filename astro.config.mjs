import { defineConfig } from 'astro/config'
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import dotenv from "dotenv"
import i18n from "./src/services/i18n"
import sitemap from "@astrojs/sitemap"
import remarkDefinitionList from "remark-definition-list"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_APP_URL,
  integrations: [svelte(), tailwind(), i18n(), sitemap()],
  server: {
    port: 8080
  },
  vite: {
    server: {
      proxy: {
        "/items": {
          target: "http://localhost:8055",
          changeOrigin: true,
        },
        "/e-commerce": {
          target: "http://localhost:8055",
          changeOrigin: true,
        },
        "/assets": {
          target: "http://localhost:8055",
          changeOrigin: true,
        }
      }
    }
  },
  markdown: {
    gfm: true,
    shikiConfig: {
      langs: [
        "dart",
        "php",
        "python",
        "javascript",
        "typescript",
        "c#",
        "kotlin",
        "go",
        "rust",
        "html",
        "css"
      ],
      theme: "dracula",
      wrap: false
    },
    remarkPlugins: [remarkDefinitionList, remarkMath],
    rehypePlugins: [rehypeKatex]
  }
})
