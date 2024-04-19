<script setup lang="ts">
defineProps({
  startDate: String,
  endDate: {
    type: String,
    required: true
  }
})

function formatTodayDate(date: string) {
  const split = date.split(' ')
  return date === 'Today' ? 'Today' : `${split[0]} ${split[1]}`
}
</script>

<template>
  <UBadge
    v-if="startDate !== endDate"
    size="xs"
    variant="soft"
  >
    {{ formatTodayDate(startDate!.toString()) }} — {{ formatTodayDate(endDate) }}
  </UBadge>
  <UBadge
    v-else
    size="xs"
    variant="soft"
  >
    {{ formatTodayDate(endDate) }}
  </UBadge>
</template>
