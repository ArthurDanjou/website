export default defineNuxtConfig({
	css: [
		'@/assets/css/main.scss',
	],

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	modules: [
		'@nuxt/content',
		'@nuxtjs/seo',
		'nuxt-auth-utils',
		'@nuxthq/studio',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'@nuxt/ui',
		'@nuxt/eslint',
	],

	colorMode: {
		preference: 'light',
		fallback: 'light',
		classPrefix: '',
		classSuffix: '',
	},

	components: [
		'components/',
		'components/header',
		'components/resume',
		'components/main',
	],

	content: {
		highlight: {
			theme: 'github-dark',
		},
	},

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: false,
				blockSpacing: true,
			},
		},
	},

	ui: {
		icons: 'all',
	},

	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	site: {
		url: 'https://arthurdanjou.fr',
		name: 'Arthur Danjou\'s website',
		description: 'I\'m Arthur DANJOU, a developer enjoying Cloud Infrastructure and Artificial Intelligence. Mathematics Student at Paris-Saclay',
	},

	runtimeConfig: {
		discordUserId: process.env.NUXT_DISCORD_USER_ID,
		discordId: process.env.NUXT_DISCORD_ID,
		discordToken: process.env.NUXT_DISCORD_TOKEN,
		wakatimeUserId: process.env.NUXT_WAKATIME_USER_UD,
		wakatimeCodig: process.env.NUXT_WAKATIME_CODING,
		wakatimeEditors: process.env.NUXT_WAKATIME_EDITORS,
		wakatimeLanguages: process.env.NUXT_WAKATIME_LANGUAGES,
		wakatimeOs: process.env.NUXT_WAKATIME_OS,
	},
})
