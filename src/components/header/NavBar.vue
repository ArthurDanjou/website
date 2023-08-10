<script setup lang="ts">
const appConfig = useAppConfig()

function getTextColor() {
  return `!text-${appConfig.ui.primary}-500`
}

const items = [
  [{
    label: 'Talents',
    to: '/talents',
    icon: 'i-ph-users-bold',
  },
  {
    label: 'bookmarks',
    to: '/bookmarks',
    icon: 'i-ph-bookmark-simple-bold',
  }],
]
</script>

<template>
  <header class="hidden md:block pointer-events-auto">
    <div class="flex items-center h-10 rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton to="/" size="sm" variant="ghost" color="white">
        Home
      </UButton>
      <UButton to="/about" size="sm" variant="ghost" color="white">
        About
      </UButton>

      <UButton to="/blog" size="sm" variant="ghost" color="white">
        Articles
      </UButton>
      <UButton to="/work" size="sm" variant="ghost" color="white">
        Projects
      </UButton>
      <UButton to="/uses" size="sm" variant="ghost" color="white">
        Uses
      </UButton>
      <UDropdown mode="hover" :items="items" :popper="{ placement: 'bottom' }">
        <UButton size="sm" variant="ghost" color="white">
          Other
        </UButton>
      </UDropdown>
      <UButton to="/contact" size="sm" variant="ghost" color="white">
        Contact
      </UButton>
    </div>
  </header>
</template>

<style lang="scss">
.router-link-exact-active {
  @apply bg-white/60 dark:bg-black
}
</style>
