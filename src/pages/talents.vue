<script lang="ts" setup>
import type { Category, Suggestion, Talent } from '@prisma/client'
import { useTalentsStore } from '~/store/talents'
import { providers } from '~~/types'

useHead({
  title: 'Discover new talents • Arthur Danjou',
})

const categories = ref<Array<{ label: string, slug: string, id: number }>>([{ label: 'All', slug: 'all', id: 0 }])
const { getCategory, setCategory, isFavorite, toggleFavorite } = useTalentsStore()
const { loggedIn, clear } = useUserSession()

const {
  data: talents,
  pending,
} = await useFetch<Array<Talent & { categories: Array<{ category: Category }> }>>('/api/talents', {
  method: 'get',
  query: {
    favorite: isFavorite,
    category: getCategory,
  },
  watch: [isFavorite, getCategory],
})

const {
  data: getCategories,
} = await useFetch<Array<Category>>('/api/categories', { method: 'GET', query: { type: 'TALENT' } })
getCategories.value!.forEach((category: any) => categories.value.push({ label: category.name, slug: category.slug, id: category.id }))

const selected = computed({
  get() {
    return categories.value.find(category => getCategory.value === category.slug)?.id || categories.value[0].id
  },
  set(value) {
    setCategory(categories.value.find(category => category.id === value)?.slug || categories.value[0].slug)
  },
})

const appConfig = useAppConfig()
function getColor() {
  return `text-${appConfig.ui.primary}-500`
}

const toast = useToast()
const suggestContent = ref<string>('')
async function suggest() {
  if (suggestContent.value.trim().length < 4)
    return

  await $fetch<Suggestion>('/api/suggestion', {
    method: 'post',
    body: {
      content: suggestContent.value,
    },
  }).then((suggestion) => {
    toast.add({
      title: `Your suggestion for '${suggestion.content}'' has been successfully added`,
      icon: 'i-material-symbols-check-circle-outline-rounded',
      timeout: 4000,
    })
  }).catch(() => {
    toast.add({
      title: 'You already have suggested someone',
      color: 'red',
    })
  })
  suggestContent.value = ''
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
      <div v-if="loggedIn" class="flex items-center justify-between gap-4">
        <div class="w-full relative flex items-center">
          <input
            v-model="suggestContent"
            type="text"
            required
            min="4"
            class="w-full rounded-lg p-2 h-10 focus:outline-none bg-gray-100 dark:bg-gray-800"
            placeholder="Suggest one name"
          >
          <UButton
            class="absolute right-1 top-1 rounded-md"
            label="Send"
            :disabled="suggestContent.trim().length < 4"
            variant="solid"
            @click.prevent="suggest()"
          />
        </div>
        <UButton
          variant="outline"
          @click.prevent="clear()"
        >
          Logout
        </UButton>
      </div>
      <div v-else class="flex gap-2">
        <UButton
          v-for="provider in providers"
          :key="provider.slug"
          :label="provider.label"
          :color="provider.color"
          variant="solid"
          :to="provider.link"
          external
        />
      </div>
    </div>
    <div v-if="getCategories" class="sticky z-40 top-[4.8rem] left-0 bg-white dark:bg-zinc-900 z-100 flex gap-2 w-full items-center justify-between border-b border-zinc-100 dark:border-zinc-700/40">
      <UTabs v-model="selected" :items="categories">
        <template #default="{ item, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <span class="truncate">{{ item.label }}</span>
            <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
          </div>
        </template>
      </UTabs>
      <UPopover>
        <UButton
          :icon="isFavorite ? 'i-mdi-filter-variant-remove' : 'i-mdi-filter-variant'"
          color="primary"
          variant="soft"
          size="lg"
          class="mb-2"
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
    <div v-if="talents && getCategories" class="mt-8 md:mt-16">
      <div v-if="talents.length > 0 && !pending" class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="talent in talents"
          :key="talent.name.toLowerCase().trim()"
          class="group relative flex flex-col justify-between"
        >
          <div class="flex">
            <div class="flex gap-6 items-center">
              <NuxtImg :src="talent.logo" class="z-20 h-12 w-12 rounded-md" placeholder />
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
                        <UIcon name="i-ic-round-star" class="z-20 text-amber-500 text-xl font-bold hover:rotate-[143deg] duration-300" />
                      </UTooltip>
                    </div>
                  </NuxtLink>
                </h2>
                <p class="relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {{ talent.work }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-2 z-10">
            <UBadge
              v-for="category in talent.categories"
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
            <span class="ml-2">{{ talent.website.replace('https://', '').replace('/', '') }}</span>
          </p>
        </div>
      </div>
      <div v-else-if="talents?.length === 0 && !pending" class="my-4 text-subtitle">
        <div class="flex gap-2 items-center">
          <UIcon name="i-akar-icons-cross" />
          <p>There are no talents for this category. Maybe soon...</p>
        </div>
      </div>
      <div v-else class="my-4 text-subtitle">
        <div class="flex gap-2 items-center">
          <UIcon name="i-eos-icons-loading" />
          <p>The talents are loading...</p>
        </div>
      </div>
    </div>
  </section>
</template>
