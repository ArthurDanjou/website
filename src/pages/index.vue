<script setup lang="ts">
import { useThemeStore } from '~/store/theme'
import { ColorsTheme } from '~~/types'

const { getColor, getTheme, nextColor, nextTheme } = useThemeStore()
const { getThemeTextColor, getThemeBackgroundColor } = useTheme()
</script>

<template>
  <section>
    <h1 :class="`text-sm ${getThemeTextColor}`">
      Main page
    </h1>
    <h1 :class="`${getThemeBackgroundColor}`">
      Main Page
    </h1>
    <div>
      Current color : {{ getColor }}
    </div>
    <div>
      Theme Name : {{ getTheme.name }}
    </div>
    <div>
      Theme colors : {{ getTheme.colors.map((color) => color.charAt(0).toUpperCase() + color.slice(1)).join(', ') }}
    </div>
    <div @click="nextColor()">
      setNextColor()
    </div>
    <div @click="nextTheme()">
      setNextTheme()
    </div>
  </section>
</template>
