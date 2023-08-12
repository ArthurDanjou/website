<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Uses Section title',
  },
})

const appConfig = useAppConfig()

function getColor() {
  return `text-${appConfig.ui.primary}-500`
}
</script>

<template>
  <section class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40 mb-16">
    <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
      <h2 class="text-sm font-semibold" :class="getColor()">
        {{ title }}
      </h2>
      <div class="md:col-span-3">
        <ul class="space-y-16">
          <slot />
        </ul>
      </div>
    </div>
  </section>
</template>
