<script lang="ts" setup>
useHead({
  title: 'Sign my guestbook • Arthur Danjou',
})

const providers = [
  {
    slug: 'github',
    label: 'Use Github',
    icon: 'i-ph-github-logo-bold',
    link: '/api/auth/github',
    color: 'black',
  },
  {
    slug: 'twitter',
    label: 'Use Twitter',
    icon: 'i-ph-twitter-logo-bold',
    link: '/api/auth/twitter',
    color: 'cyan',
  },
  {
    slug: 'google',
    label: 'Use Google',
    icon: 'i-ph-google-logo-bold',
    link: '/api/auth/google',
    color: 'red',
  },
]
</script>

<template>
  <section class="w-container lg:my-24 my-16">
    <div class="max-w-2xl space-y-8 mb-16">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        You want to leave a message ?
      </h1>
      <p class="leading-relaxed text-subtitle">
        Your opinion means a lot to me. Feel free to share your impressions of my projects, explore my site, or simply leave a personalised message. Your comments are a source of inspiration and continuous improvement. Thank you for taking the time to contribute to this virtual community. I look forward to reading what you have to share!
      </p>
    </div>
    <div class="my-12 flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div class="flex items-center gap-2 mb-4">
        <UIcon name="i-ph-circle-wavy-question-bold" class="text-subtitle text-xl" />
        <h1 class="text-lg font-bold">
          Login to sign my book
        </h1>
      </div>
      <div class="flex gap-2">
        <UButton
          v-for="provider in providers"
          :key="provider.slug"
          :label="provider.label"
          :color="provider.color"
          variant="solid"
          :icon="provider.icon"
        />
      </div>
    </div>
  </section>
</template>

<style>

</style>
