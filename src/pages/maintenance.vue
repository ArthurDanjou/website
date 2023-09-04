<script lang="ts" setup>
definePageMeta({
  layout: 'maintenance',
})

useHead({
  title: 'Site under maintenance • Arthur Danjou',
})

const { $trpc } = useNuxtApp()
const maintenance = await $trpc.maintenance.get.query()
const format = 'DD MMMM YYYY, HH:mm'

const appConfig = useAppConfig()
const getColor = computed(() => `text-${appConfig.ui.primary}-500`)

const socials = [
  {
    name: 'mail',
    icon: 'i-material-symbols-alternate-email',
    link: 'mailto:arthurdanjou@outlook.fr',
  },
  {
    name: 'twitter',
    icon: 'i-ph-twitter-logo-bold',
    link: 'https://twitter.com/ArthurDanj',
  },
  {
    name: 'github',
    icon: 'i-ph-github-logo-bold',
    link: 'https://twitter.com/ArthurDanj',
  },
  {
    name: 'linkedin',
    icon: 'i-ph-linkedin-logo-bold',
    link: 'https://www.linkedin.com/in/arthurdanjou/',
  },
]
</script>

<template>
  <section class="w-full min-h-[80svh] flex justify-center items-center">
    <div class="text-center space-y-8 max-w-5xl">
      <h3 class="uppercase text-xs text-transparent bg-clip-text bg-origin-content bg-gradient-to-b from-gray-100 to-gray-300 dark:from-zinc-600 to-55% dark:to-zinc-800">
        Coming back soon
      </h3>
      <h1 class="text-4xl md:text-7xl font-bold">
        The website is under maintenance
      </h1>
      <div v-if="maintenance">
        <p :class="getColor" class="font-bold mb-8 text-xl">
          {{ maintenance.reason }}
        </p>
        <div>
          <p class="text-subtitle italic">
            Maintenance planned from {{ useDateFormat(maintenance.beginAt, format).value }} to {{ useDateFormat(maintenance.endAt, format).value }}
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        <UButton
          v-for="social in socials"
          :key="social.name"
          :icon="social.icon"
          size="md"
          :link="social.link"
          variant="ghost"
          target="_blank"
          :ui="{ rounded: 'rounded-full' }"
        />
      </div>
    </div>
  </section>
</template>
