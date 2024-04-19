<script lang="ts" setup>
definePageMeta({
  layout: 'maintenance'
})

useHead({
  title: 'Site under maintenance • Arthur Danjou'
})

const { data: maintenance } = await useFetch('/api/maintenance')
const format = 'DD MMMM YYYY, HH:mm'

const appConfig = useAppConfig()
const getColor = computed(() => `text-${appConfig.ui.primary}-500`)

const socials = [
  {
    name: 'mail',
    icon: 'i-material-symbols-alternate-email',
    link: 'mailto:arthurdanjou@outlook.fr'
  },
  {
    name: 'twitter',
    icon: 'i-ph-twitter-logo-bold',
    link: 'https://twitter.com/ArthurDanj'
  },
  {
    name: 'github',
    icon: 'i-ph-github-logo-bold',
    link: 'https://github.com/ArthurDanjou'
  },
  {
    name: 'linkedin',
    icon: 'i-ph-linkedin-logo-bold',
    link: 'https://www.linkedin.com/in/arthurdanjou/'
  }
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
      <div v-if="maintenance && maintenance.maintenance">
        <p
          :class="getColor"
          class="font-bold mb-8 text-xl"
        >
          {{ maintenance.maintenance.reason }}
        </p>
        <div>
          <p class="text-subtitle italic">
            Maintenance planned from {{ useDateFormat(maintenance.maintenance.beginAt, format).value }} to {{ useDateFormat(maintenance.maintenance.endAt, format).value }}
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.link"
          class="link"
          target="_blank"
        >
          <span
            :class="social.icon"
            aria-hidden="true"
            class="flex-shrink-0 h-5 w-5"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.link {
  @apply cursor-pointer duration-300 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 font-medium rounded-full text-sm gap-x-2.5 p-2.5 text-primary-500 dark:text-primary-400 hover:bg-primary-50 disabled:bg-transparent dark:hover:bg-primary-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center;
}
</style>
