import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, presetWind,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
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
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    // Theme text colors
    ...Object.values(ColorsTheme).map(color => `text-${color}-500`),
    ...'bg-black dark:bg-white dark:text-black text-white'.split(' '),

    // Theme background colors
    ...Object.values(ColorsTheme).map(color => `bg-${color}-500`),
    ...'text-black dark:text-white'.split(' '),
  ],
})
