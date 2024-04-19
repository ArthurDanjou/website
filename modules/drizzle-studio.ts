import {defineNuxtModule} from 'nuxt/kit'
import {addCustomTab} from '@nuxt/devtools-kit'

export default defineNuxtModule({
	meta: {
		name: 'drizzle-studio',
		version: '0.0.1',
	},
	setup() {
		addCustomTab({
			name: 'drizzle-studio',
			title: 'Drizzle Studio',
			icon: 'simple-icons:drizzle',
			view: {
				type: 'iframe',
				src: 'https://local.drizzle.studio/?themeId=azX2nOTScT9U6SWEmlq7z',
			},
		})
	},
})
