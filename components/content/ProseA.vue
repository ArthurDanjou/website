<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
})

const appConfig = useAppConfig()
</script>

<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="border-b border-zinc-200 dark:border-zinc-700/70 duration-300"
    :class="`hover:border-${appConfig.ui.primary}-500 dark:hover:border-${appConfig.ui.primary}-500`"
  >
    <slot />
  </NuxtLink>
</template>
