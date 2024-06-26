<script lang="ts" setup>
import {useTalentsStore} from '~/store/talents'
import {providers} from '~~/types'

useHead({
  title: 'Discover new talents • Arthur Danjou',
})

const categories = ref<Array<{ label: string, slug: string, id: number }>>([{ label: 'All', slug: 'all', id: 0 }])
const { getCategory, setCategory, isFavorite, toggleFavorite } = useTalentsStore()
const { loggedIn, clear } = useUserSession()

const { data: talents, pending } = await useFetch('/api/talents', {
  method: 'get',
  query: {
    favorite: isFavorite,
    category: getCategory,
  },
  watch: [isFavorite, getCategory],
})

const { data: getCategories } = await useFetch('/api/categories', { method: 'GET', query: { type: 'talent' } })
getCategories.value!.forEach(category => categories.value.push({
  label: category.name,
  slug: category.slug,
  id: category.id,
}))

function isCategory(slug: string) {
  return getCategory.value === slug
}

const getMarkerStyle = computed(() => {
  const selected = window.document.getElementById(categories.value.find(category => category.slug === getCategory.value)?.slug || 'all')
  return {
    top: `${selected?.offsetTop}px`,
    left: `${selected?.offsetLeft === 12 ? 4 : selected?.offsetLeft}px`,
    height: `${selected?.offsetHeight}px`,
    width: `${selected?.offsetWidth}px`,
  }
})

const appConfig = useAppConfig()
function getColor() {
  return `text-${appConfig.ui.primary}-500`
}

const isOpen = ref(false)
const toast = useToast()
const suggestContent = ref<string>('')
async function suggest() {
  if (suggestContent.value.trim().length < 4)
    return

  isOpen.value = false
  await $fetch('/api/suggestion', {
    method: 'post',
    body: {
      content: suggestContent.value,
    },
  }).then((response) => {
    toast.add({
      title: `Your suggestion for '${response[0].content}' has been successfully added`,
      color: 'green',
      icon: 'i-material-symbols-check-circle-outline-rounded',
      timeout: 4000,
    })
  }).catch(() => {
    toast.add({
      title: 'An error occurred when suggesting someone',
      color: 'red',
    })
  })
  suggestContent.value = ''
}
</script>

<template>
  <section class="w-container lg:mt-24 my-8">
    <div class="max-w-2xl space-y-8 md:mb-16 mb-8">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        Showcasing here, I aim to share and introduce inspiring talents.
      </h1>
      <p class="leading-relaxed text-subtitle">
        You will find a selection of some of the most inspiring web talents I have discovered through my research and work experience. These talents are creative designers, talented web developers, passionate open-source contributors, and much more.
      </p>
    </div>
    <div class="flex justify-center md:justify-start">
      <UButton
        class="mb-8 md:mb-16"
        label="Want to suggest someone ?"
        icon="i-ph-circle-wavy-question-bold"
        @click.prevent="isOpen = true"
      />
    </div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h1 class="text-md font-bold">
                Are you a web talent? Do you want to promote your project? Do you want to launch your career or gain visibility?
              </h1>
            </div>
            <UButton
              class="-my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div>
          <div
            v-if="loggedIn"
            class="flex items-center justify-between gap-4"
          >
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
          <div
            v-else
            class="flex gap-2 justify-center"
          >
            <UButton
              v-for="provider in providers"
              :key="provider.slug"
              :label="provider.label"
              color="black"
              variant="solid"
              :to="provider.link"
              :icon="provider.icon"
              :external="true"
            />
          </div>
        </div>
      </UCard>
    </UModal>
    <div class="sticky z-40 top-[4.55rem] left-0 z-100 bg-white dark:bg-gray-900 pt-2">
      <div
        v-if="getCategories"
        class="flex gap-2 w-full items-center justify-between"
      >
        <div class="flex gap-2 overflow-x-scroll sm:overflow-x-hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-1 relative">
          <ClientOnly>
            <div
              class="absolute duration-300 left-1 ease-out focus:outline-none"
              :style="[getMarkerStyle]"
            >
              <div class="w-full h-full bg-white dark:bg-gray-900 rounded-md shadow-sm" />
            </div>
          </ClientOnly>
          <div
            v-for="category in categories"
            :id="category.slug"
            :key="category.slug"
            class="relative px-3 py-1 text-sm font-medium rounded-md h-8 text-gray-500 dark:text-gray-400 min-w-fit flex items-center justify-center w-full focus:outline-none transition-colors duration-200 ease-out cursor-pointer hover:text-black dark:hover:text-white"
            :class="{ 'text-gray-900 dark:text-white relative': isCategory(category.slug) }"
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
              <UIcon
                v-if="isFavorite"
                name="i-material-symbols-check-box-outline-rounded"
              />
              <UIcon
                v-else
                name="i-material-symbols-check-box-outline-blank"
              />
              <p>Show favorites only</p>
            </div>
          </template>
        </UPopover>
      </div>
      <UDivider class="my-2" />
    </div>
    <div
      v-if="talents && getCategories"
      class="mt-8"
    >
      <div
        v-if="talents.length > 0 && !pending"
        class="grid grid-cols-1 gap-y-4 md:gap-x-12 md:gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="talent in talents"
          :key="talent.name.toLowerCase().trim()"
          class="group relative flex flex-col justify-between"
        >
          <div class="flex">
            <div class="flex gap-6 items-center">
              <img
                :src="talent.logo"
                alt="Talent profile picture"
                class="z-20 h-8 w-8 md:h-12 md:w-12 rounded-md"
              >
              <div>
                <h2 class="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <span class="absolute -inset-y-2 md:-inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <NuxtLink
                    :to="talent.website"
                    target="_blank"
                  >
                    <span class="absolute -inset-y-2 md:-inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                    <div class="flex gap-2 items-center">
                      <h1 class="relative z-10">
                        {{ talent.name }}
                      </h1>
                      <UTooltip
                        v-if="talent.favorite"
                        text="You can set the filter to only show favorites."
                      >
                        <UIcon
                          class="z-20 text-amber-500 text-xl font-bold hover:rotate-[143deg] duration-300"
                          name="i-ic-round-star"
                        />
                      </UTooltip>
                    </div>
                  </NuxtLink>
                </h2>
                <p class="relative z-10 text-sm text-zinc-600 dark:text-zinc-400">
                  {{ talent.work }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 mt-2">
            <p
              :class="getColor()"
              class="relative z-10 flex text-xs md:text-sm font-medium items-center"
            >
              <UIcon name="i-ph-link-bold" />
              <span class="ml-2">{{ talent.website.replace('https://', '').replace('/', '') }}</span>
            </p>
            <div class="flex gap-2 z-10 flex-wrap">
              <UBadge
                v-for="category in talent.talentCategories"
                :key="category.category.slug"
                color="primary"
                variant="soft"
                size="xs"
              >
                {{ category.category.name }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="talents?.length === 0 && !pending"
        class="my-4 text-subtitle"
      >
        <div class="flex gap-2 items-center">
          <UIcon name="i-akar-icons-cross" />
          <p>There are no talents for this category. Maybe soon...</p>
        </div>
      </div>
      <div
        v-else
        class="my-4 text-subtitle"
      >
        <div class="flex gap-2 items-center">
          <UIcon name="i-eos-icons-loading" />
          <p>The talents are loading...</p>
        </div>
      </div>
    </div>
  </section>
</template>
