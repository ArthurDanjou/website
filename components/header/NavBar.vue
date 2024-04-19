<script setup lang="ts">
import { otherTab } from '~~/types'

const route = useRoute()
const isOpenModal = ref(false)

const { copy, copied } = useClipboard({ source: 'arthurdanjou@outlook.fr', copiedDuring: 3000 })
</script>

<template>
  <nav class="hidden lg:block z-50">
    <div class="flex items-center h-10 rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton
        :class="{ 'link-active': route.path === '/' }"
        color="white"
        size="sm"
        to="/"
        variant="ghost"
      >
        Home
      </UButton>
      <UButton
        :class="{ 'link-active': route.path.includes('/about') }"
        color="white"
        size="sm"
        to="/about"
        variant="ghost"
      >
        About
      </UButton>
      <!-- <UButton to="/writing" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/writing') }">
        Articles
      </UButton> -->
      <UButton
        :class="{ 'link-active': route.path.includes('/work') }"
        color="white"
        size="sm"
        to="/work"
        variant="ghost"
      >
        Projects
      </UButton>
      <UButton
        :class="{ 'link-active': route.path.includes('/uses') }"
        color="white"
        size="sm"
        to="/uses"
        variant="ghost"
      >
        Uses
      </UButton>
      <UDropdown
        :items="otherTab"
        :popper="{ placement: 'bottom' }"
        mode="hover"
      >
        <UButton
          class="duration-300"
          color="white"
          size="sm"
          variant="ghost"
        >
          Other
        </UButton>
      </UDropdown>
      <UButton
        color="white"
        size="sm"
        variant="ghost"
        @click="isOpenModal = true"
      >
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
            <UButton
              icon="i-akar-icons-cross"
              size="xs"
              variant="ghost"
              @click.prevent="isOpenModal = false"
            />
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
                <UButtonGroup
                  orientation="horizontal"
                  size="sm"
                >
                  <UButton
                    color="gray"
                    icon="i-mdi-note-edit-outline"
                    label="Compose"
                    to="mailto:arthurdanjou@outlook.fr"
                    variant="solid"
                  />
                  <UButton
                    v-if="copied"
                    color="green"
                    icon="i-mdi-content-copy"
                    label="Copied"
                    variant="solid"
                  />
                  <UButton
                    v-else
                    color="gray"
                    icon="i-mdi-content-copy"
                    label="Copy"
                    variant="solid"
                    @click.prevent="copy()"
                  />
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
                <UButtonGroup
                  orientation="horizontal"
                  size="sm"
                >
                  <UButton
                    color="gray"
                    icon="i-ph-github-logo-bold"
                    label="Github"
                    target="_blank"
                    to="https://github.com/ArthurDanjou"
                    variant="solid"
                  />
                  <UButton
                    color="gray"
                    icon="i-ph-twitter-logo-bold"
                    label="Twitter"
                    target="_blank"
                    to="https://twitter.com/ArthurDanj"
                    variant="solid"
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
