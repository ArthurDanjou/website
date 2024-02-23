<script lang="ts" setup>
const stats = await $fetch('/api/stats')

const CardUi = {
  footer: { padding: 'px-4 py-2' },
  body: { base: 'h-full' },
}
</script>

<template>
  <UCard class="mx-8 md:mx-0 flex flex-col justify-between" :ui="CardUi">
    <div class="flex items-center gap-x-4 h-full">
      <p
        class="uppercase tracking-widest text-sm"
        :style="{ writingMode: 'vertical-rl', textOrientation: 'sideways-right' }"
      >
        STATS
      </p>
      <div v-if="stats">
        <div class="flex gap-4 items-center">
          <div>
            <div class="flex items-center gap-1">
              <h3>Total hours:</h3>
              <p>{{ usePrecision(stats.coding.data.grand_total.total_seconds_including_other_language / 3600, 0) }} hours</p>
            </div>
            <div class="flex items-start gap-3">
              <h3>Best Editors:</h3>
              <p>
                {{ stats.editors.data.slice(0, 2).map(editor => `${editor.name} (${editor.percent}%)`).join(', ') }}
              </p>
            </div>
            <div class="flex items-center gap-1">
              <h3>Best OS:</h3>
              <p>{{ stats.os.data[0].name }} with {{ stats.os.data[0].percent }}%</p>
            </div>
            <div class="flex items-start gap-3 flex-wrap">
              <h3>Top languages:</h3>
              <p>{{ stats.languages.data.slice(0, 2).map(language => `${language.name} (${language.percent}%)`).join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <p v-if="stats" class="text-subtitle text-xs">
          Started {{ useTimeAgo(new Date(stats.coding.data.range.start)).value }}, the {{ useDateFormat(new Date(stats.coding.data.range.start), 'Do MMMM YYYY').value }}
        </p>
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
          <UIcon name="i-jam-thunder" class="text-subtitle" />
        </div>
      </div>
    </template>
  </UCard>
</template>

<style>

</style>
