import type {Config} from 'tailwindcss'
import {ColorsTheme} from './types'

export default {
  content: [
    'content/**/*.md',
  ],
  safelist: [
    ...Object.values(ColorsTheme).map(color => `prose-${color}`),
    ...Object.values(ColorsTheme).map(color => `border-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `hover:border-${color}-500`),
    ...Object.values(ColorsTheme).map(color => `dark:hover:border-${color}-500`),
  ],
} satisfies Partial<Config>
