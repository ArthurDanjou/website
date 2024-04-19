<script setup lang="ts">
import {SpeedInsights} from '@vercel/speed-insights/nuxt'

const router = useRouter()
router.afterEach((route) => {
  useCookie('last-route', { path: '/', default: () => '/' }).value = route.fullPath
})

useHead({
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.jpeg' }],
})
</script>

<template>
  <div>
    <SpeedInsights />
    <Background />
    <NuxtLoadingIndicator :color="$colorMode.value === 'light' ? 'black' : 'white'" />
    <section class="fixed inset-0 flex justify-center sm:px-8">
      <div class="flex w-full max-w-9xl">
        <div class="w-full z-20 bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </section>
    <main class="relative z-50 min-h-[100svh]">
      <Header />
      <NuxtPage />
      <Footer />
    </main>
    <UNotifications />
  </div>
</template>
