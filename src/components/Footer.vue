<script setup lang="ts">
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="w-full flex justify-center">
    <div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-7xl py-4 flex justify-between bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-300/10">
      <div class="w-full duration-300 text-center flex flex-col md:flex-row md:justify-between items-center gap-y-2">
        <p class="text-subtitle text-sm">
          © {{ year }} ArtDanjProduction
        </p>
        <div class="flex items-center">
          <p class="text-subtitle">
            Designed & Built by
          </p>
          <UButton variant="link" color="primary" label="Arthur Danjou" to="https://twitter.com/arthurdanj" target="_blank" />
        </div>
        <p class="text-subtitle flex items-center">
          Made with
          <UButton variant="link" color="green" label="Nuxt 3" to="https://nuxt.com/" target="_blank" icon="i-vscode-icons-file-type-nuxt" trailing />
        </p>
      </div>
    </div>
  </footer>
</template>
