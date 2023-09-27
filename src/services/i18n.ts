import i18next, { type InitOptions } from "i18next"
import type { AstroIntegration } from "astro"
import fsBackend from "i18next-fs-backend"

export default function i18n(options?: InitOptions): AstroIntegration {
  return {
    name: "i18n",
    hooks: {
      "astro:config:setup": async ({ isRestart }) => {
        if (isRestart) return i18next.reloadResources()

        await i18next.use(fsBackend).init({ 
          lng: "en", 
          fallbackLng: "en", 
          debug: true,
          backend: {
            loadPath: "src/locales/{{lng}}.json"
          }, 
          ...options 
        })
      }
    }
  }
}
