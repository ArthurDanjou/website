export default defineNuxtConfig({
  srcDir: 'src',

  build: {
    transpile: ['trpc-nuxt'],
  },

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
