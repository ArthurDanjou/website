<script setup lang="ts">
const route = useRoute()
const items = [
  [{
    label: 'Talents',
    to: '/talents',
    icon: 'i-ph-users-bold',
  },
  {
    label: 'Bookmarks',
    to: '/bookmarks',
    icon: 'i-ph-bookmark-simple-bold',
  },
  {
    label: 'Ask Me',
    to: '/ama',
    icon: 'i-octicon-comment-discussion-16',
  }],
]
</script>

<template>
  <nav class="hidden md:block pointer-events-auto z-50">
    <div class="flex items-center h-10 rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
      <UButton to="/" size="sm" variant="ghost" color="white">
        Home
      </UButton>
      <UButton to="/about" size="sm" variant="ghost" color="white">
        About
      </UButton>
      <UButton to="/writing" size="sm" variant="ghost" color="white" :class="{ 'router-link-exact-active': route.path.includes('/writing') }">
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
  </nav>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply bg-white/60 dark:bg-black
}
</style>
