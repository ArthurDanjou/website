<script setup lang="ts">
import { useThemeStore } from '~/store/theme'

const { swapColor } = useThemeStore()
onMounted(() => swapColor())
</script>

<template>
  <section>
    Hey
    <Announcement />
  </section>
</template>
