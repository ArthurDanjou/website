<script setup lang="ts">
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="w-full flex justify-center">
    <div class="w-full px-4 sm:px-6 lg:px-8 sm:mx-8 max-w-9xl py-4 flex justify-between bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-300/10">
      <div class="w-full duration-300 text-center flex flex-col md:flex-row md:justify-between items-center gap-y-2">
        <p class="text-subtitle text-sm">
          © {{ year }} ArtDanjProduction
        </p>
        <div class="flex items-center">
          <p class="text-subtitle">
            Designed & Built by
          </p>
          <UButton
            color="primary"
            label="Arthur Danjou"
            target="_blank"
            to="https://twitter.com/arthurdanj"
            variant="link"
          />
        </div>
        <p class="text-subtitle flex items-center">
          Made with
          <UButton
            color="green"
            icon="i-vscode-icons-file-type-nuxt"
            label="Nuxt 3"
            target="_blank"
            to="https://nuxt.com/"
            trailing
            variant="link"
          />
        </p>
      </div>
    </div>
  </footer>
</template>
