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
    presetWind(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    ...Object.values(ColorsTheme).map(color => `text-${color}-500`),
    'text-white', 'text-black',
    ...Object.values(ColorsTheme).map(color => `bg-${color}-500`),
    'bg-white', 'bg-black',
  ],
})
