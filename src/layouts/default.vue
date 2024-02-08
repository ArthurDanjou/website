<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

import { configureGraphs } from '@ksassnowski/vueclid'

const appConfig = useAppConfig()
const getColor = computed(() => appConfig.ui.primary)

const router = useRouter()
router.afterEach((route) => {
  useCookie('last-route', { path: '/', default: () => '/' }).value = route.fullPath
})

const colorMode = useColorMode()
watch(colorMode, () => configureGraphs({ darkMode: colorMode.value === 'dark' }))
onMounted(() => configureGraphs({ darkMode: colorMode.value === 'dark' }))
</script>

<template>
  <div>
    <SpeedInsights />
    <NuxtLoadingIndicator :color="getColor" />
    <section class="fixed inset-0 flex justify-center sm:px-8">
      <div class="flex w-full max-w-7xl">
        <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
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
