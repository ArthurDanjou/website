<script setup lang="ts">
import { useColorStore } from '~/store/color'
import { ColorsTheme } from '~~/types'

const colors = Object.values(ColorsTheme)

const { getColor, setColor } = useColorStore()

const colorMode = useColorMode()
const isDark = ref(colorMode.value === 'dark')
watch(isDark, () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})
</script>

<template>
  <UPopover
    mode="hover"
    :ui="{
      background: 'bg-white dark:bg-stone-900',
      ring: 'ring-1 ring-gray-200 dark:ring-stone-800',
      container: 'z-30',
    }"
  >
    <UButton trailing-icon="i-ph-paint-brush-bold" variant="ghost" color="primary" size="sm" />

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
                    solid: 'bg-gray-200 dark:bg-stone-800',
                    ghost: 'hover:bg-gray-50 dark:hover:bg-stone-800/50',
                  },
                },
              }"
              :variant="color === getColor ? 'solid' : 'ghost'"
              @click.stop.prevent="setColor(color)"
            >
              <span class="flex items-center justify-center w-3 h-3 rounded-full border text-white" :class="`bg-${color}-500/80 border-${color}-500`">
                <UIcon v-if="color === getColor" name="i-ic-round-check" />
              </span>
            </UButton>
          </UTooltip>
        </div>
        <UDivider class="my-2" />
        <div>
          <UToggle
            v-model="isDark"
            on-icon="i-heroicons-moon-20-solid"
            off-icon="i-heroicons-sun-20-solid"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
