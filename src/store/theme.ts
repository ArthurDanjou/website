import { defineStore } from 'pinia'
import type { ColorsTheme, Theme } from '~~/types'
import { THEMES, Themes } from '~~/types'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const currentTheme = ref<Theme>(Themes[THEMES.RainbowTheme])
    const currentColor = ref<ColorsTheme>(currentTheme.value.colors[0])
    let intervalId: NodeJS.Timeout | null = null

    const isAvailable = (next: Theme): boolean => {
      if (!next.availability)
        return true

      const today = new Date()
      const [startDay, startMonth] = next.availability.start.split('/')
      const [endDay, endMonth] = next.availability.end.split('/')
      const start = new Date(today.getFullYear(), Number(startMonth) - 1, Number(startDay))
      const end = new Date(today.getFullYear(), Number(endMonth) - 1, Number(endDay))

      return today >= start && today <= end
    }

    const swapColor = () => {
      if (intervalId !== null)
        clearInterval(intervalId)

      intervalId = setInterval(() => {
        const colors = currentTheme.value.colors
        const currentIndex = colors.indexOf(currentColor.value)
        const nextIndex = (currentIndex + 1) % colors.length
        currentColor.value = colors[nextIndex]
      }, 5000)
    }

    const nextTheme = () => {
      const themes = Object.values(Themes)
      const currentIndex = themes.findIndex(theme => theme.name === currentTheme.value.name)
      let nextIndex = (currentIndex + 1) % themes.length

      while (!isAvailable(themes[nextIndex])) {
        nextIndex = (nextIndex + 1) % themes.length
        if (nextIndex === currentIndex)
          return
      }

      currentTheme.value = themes[nextIndex]
      currentColor.value = currentTheme.value.colors[0]
      swapColor()
    }

    const getTheme = computed(() => currentTheme)
    const getColor = computed(() => currentColor)

    return {
      getTheme,
      getColor,
      nextTheme,
      swapColor,
    }
  },
  {
    persist: true,
  },
)
