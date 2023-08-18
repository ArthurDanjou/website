export default defineNuxtConfig({
  srcDir: 'src',

  build: {
    transpile: ['trpc-nuxt'],
  },

  css: [
    '@/assets/css/main.scss',
  ],

  modules: [
    '@nuxthq/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@nuxt/content',
    'nuxt-icon',
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
  ],

  tailwindcss: {
    viewer: true,
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
})
