<script lang="ts" setup>
import { navs } from '~~/types'

const isOpen = ref(false)

const router = useRouter()
router.afterEach(() => isOpen.value = false)

const route = useRoute()
function isRoute(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="lg:hidden">
    <div class="p-1 rounded-md bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton
        variant="ghost"
        color="primary"
        size="sm"
        icon="i-ph-list-bold"
        @click="isOpen = true"
      />
    </div>

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex justify-between items-center">
            <Logo />
            <UButton
              size="md"
              icon="i-ic-round-close"
              :ui="{ rounded: 'rounded-full' }"
              @click.prevent="isOpen = false"
            />
          </div>
        </template>

        <div class="flex flex-col space-y-2">
          <UButton
            v-for="nav in navs"
            :key="nav.label"
            size="sm"
            :variant="isRoute(nav.to) ? 'solid' : 'ghost'"
            color="primary"
            :to="nav.to"
            :icon="nav.icon"
          >
            {{ nav.label }}
          </UButton>
        </div>

        <template #footer>
          Footer
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
