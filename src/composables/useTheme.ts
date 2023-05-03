import { useThemeStore } from '~/store/theme'
import { ColorsTheme } from '~~/types'

export const useTheme = () => {
  const { getColor } = useThemeStore()

  const getThemeTextColor = computed(() => {
    switch (getColor.value) {
      case ColorsTheme.BLUE:
        return 'text-blue-500'
      case ColorsTheme.ROSE:
        return 'text-rose-500'
      case ColorsTheme.ORANGE:
        return 'text-orange-500'
      case ColorsTheme.CYAN:
        return 'text-cyan-500'
      case ColorsTheme.GREEN:
        return 'text-green-500'
      case ColorsTheme.PURPLE:
        return 'text-purple-500'
      case ColorsTheme.RED:
        return 'text-red-500'
      case ColorsTheme.YELLOW:
        return 'text-yellow-500'
      case ColorsTheme.FUCHSIA:
        return 'text-fuchsia-500'
      case ColorsTheme.PINK:
        return 'text-pink-500'
      case ColorsTheme.VIOLET:
        return 'text-violet-500'
      case ColorsTheme.BLACK:
        return 'text-black dark:text-white'
      case ColorsTheme.WHITE:
        return 'text-black dark:text-white'
    }
  })

  const getThemeBackgroundColor = computed(() => {
    switch (getColor.value) {
      case ColorsTheme.BLUE:
        return 'bg-blue-500'
      case ColorsTheme.ROSE:
        return 'bg-rose-500'
      case ColorsTheme.ORANGE:
        return 'bg-orange-500'
      case ColorsTheme.CYAN:
        return 'bg-cyan-500'
      case ColorsTheme.GREEN:
        return 'bg-green-500'
      case ColorsTheme.PURPLE:
        return 'bg-purple-500'
      case ColorsTheme.RED:
        return 'bg-red-500'
      case ColorsTheme.YELLOW:
        return 'bg-yellow-500'
      case ColorsTheme.FUCHSIA:
        return 'bg-fuchsia-500'
      case ColorsTheme.PINK:
        return 'bg-pink-500'
      case ColorsTheme.VIOLET:
        return 'bg-violet-500'
      case ColorsTheme.BLACK:
        return 'bg-black dark:bg-white dark:text-black text-white'
      case ColorsTheme.WHITE:
        return 'bg-black dark:bg-white dark:text-black text-white'
    }
  })

  return {
    getThemeBackgroundColor,
    getThemeTextColor,
  }
}
