<script lang="ts" setup>
import {type Activity, IDEs} from '~~/types'

const { data: activity, refresh } = await useAsyncData<Activity>('activity', () => $fetch('/api/activity'))
const codingActivity = computed(() => activity.value!.data.activities.filter(activity => IDEs.some(ide => ide.name === activity.name))[0])

function formatDate(date: number) {
  return `${useDateFormat(date, 'DD MMM YYYY').value} at ${useDateFormat(date, 'HH:mm:ss').value}`
}

const CardUi = {
  footer: { padding: 'px-4 py-2' },
  body: { base: 'h-full flex items-center' },
}

useIntervalFn(async () => await refresh(), 5000)
</script>

<template>
  <UCard
    :ui="CardUi"
    class="flex flex-col justify-between"
  >
    <div
      v-if="activity && activity.data.activities"
      class="flex items-center gap-x-4"
    >
      <p
        class="uppercase tracking-widest text-sm"
        :style="{ writingMode: 'vertical-rl', textOrientation: 'sideways' }"
      >
        Activity
      </p>
      <div v-if="codingActivity">
        <div class="flex gap-4 items-center">
          <UIcon
            class="h-10 w-10"
            :name="IDEs.find(ide => ide.name === codingActivity.name)!.icon"
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
              {{ codingActivity.details }} - {{ codingActivity.state }}
            </h3>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-subtitle"
      >
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
        <ClientOnly>
          <p
            v-if="codingActivity"
            class="text-subtitle text-xs w-1/2"
          >
            Started {{ useTimeAgo(codingActivity.timestamps.start).value }}, the {{ formatDate(codingActivity.timestamps.start) }}
          </p>
        </ClientOnly>
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
          <UIcon
            class="text-subtitle"
            name="i-jam-thunder"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>

<style>

</style>
