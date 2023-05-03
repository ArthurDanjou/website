<script setup lang="ts">
import { useThemeStore } from '~/store/theme'

const { getColor, getTheme, swapColor, nextTheme } = useThemeStore()
const { getThemeTextColor, getThemeBackgroundColor } = useTheme()

onMounted(() => swapColor())

const color = useColorMode()
const { query } = useRoute()

const { $trpc } = useNuxtApp()
const user = await $trpc.hello.query({ name: query.name?.toString() })
</script>

<template>
  <section>
    <h1 :class="`${getThemeTextColor}`" duration="1000">
      Main page
    </h1>
    <h1 :class="`${getThemeBackgroundColor}`" duration="1000">
      Main Page
    </h1>
    <div>
      Current color : {{ getColor }}
    </div>
    <div my-12>
      <div>Theme symbol : {{ getTheme.symbol }}</div>
      <div>Theme Name : {{ getTheme.name }}</div>
      <div>Theme colors : {{ getTheme.colors.map((color) => color.charAt(0).toUpperCase() + color.slice(1)).join(', ') }}</div>
    </div>
    <div @click="nextTheme()">
      setNextTheme()
    </div>
    <div @click="color.preference = color.value === 'dark' ? 'light' : 'dark'">
      toggleDarkMode()
    </div>
    <div>
      {{ user.greeting }}
    </div>
  </section>
</template>
