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
