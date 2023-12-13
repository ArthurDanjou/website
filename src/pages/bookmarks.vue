<script lang="ts" setup>
import type { Bookmark, Category } from '@prisma/client'
import { useBookmarksStore } from '~/store/bookmarks'

useHead({
  title: 'Discover new talents • Arthur Danjou',
})

const categories = ref<Array<{ label: string, slug: string }>>([{ label: 'All', slug: 'all' }])
const { getCategory, setCategory, isFavorite, toggleFavorite } = useBookmarksStore()

const {
  data: bookmarks,
  pending,
} = await useFetch<Array<Bookmark & { categories: Array<{ category: Category }> }>>('/api/bookmarks', {
  method: 'get',
  query: {
    favorite: isFavorite,
    category: getCategory,
  },
  watch: [isFavorite, getCategory],
})

function isCategory(category: string) {
  return getCategory.value === category
}

const {
  data: getCategories,
} = await useFetch<Array<Category>>('/api/categories', { method: 'GET', query: { type: 'BOOKMARK' } })
getCategories.value!.forEach((category: any) => categories.value.push({ label: category.name, slug: category.slug }))

const appConfig = useAppConfig()
function getColor() {
  return `text-${appConfig.ui.primary}-500`
}
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="max-w-2xl space-y-8 mb-16">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        My librairy where I save some ressources
      </h1>
      <p class="leading-relaxed text-subtitle">
        You will find a selection of some of the most inspiring and complete content I have read through my research and work experience.
      </p>
    </div>
    <div v-if="getCategories" class="sticky z-40 top-[4.8rem] pt-2 left-0 bg-white dark:bg-zinc-900 z-100 flex gap-2 w-full items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-700/40 mb-4">
      <div class="flex gap-2 overflow-x-scroll sm:overflow-x-hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-1 relative">
        <div
          v-for="category in categories"
          :key="category.slug"
          class="relative px-3 py-1 text-sm font-medium rounded-md h-8 text-gray-500 dark:text-gray-400 min-w-fit flex items-center justify-center w-full focus:outline-none transition-colors duration-200 ease-out cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
          :class="{ 'text-gray-900 dark:text-white relative !bg-white dark:!bg-stone-900 rounded-md shadow-sm': isCategory(category.slug) }"
          @click.prevent="setCategory(category.slug)"
        >
          <p class="w-full">
            {{ category.label }}
          </p>
        </div>
      </div>
      <UPopover>
        <UButton
          :icon="isFavorite ? 'i-mdi-filter-variant-remove' : 'i-mdi-filter-variant'"
          color="primary"
          variant="soft"
          size="lg"
        />
        <template #panel>
          <div
            class="flex p-2 gap-2 items-center cursor-pointer select-none text-subtitle"
            @click.prevent="toggleFavorite()"
          >
            <UIcon v-if="isFavorite" name="i-material-symbols-check-box-outline-rounded" />
            <UIcon v-else name="i-material-symbols-check-box-outline-blank" />
            <p>Show favorites only</p>
          </div>
        </template>
      </UPopover>
    </div>
    <div v-if="bookmarks && getCategories" class="mt-8 md:mt-16">
      <div v-if="bookmarks.length > 0 && !pending" class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark.name.toLowerCase().trim()"
          class="group relative flex flex-col justify-between"
        >
          <div class="flex">
            <div class="flex gap-6 items-center">
              <div>
                <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <NuxtLink
                    :href="bookmark.website"
                    external
                    target="_blank"
                  >
                    <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                    <div class="flex gap-2 items-center">
                      <h1 class="relative z-10">
                        {{ bookmark.name }}
                      </h1>
                      <UTooltip v-if="bookmark.favorite" text="You can set the filter to only show favorites.">
                        <UIcon name="i-ic-round-star" class="z-20 text-amber-500 text-xl font-bold hover:rotate-[143deg] duration-300" />
                      </UTooltip>
                    </div>
                  </NuxtLink>
                </h2>
                <p class="relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {{ bookmark.content }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-2 z-10">
            <UBadge
              v-for="category in bookmark.categories"
              :key="category.category.slug"
              color="primary"
              variant="soft"
              size="xs"
            >
              {{ category.category.name }}
            </UBadge>
          </div>
          <p class="relative z-10 mt-4 flex text-sm font-medium items-center" :class="getColor()">
            <UIcon name="i-ph-link-bold" />
            <span class="ml-2">{{ bookmark.website.replace('https://', '') }}</span>
          </p>
        </div>
      </div>
      <div v-else-if="bookmarks?.length === 0 && !pending" class="my-4 text-subtitle">
        <div class="flex gap-2 items-center">
          <UIcon name="i-akar-icons-cross" />
          <p>There are no talents for this category. Maybe soon...</p>
        </div>
      </div>
      <div v-else class="my-4 text-subtitle">
        <div class="flex gap-2 items-center">
          <UIcon name="i-eos-icons-loading" />
          <p>The bookmarks are loading...</p>
        </div>
      </div>
    </div>
  </section>
</template>
