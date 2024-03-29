import i18next, { type InitOptions } from "i18next"
import type { AstroIntegration } from "astro"
import fsBackend from "i18next-fs-backend"

export default function i18n(options?: InitOptions): AstroIntegration {
  return {
    name: "i18n",
    hooks: {
      "astro:config:setup": async ({ isRestart, addWatchFile, config }) => {
        const languages = JSON.parse(process.env.LANGUAGES ?? "")

        for (const language of languages) {
          addWatchFile(new URL(`./src/locales/${language}.json`, config.root))
        }

        if (isRestart) return i18next.reloadResources()

        await i18next.use(fsBackend).init({
          fallbackLng: "en",
          debug: true,
          supportedLngs: languages,
          backend: {
            loadPath: "src/locales/{{lng}}.json"
          },
          ...options
        })
      }
    }
  }
}

export async function switchSiteLanguage(url: URL): Promise<void> {
  const [_, lang] = url.pathname.split("/")
  if (JSON.parse(process.env.LANGUAGES ?? "").includes(lang)) await i18next.changeLanguage(lang)
  else await i18next.changeLanguage("en")
}

export function getTranslationsByKeys(module: string, keys: string[]): {[key: string]: string} {
  const trans =  keys.reduce((map, key) => {
    map[key] = i18next.t(`${module}.${key}`)
    return map
  }, {} as { [key: string]: string } )

  return trans
}
