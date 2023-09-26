import { vitePreprocess } from '@astrojs/svelte'
import sveltePreprocess from "svelte-preprocess"

export default {
	preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      postcss: true
    })
  ],
}
