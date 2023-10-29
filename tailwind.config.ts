import type { Config } from 'tailwindcss'
import { ColorsTheme } from './types'

export default {
  safelist: [
    // Theme text colors
    ...Object.values(ColorsTheme).map(color => `text-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `!text-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:text-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `group-hover:text-${color}-500`),
    ...'bg-black dark:bg-white dark:text-black text-white'.split(' '),

    // Theme background colors
    ...Object.values(ColorsTheme).map(color => `bg-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:bg-${color}-500`),
    ...'text-black dark:text-white'.split(' '),

    // Theme border colors
    ...Object.values(ColorsTheme).map(color => `border-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:border-${color}-500`),
    ...'border-black dark:border-white'.split(' '),
  ],
} satisfies Partial<Config>
