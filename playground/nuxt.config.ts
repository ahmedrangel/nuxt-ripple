export default defineNuxtConfig({
  compatibilityDate: '2024-11-21',
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
  },
  modules: ['nuxt-ripple', '@nuxt/ui'],
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  ripple: {
    // ripple options
  },
})
