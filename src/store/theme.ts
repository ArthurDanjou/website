import { defineStore } from 'pinia'
import type { ColorsTheme, Theme } from '~~/types'
import { THEMES, Themes } from '~~/types'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const currentTheme = ref<Theme>(Themes[THEMES.RainbowTheme])
    const currentColor = ref<ColorsTheme>(currentTheme.value.colors[0])

    const nextTheme = () => {
      const themes = Object.values(Themes)
      const currentIndex = themes.findIndex(theme => theme.name === currentTheme.value.name)
      const nextIndex = (currentIndex + 1) % themes.length
      currentTheme.value = themes[nextIndex]
      currentColor.value = currentTheme.value.colors[0]
    }

    const nextColor = () => {
      const colors = currentTheme.value.colors
      const currentIndex = colors.indexOf(currentColor.value)
      const nextIndex = (currentIndex + 1) % colors.length
      currentColor.value = colors[nextIndex]
    }

    const getTheme = computed(() => currentTheme)
    const getColor = computed(() => currentColor)

    return {
      getTheme,
      getColor,
      nextTheme,
      nextColor,
    }
  },
  {
    persist: true,
  },
)
