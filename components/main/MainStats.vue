<script lang="ts" setup>
import type { Stats } from '~~/types'

const stats = await $fetch<Stats>('/api/stats')

const CardUi = {
  footer: { padding: 'px-4 py-2' },
  body: {base: 'h-full'}
}
</script>

<template>
  <UCard
    :ui="CardUi"
    class="flex flex-col justify-between"
  >
    <div class="flex items-center gap-x-4 h-full">
      <p
        class="uppercase tracking-widest text-sm"
        :style="{ writingMode: 'vertical-rl', textOrientation: 'sideways' }"
      >
        STATS
      </p>
      <div v-if="stats">
        <div class="flex gap-4 items-center">
          <div class="text-md">
            <div class="flex items-center gap-x-1">
              <h3>Total hours:</h3>
              <p class="text-subtitle">
                {{ usePrecision(stats.coding.data.grand_total.total_seconds_including_other_language / 3600, 0) }} hours
              </p>
            </div>
            <div class="flex items-start gap-x-1 flex-wrap">
              <h3>Best Editors:</h3>
              <p class="text-subtitle">
                {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(', ') }}
              </p>
            </div>
            <div class="flex items-center gap-x-1">
              <h3>Best OS:</h3>
              <p class="text-subtitle">
                {{ stats.os.data[0].name }} with {{ stats.os.data[0].percent }}%
              </p>
            </div>
            <div class="flex items-start gap-x-1 flex-wrap">
              <h3>Top languages:</h3>
              <p class="text-subtitle">
                {{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <ClientOnly>
          <p
            v-if="stats"
            class="text-subtitle text-xs w-1/2"
          >
            Started {{ useTimeAgo(new Date(stats.coding.data.range.start)).value }}, the {{ useDateFormat(new Date(stats.coding.data.range.start), 'Do MMMM YYYY').value }}
          </p>
        </ClientOnly>
        <div class="flex items-center justify-end space-x-1">
          <p class="text-subtitle text-xs">
            powered by
          </p>
          <UButton
            size="xs"
            :padded="false"
            variant="link"
            to="https://wakatime.com/"
            target="_blank"
            label="Wakatime"
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
