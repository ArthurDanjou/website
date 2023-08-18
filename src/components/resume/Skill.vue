<script setup lang="ts">
import type { Skill } from '~~/types'

defineProps({
  skill: Object as PropType<Skill>,
})

const { $colorMode } = useNuxtApp()
const isLight = computed(() => $colorMode.value === 'light')
</script>

<template>
  <li
    v-if="skill"
    class="flex items-center gap-2 rounded-md px-2 py-3 duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <div class="flex items-center">
      <Icon v-if="isLight" :name="skill.icon.light ? skill.icon.light : skill.icon" size="20" />
      <Icon v-else :name="skill.icon.dark ? skill.icon.dark : skill.icon" size="20" />
    </div>
    <span class="text-sm text-subtitle">{{ skill.name }}</span>
  </li>
</template>
