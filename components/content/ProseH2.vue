<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>

<template>
  <h2 :id="id">
    <a
      v-if="id && generate"
      :href="`#${id}`"
      class="pl-6 border-l border-zinc-200 dark:border-zinc-700/70 duration-300"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
