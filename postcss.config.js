import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
	syntax: 'postcss-scss',
	plugins: [
		tailwind(),
		autoprefixer(),
	],
}
