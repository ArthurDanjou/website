<script setup lang="ts">
import { otherTab } from '~~/types'

const route = useRoute()
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
      <UButton to="/writing" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/writing') }">
        Articles
      </UButton>
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
      <UButton to="/contact" size="sm" variant="ghost" color="white" :class="{ 'link-active': route.path.includes('/contact') }">
        Contact
      </UButton>
    </div>
  </nav>
</template>

<style lang="scss">
.link-active {
  @apply bg-white/60 dark:bg-black
}
</style>
