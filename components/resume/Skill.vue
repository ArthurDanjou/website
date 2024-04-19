<script setup lang="ts">
import type {Skill} from '~~/types'

defineProps({
  skill: Object as PropType<Skill>,
})

const { $colorMode } = useNuxtApp()
const isLight = computed(() => $colorMode.value === 'light')
</script>

<template>
  <a
    v-if="skill"
    :href="skill.link"
    target="_blank"
    class="cursor-pointer flex items-center gap-2 rounded-md px-2 py-3 duration-300 md:hover:bg-gray-100 md:dark:hover:bg-neutral-800"
  >
    <div class="flex items-center">
      <UIcon
        v-if="isLight"
        :name="skill.icon.light ? skill.icon.light : skill.icon"
        :dynamic="true"
        size="20"
      />
      <UIcon
        v-else
        :name="skill.icon.dark ? skill.icon.dark : skill.icon"
        :dynamic="true"
        size="20"
      />
    </div>
    <span class="text-sm text-subtitle">{{ skill.name }}</span>
  </a>
</template>
