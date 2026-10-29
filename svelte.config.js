import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// GitHub Pages project site: https://klx1204.github.io/polishededitor-cn/
		adapter: adapter({ fallback: 'index.html' }),
		paths: {
			base: process.env.BASE_PATH ?? '/polishededitor-cn'
		},
		alias: {
			$data: 'src/data',
			$extractors: 'src/extractors',
			$parsers: 'src/parsers',
			$ui: 'src/lib/components/ui',
			$components: 'src/lib/components'
		}
	}
};

export default config;
