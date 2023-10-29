<script lang="ts" setup>
defineProps<{
  icon: string
  title: string
}>()

const appConfig = useAppConfig()
function getColor() {
  return `text-${appConfig.ui.primary}-500`
}
</script>

<template>
  <div class="p-4 border border-zinc-100 dark:border-zinc-300/10 rounded-xl flex flex-col justify-between">
    <div :class="getColor()" class="flex items-center gap-2">
      <UIcon :name="icon" class="text-2xl" />
      <h1>{{ title }}</h1>
    </div>
    <div class="text-subtitle mt-2 mb-4 text-sm">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<style>

</style>
