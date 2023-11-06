<script setup lang="ts">
import type { WorkExperience } from '~~/types'

defineProps({
  experience: Object as PropType<WorkExperience>,
})
</script>

<template>
  <div v-if="experience" class="group relative flex flex-col items-start">
    <div>
      <div class="flex flex-col">
        <div>
          <DateTag :start-date="experience.startDate" :end-date="experience.endDate" />
        </div>
        <UButton
          v-if="experience.companyLink"
          :to="experience.companyLink"
          variant="link"
          :padded="false"
          color="white"
          size="xl"
          target="_blank"
          :label="experience.company"
          class="my-1 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
        >
          <template #trailing>
            <UIcon name="i-ph-arrow-up-right-bold" color="gray" />
          </template>
        </UButton>
        <h1 v-else class="my-1 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {{ experience.company }}
        </h1>
      </div>
    </div>
    <p class="text-justify leading-5 text-sm text-zinc-600 dark:text-zinc-400">
      {{ experience.title }} — {{ experience.description }}
    </p>
  </div>
</template>
