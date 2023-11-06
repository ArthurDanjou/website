import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import { ColorsTheme } from './types'

export default {
  content: [
    'content/**/*.md',
  ],
  safelist: [
    ...Object.values(ColorsTheme).map(color => `prose-${color}`),
  ],
  plugins: [
    typography(),
  ],
} satisfies Partial<Config>
