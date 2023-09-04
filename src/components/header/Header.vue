<script setup lang="ts">
defineProps({
  navigation: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <header class="z-30 sticky top-0 left-0 flex justify-center w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-7xl py-4 flex justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-300/10">
      <Logo />
      <ClientOnly>
        <NavBar v-if="navigation" />
      </ClientOnly>
      <div class="flex gap-2">
        <div class="flex items-center rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
          <ClientOnly>
            <ColorPicker />
            <ColorModeButton />
          </ClientOnly>
        </div>
        <MobileNavBar v-if="navigation" />
      </div>
    </div>
  </header>
</template>
