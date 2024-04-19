<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Uses Section title'
  }
})

const appConfig = useAppConfig()

const getColor = computed(() => `text-${appConfig.ui.primary}-500`)
</script>

<template>
  <section class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40 mb-24 px-4">
    <div class="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
      <h2
        :class="getColor"
        class="relative text-sm font-semibold pl-3.5"
      >
        <span class="md:hidden absolute inset-y-0 left-0 flex items-center">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
        {{ title }}
      </h2>
      <div class="md:col-span-3">
        <ul class="space-y-8">
          <slot />
        </ul>
      </div>
    </div>
  </section>
</template>
