import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindNesting from '@tailwindcss/nesting'

export default {
	syntax: 'postcss-scss',
	plugins: [
    tailwindNesting,
		tailwind(),
		autoprefixer(),
	],
}
