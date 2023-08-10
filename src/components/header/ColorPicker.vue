<script setup lang="ts">
import { useColorStore } from '~/store/color'
import { ColorsTheme } from '~~/types'

const colors = Object.values(ColorsTheme)

const { setColor, getColor } = useColorStore()
</script>

<template>
  <UPopover
    :open-delay="60"
    :close-delay="10"
    :ui="{
      background: 'bg-white dark:bg-stone-900',
      ring: 'ring-1 ring-gray-200 dark:ring-stone-800',
    }"
  >
    <UButton trailing-icon="i-heroicons-swatch-20-solid" variant="ghost" color="primary" size="sm" />

    <template #panel>
      <div class="p-2">
        <div class="grid grid-cols-5 gap-px">
          <UTooltip v-for="color in colors" :key="color" :text="color" class="capitalize" :open-delay="500">
            <UButton
              color="gray"
              square
              :ui="{
                color: {
                  gray: {
                    solid: 'bg-gray-100 dark:bg-stone-800',
                    ghost: 'hover:bg-gray-50 dark:hover:bg-stone-800/50',
                  },
                },
              }"
              :variant="color === getColor ? 'solid' : 'ghost'"
              @click.stop.prevent="setColor(color)"
            >
              <span class="inline-block w-3 h-3 rounded-full" :class="`bg-${color}-500`" />
            </UButton>
          </UTooltip>
        </div>
      </div>
    </template>
  </UPopover>
</template>
