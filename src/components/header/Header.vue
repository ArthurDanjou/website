<template>
  <div class="w-container flex justify-between py-6 sticky top-0 left-0 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-300/10">
    <Logo />
    <NavBar />
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
</template>
