export default defineNuxtConfig({
  srcDir: 'src',

  css: [
    '@/assets/css/main.scss',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@nuxtjs/seo',
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

  site: {
    url: 'https://arthurdanjou.fr',
    name: 'My portfolio',
    description: 'Developer enjoying Cloud Infrastructure and Artificial Intelligence. Mathematics Student at Paris-Saclay',
  },
})
