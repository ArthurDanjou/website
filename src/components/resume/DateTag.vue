<script setup lang="ts">
defineProps({
  startDate: String,
  endDate: {
    type: String,
    required: true,
  },
})

function formatTodayDate(date: string) {
  const split = date.split(' ')
  return date === 'Today' ? 'Today' : `${split[0]} ${split[1]}`
}
</script>

<template>
  <div
    v-if="startDate !== endDate"
    class="mb-1 translate-y-px inline-block flex-none rounded bg-zinc-200 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
  >
    {{ formatTodayDate(startDate!.toString()) }} — {{ formatTodayDate(endDate) }}
  </div>
  <div
    v-else
    class="mb-1 translate-y-px inline-block flex-none rounded bg-zinc-200 p-1 text-xs font-medium leading-none text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
  >
    {{ formatTodayDate(endDate) }}
  </div>
</template>
