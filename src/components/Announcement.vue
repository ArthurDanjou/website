<script lang="ts" setup>
const { $trpc } = useNuxtApp()
const announce = await $trpc.announcement.get.query()

const appConfig = useAppConfig()
function getColor() {
  return `bg-${appConfig.ui.primary}-500`
}
</script>

<template>
  <div v-if="announce" class="w-full flex justify-center mt-8">
    <div class="relative">
      <h1 class="px-4 py-2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-100 dark:border-zinc-300/10" v-html="announce.content" />
      <span class="absolute -top-1 -right-1 flex h-3 w-3">
        <span span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="getColor()" />
        <span class="relative inline-flex rounded-full h-3 w-3" :class="getColor()" />
      </span>
    </div>
  </div>
</template>

<style>

</style>
