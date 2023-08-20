<script lang="ts" setup>
import type { Talent } from '@prisma/client'

useHead({
  title: 'Discover new talents • Arthur Danjou',
})

const talents = ref<Talent[]>()

const currentFavorite = ref<boolean>(false)
const currentCategory = ref('all')
const { getCategories, getTalents } = await useTalents()

talents.value = await getTalents(currentCategory.value, currentFavorite.value)

watch(currentFavorite, async () => {
  talents.value = await getTalents(currentCategory.value, currentFavorite.value)
})

watch(currentCategory, async () => {
  talents.value = await getTalents(currentCategory.value, currentFavorite.value)
})

const setCategory = (category: string) => currentCategory.value = category

function isCategory(category: string) {
  return currentCategory.value === category
}

const appConfig = useAppConfig()
function getColor() {
  return `text-${appConfig.ui.primary}-500`
}
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="max-w-2xl space-y-8 mb-16">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        Showcasing here, I aim to share and introduce inspiring talents.
      </h1>
      <p class="leading-relaxed text-subtitle">
        You will find a selection of some of the most inspiring web talents I have discovered through my research and work experience. These talents are creative designers, talented web developers, passionate open-source contributors, and much more.
      </p>
    </div>
    <div class="my-12 flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div class="mb-6">
        <div class="mb-2 flex items-center gap-2">
          <UIcon name="i-ph-circle-wavy-question-bold" class="text-subtitle text-xl" />
          <h1 class="text-lg font-bold">
            Want to be here ?
          </h1>
        </div>
        <p class="text-subtitle text-ellipsis">
          Are you a web talent? Do you want to promote your project? Do you want to launch your career or gain visibility?
        </p>
      </div>
      <NuxtLink href="mailto:arthurdanjou@outlook.fr?subject=Join your talents' list">
        <UButton label="Join the talent's list" color="primary" />
      </NuxtLink>
    </div>
    <div v-if="getCategories" class="flex gap-2 justify-between border-b border-zinc-100 dark:border-zinc-700/40 mb-4">
      <div class="flex gap-4 overflow-x-scroll sm:overflow-x-hidden">
        <div
          class="category"
          :class="{ 'current-category': isCategory('all') }"
          @click.prevent="setCategory('all')"
        >
          All
        </div>
        <div
          v-for="category in getCategories"
          :key="category.slug"
          class="category"
          :class="{ 'current-category': isCategory(category.slug) }"
          @click.prevent="setCategory(category.slug)"
        >
          <p class="w-full">
            {{ category.name }}
          </p>
        </div>
      </div>
      <UPopover>
        <UButton
          :icon="currentFavorite ? 'i-mdi-filter-variant-remove' : 'i-mdi-filter-variant'"
          color="primary"
          variant="ghost"
        />
        <template #panel>
          <div
            class="flex p-2 gap-2 items-center cursor-pointer select-none text-subtitle"
            @click.prevent="currentFavorite = !currentFavorite"
          >
            <UIcon v-if="currentFavorite" name="i-material-symbols-check-box-outline-rounded" />
            <UIcon v-else name="i-material-symbols-check-box-outline-blank" />
            <p>Show favorites only</p>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="mt-16 md:mt-20">
      <div v-if="talents && getCategories" class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="talent in talents"
          :key="talent.name.toLowerCase().trim()"
          class="group relative flex flex-col justify-between"
        >
          <div class="flex gap-6 items-center">
            <img :src="talent.logo" class="h-8 w-8 rounded-md">
            <div>
              <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                <NuxtLink :to="talent.website" target="_blank">
                  <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                  <div class="flex gap-2 items-center">
                    <h1 class="relative z-10">
                      {{ talent.name }}
                    </h1>
                    <UTooltip v-if="talent.favorite" text="You can set the filter to only show favorites.">
                      <UIcon name="i-ic-round-star" class="z-20 text-amber-500 text-xl font-bold" />
                    </UTooltip>
                  </div>
                </NuxtLink>
              </h2>
              <p class="relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400">
                {{ talent.work }}
              </p>
            </div>
          </div>
          <p class="relative z-10 mt-4 flex text-sm font-medium items-center" :class="getColor()">
            <UIcon name="i-ph-link-bold" />
            <span class="ml-2">{{ talent.website.replace('https://', '') }}</span>
          </p>
        </div>
      </div>
      <p v-else class="my-16 text-subtitle">
        The talents are loading...
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.category {
  @apply min-w-fit cursor-pointer py-2 text-gray-500 dark:text-gray-400 duration-300 transition-colors hover:text-black dark:hover:text-white
}
.current-category {
  @apply text-black dark:text-white border-b-2 border-black dark:border-white
}
</style>
