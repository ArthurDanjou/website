<template>
  <header class="z-30 sticky top-0 left-0 flex justify-center w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-7xl py-4 flex justify-between items-center bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-300/10">
      <Logo />
      <NavBar />
      <ClientOnly fallback-tag="div" class="flex gap-2 items-center">
        <ThemePicker />
        <MobileNavBar />
      </ClientOnly>
    </div>
  </header>
</template>
