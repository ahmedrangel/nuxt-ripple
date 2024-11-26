export default defineNuxtConfig({
  modules: ['nuxt-ripple', '@nuxt/ui', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },
  compatibilityDate: '2024-11-21',
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      }
    }
  },
  ripple: {
    // ripple options
  },
})
