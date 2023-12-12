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
  <div class="w-container mt-32 mb-24">
    <div class="flex items-center flex-col space-y-4">
      <h1 class="text-center lg:text-6xl sm:text-5xl text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 !leading-tight md:w-2/3">
        Software engineer, mathematics lover and AI enthusiast
      </h1>
      <p class="leading-relaxed text-subtitle text-center md:w-2/3 p-2">
        I'm Arthur, a software engineer passionate about artificial intelligence and the cloud but also a mathematics student living in France. I am currently studying mathematics at the Faculty of Sciences of Paris-Saclay.
      </p>
      <div class="flex gap-4">
        <UButton
          v-for="social in socials"
          :key="social.name"
          :icon="social.icon"
          size="md"
          :to="social.link"
          variant="ghost"
          target="_blank"
          :ui="{ rounded: 'rounded-full' }"
        />
      </div>
    </div>
  </div>
</template>
