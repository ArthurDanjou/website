import {defineStore} from 'pinia'
import {ColorsTheme} from '~~/types'

export const useColorStore = defineStore(
	'color',
	() => {
		const colorCookie = useCookie('color', { path: '/', default: () => ColorsTheme.RED })

		const appConfig = useAppConfig()
		watch(colorCookie, (newColor) => {
			appConfig.ui.primary = newColor
		}, { immediate: true })

		function setColor(color: string) {
			colorCookie.value = color as ColorsTheme
		}

		const getColor = computed(() => colorCookie)

		return {
			getColor,
			setColor,
		}
	},
	{
		persist: true,
	},
)
