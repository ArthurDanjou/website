<script lang="ts" setup>
import { navs } from '~~/types'

const isOpenSidebar = ref(false)
const isOpenModal = ref(false)

const router = useRouter()
router.afterEach(() => isOpenSidebar.value = false)

const route = useRoute()
function isRoute(path: string) {
  return route.path === path
}

function openModal() {
  isOpenSidebar.value = false
  isOpenModal.value = true
}

const { copy, copied } = useClipboard({ source: 'arthurdanjou@outlook.fr', copiedDuring: 3000 })
</script>

<template>
  <div class="lg:hidden">
    <div class="p-1 rounded-md bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton
        variant="ghost"
        color="primary"
        size="sm"
        icon="i-ph-list-bold"
        @click="isOpenSidebar = true"
      />
    </div>

    <USlideover v-model="isOpenSidebar">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex justify-between items-center">
            <Logo />
            <UButton
              size="md"
              icon="i-ic-round-close"
              :ui="{ rounded: 'rounded-full' }"
              @click.prevent="isOpenSidebar = false"
            />
          </div>
        </template>

        <div class="flex flex-col space-y-2">
          <div v-for="nav in navs" :key="nav.label" class="w-full">
            <UButton
              v-if="nav.to"
              size="sm"
              class="w-full"
              :variant="isRoute(nav.to) ? 'solid' : 'ghost'"
              color="primary"
              :to="nav.to"
              :icon="nav.icon"
              :label="nav.label"
            />
            <UButton
              v-else
              class="w-full"
              size="sm"
              color="primary"
              variant="ghost"
              :icon="nav.icon"
              :label="nav.label"
              @click.prevent="openModal()"
            />
          </div>
        </div>

        <template #footer>
          Footer
        </template>
      </UCard>
    </USlideover>
    <UModal v-model="isOpenModal">
      <UCard class="p-4">
        <div>
          <div class="mb-8 flex justify-between items-center">
            <h1 class="text-xl font-bold">
              Contact me
            </h1>
            <UButton size="xs" icon="i-akar-icons-cross" variant="ghost" @click.prevent="isOpenModal = false" />
          </div>
          <div class="flex flex-col space-y-6">
            <div class="flex flex-col md:flex-row justify-between md:items-center space-y-2">
              <div class="flex flex-col">
                <h3 class="text-sm">
                  Email
                </h3>
                <p class="text-xs text-subtitle">
                  arthurdanjou@outlook.fr
                </p>
              </div>
              <div>
                <UButtonGroup size="sm" orientation="horizontal">
                  <UButton variant="solid" color="gray" label="Compose" to="mailto:arthurdanjou@outlook.fr" icon="i-mdi-note-edit-outline" />
                  <UButton v-if="copied" variant="solid" color="green" label="Copied" icon="i-mdi-content-copy" />
                  <UButton v-else variant="solid" color="gray" label="Copy" icon="i-mdi-content-copy" @click.prevent="copy()" />
                </UButtonGroup>
              </div>
            </div>
            <UDivider label="OR" />
            <div class="flex flex-col md:flex-row justify-between md:items-center space-y-2">
              <div class="flex flex-col">
                <h3 class="text-sm">
                  Get in touch
                </h3>
                <p class="text-xs text-subtitle">
                  I'm most active on Twitter
                </p>
              </div>
              <div>
                <UButtonGroup size="sm" orientation="horizontal">
                  <UButton
                    variant="solid" color="gray" label="Github" icon="i-ph-github-logo-bold"
                    to="https://github.com/ArthurDanjou" target="_blank"
                  />
                  <UButton
                    variant="solid" color="gray" label="Twitter" icon="i-ph-twitter-logo-bold"
                    to="https://twitter.com/ArthurDanj" target="_blank"
                  />
                </UButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
