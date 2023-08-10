<script setup>
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
  <div class="w-container lg:my-32">
    <div class="max-w-2xl space-y-8">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl !leading-tight">
        Software engineer and mathematics lover
      </h1>
      <p class="leading-relaxed text-subtitle">
        I'm Arthur, a software engineer passionate about artificial intelligence and the cloud but also a mathematics student living in France. I am currently studying mathematics at the Faculty of Sciences of Paris-Saclay.
      </p>
      <div class="flex gap-4">
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
  </div>
</template>

<style>

</style>
