export default defineNuxtConfig({
  srcDir: 'src',

  build: {
    transpile: ['trpc-nuxt'],
  },

  css: [
    '@/assets/css/main.scss',
  ],

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/color-mode',
    '@nuxtjs/fontaine',
    '@vueuse/nuxt',
    '@nuxt/content',
    'nuxt-icon',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },

  devtools: {
    enabled: true,
    vscode: {
      enabled: true,
      startOnBoot: true,
      port: 3001,
      reuseExistingServer: true,
      mode: 'tunnel',
    },
  },
})
