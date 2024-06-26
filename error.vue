<script setup lang="ts">
import type {NuxtError} from 'nuxt/app'

defineProps({
  error: Object as () => NuxtError,
})

const appConfig = useAppConfig()
const getColor = computed(() => appConfig.ui.primary)
</script>

<template>
  <section>
    <NuxtLoadingIndicator :color="getColor" />
    <section class="fixed inset-0 flex justify-center sm:px-8">
      <div class="flex w-full max-w-9xl">
        <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </section>
    <div class="relative z-50 min-h-[100svh]">
      <Header />
      <UContainer>
        <div class="flex flex-col items-center gap-4 mt-12">
          <h1
            class="font-medium text-[8rem] md:text-[16rem] leading-none bg-error bg-clip-text tracking-wider font-error"
            :class="`text-${getColor}-500`"
          >
            {{ error?.statusCode }}
          </h1>
          <p class="text-lg md:text-2xl text-subtitle text-center">
            Sorry, {{ error?.statusCode === 404
              ? "the page you are looking for doesn't exist or as been moved."
              : "you have encountered a problem."
            }}
            <br>
            Let's find a better place for you to go.
          </p>
        </div>
        <div class="flex justify-center mt-8 mb-12">
          <UButton
            to="/"
            size="md"
            variant="soft"
            color="primary"
          >
            Go back to the main page
          </UButton>
        </div>
      </UContainer>
      <Footer />
    </div>
  </section>
</template>

<style scoped>
.bg-error {
  @apply text-transparent bg-clip-text bg-origin-content bg-gradient-to-b from-gray-100 to-gray-300 dark:from-zinc-600 to-55% dark:to-zinc-800;
}
</style>
