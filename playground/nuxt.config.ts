export default defineNuxtConfig({
  modules: ['nuxt-ripple', '@nuxt/ui', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '',
      htmlAttrs: {
        lang: 'en',
      },
      link: [],
      meta: [
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site:name', content: 'Nuxt Ripple' },
      ],
    },
  },
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  features: {
    inlineStyles: false,
  },
  compatibilityDate: '2024-11-21',
  icon: {
    mode: 'svg',
    clientBundle: {
      scan: true,
    },
  },
  ripple: {
    // ripple options
  },
})
