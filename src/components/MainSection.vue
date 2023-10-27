<script lang="ts" setup>
defineProps<{
  icon: string
  title: string
}>()
</script>

<template>
  <div class="p-4 border border-zinc-100 dark:border-zinc-300/10 rounded-xl flex flex-col justify-between">
    <div class="flex items-center gap-2">
      <UIcon :name="icon" class="text-subtitle text-lg" />
      <h1>{{ title }}</h1>
    </div>
    <div class="text-subtitle mt-2 mb-4">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<style>

</style>
