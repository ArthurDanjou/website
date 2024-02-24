<script lang="ts" setup>
const { data: activity, refresh } = await useAsyncData('activity', () => $fetch('/api/activity'))
const codingActivity = computed(() => activity.value.data.activities.filter(activity => activity.name === 'Visual Studio Code')[0])

function formatDate(date) {
  return `${useDateFormat(date, 'DD MMM YYYY').value} at ${useDateFormat(date, 'HH:mm:ss').value}`
}

const CardUi = {
  footer: { padding: 'px-4 py-2' },
  body: { base: 'h-full flex items-center' },
}

useIntervalFn(async () => await refresh(), 5000)
</script>

<template>
  <UCard class="flex flex-col justify-between" :ui="CardUi">
    <div v-if="activity && activity.data.activities" class="flex items-center gap-x-4">
      <p
        class="uppercase tracking-widest text-sm"
        :style="{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }"
      >
        Activity
      </p>
      <div v-if="codingActivity">
        <div class="flex gap-4 items-center">
          <UIcon
            class="h-10 w-10"
            name="i-skill-icons-vscode-light"
          />
          <div>
            <div class="flex items-center gap-2">
              <h1>{{ codingActivity.name }}</h1>
              <UTooltip :text="codingActivity.details === 'Idling' ? 'I\'m sleeping 😴' : 'I\'m online 👋'">
                <div
                  :class="codingActivity.details === 'Idling' ? 'bg-amber-500' : 'bg-green-500'"
                  class="h-3 w-3 inline-flex rounded-full cursor-pointer"
                />
              </UTooltip>
            </div>
            <h3 v-if="codingActivity.details === 'Idling'">
              I'm Idling on my computer
            </h3>
            <h3 v-else>
              {{ codingActivity.details }}
            </h3>
          </div>
        </div>
      </div>
      <div v-else class="text-subtitle">
        <div class="flex items-center gap-2">
          <h1>I'm currently offline</h1>
          <UTooltip text="I'm offline 🫥">
            <div class="h-3 w-3 inline-flex rounded-full bg-red-500" />
          </UTooltip>
        </div>
        <h3>Come back later to see what I'm doing</h3>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-end w-full">
        <p v-if="codingActivity" class="text-subtitle text-xs w-1/2">
          Started the {{ formatDate(codingActivity.timestamps.start) }}
        </p>
        <div class="flex items-center space-x-1 w-1/2 justify-end">
          <p class="text-subtitle text-xs">
            powered by
          </p>
          <UButton
            size="xs"
            :padded="false"
            variant="link"
            to="https://github.com/Phineas/lanyard"
            target="_blank"
            label="Lanyard"
          />
          <UIcon name="i-jam-thunder" class="text-subtitle" />
        </div>
      </div>
    </template>
  </UCard>
</template>

<style>

</style>
