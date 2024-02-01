export default defineNuxtConfig({
  srcDir: 'src',

  css: [
    '@/assets/css/main.scss',
  ],

  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxthq/studio',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },

  components: [
    'components/',
    'components/header',
    'components/resume',
    'components/maths',
  ],

  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  ui: {
    icons: 'all',
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  image: {
    domains: [
      'avatars0.githubusercontent.com',
      'pbs.twimg.com',
    ],
  },
})
