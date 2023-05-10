import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, presetWind,
  transformerDirectives, transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { ColorsTheme } from './types'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetScrollbar(),
    presetWind({
      dark: 'class',
    }),
  ],
  theme: {
    boxShadow: {
      'header-active-light': 'inset 0 -1px 0 0 #eaeaea',
      'header-active-dark': 'inset 0 -1px 0 0 #333',
      'announcement-light': '0 0 0 1px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 4px 16px rgba(0,0,0,.05)',
      'announcement-dark': '0 0 0 1px rgba(150,150,150,.06), 0 2px 4px rgba(150,150,150,.1), 0 4px 16px rgba(150,150,150,.1)',
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
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
})
