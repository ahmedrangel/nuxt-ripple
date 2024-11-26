export default defineNuxtConfig({
  modules: ['nuxt-ripple', '@nuxt/ui', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  compatibilityDate: '2024-11-21',
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  ripple: {
    // ripple options
  },
})
