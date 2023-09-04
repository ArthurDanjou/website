<template>
  <section class="w-full min-h-[80svh] flex justify-center items-center">
    <div class="text-center space-y-8 max-w-5xl">
      <h3 class="text-subtitle uppercase text-sm">Coming back soon</h3>
      <h1 class="text-4xl md:text-7xl font-bold">
        The website is under maintenance
      </h1>
      <div v-if="maintenance">
        <p class="text-subtitle">
          {{ maintenance.reason }}
        </p>
        <div>
          <p class="text-subtitle">
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

<script lang="ts" setup>
definePageMeta({
  layout: 'maintenance'
})

const { $trpc } = useNuxtApp()
const maintenance = await $trpc.maintenance.get.query()
const format = 'DD MMMM YYYY, HH:mm'

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
