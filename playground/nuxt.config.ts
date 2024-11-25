export default defineNuxtConfig({
  modules: ['nuxt-ripple', '@nuxt/ui'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: '2024-11-21',
  ripple: {
    // ripple options
  },
})
