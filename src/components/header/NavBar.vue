<script setup lang="ts">
import { otherTab } from '~~/types'

const route = useRoute()
const isOpenModal = ref(false)

const { copy, copied } = useClipboard({ source: 'arthurdanjou@outlook.fr', copiedDuring: 3000 })
</script>

<template>
  <nav class="hidden lg:block z-50">
    <div class="flex items-center h-10 rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton to="/" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path === '/' }">
        Home
      </UButton>
      <UButton to="/about" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/about') }">
        About
      </UButton>
      <!-- <UButton to="/writing" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/writing') }">
        Articles
      </UButton> -->
      <UButton to="/work" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/work') }">
        Projects
      </UButton>
      <UButton to="/uses" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/uses') }">
        Uses
      </UButton>
      <UDropdown mode="hover" :items="otherTab" :popper="{ placement: 'bottom' }">
        <UButton size="sm" variant="ghost" color="white" class="duration-300">
          Other
        </UButton>
      </UDropdown>
      <UButton size="sm" variant="ghost" color="white" @click="isOpenModal = true">
        Contact
      </UButton>
    </div>
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
  </nav>
</template>

<style lang="scss">
.link-active {
  @apply bg-white/60 dark:bg-black
}
</style>
