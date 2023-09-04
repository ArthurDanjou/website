<template>
  <header class="z-30 sticky top-0 left-0 flex justify-center w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-7xl py-4 flex justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-300/10">
      <Logo />
      <NavBar v-if="navbar" />
      <div class="flex gap-2">
        <ClientOnly>
          <div class="flex items-center rounded-md p-1 gap-1 relative bg-black/5 text-sm font-medium text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
            <ColorPicker />
            <ColorModeButton />
          </div>
          <MobileNavBar />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

defineProps({
  navbar: {
    type: Boolean,
    default: true,
  },
})
</script>
