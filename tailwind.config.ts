import type { Config } from 'tailwindcss'
import { ColorsTheme } from './types'

export default <Partial<Config>>{
  safelist: [
    // Theme text colors
    ...Object.values(ColorsTheme).map(color => `text-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:text-${color}-500`),
    ...'bg-black dark:bg-white dark:text-black text-white'.split(' '),

    // Theme background colors
    ...Object.values(ColorsTheme).map(color => `bg-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:bg-${color}-500`),
    ...'text-black dark:text-white'.split(' '),
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 0 10px 1px rgba(0,0,0,.1)',
      },
    },
  },
}
