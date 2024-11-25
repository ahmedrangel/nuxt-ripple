import { defineNuxtModule, createResolver, addPlugin, addImports } from '@nuxt/kit'
import './vue.d'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ripple',
    configKey: 'ripple',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    color: 'rgba(255, 255, 255, 0.4)',
    mode: 'click',
    duration: 350,
    scale: 1,
    overflow: false,
    pulseInterval: 1000,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.appConfig.ripple = Object.assign(
      nuxt.options.appConfig.ripple || {},
      options,
    )

    addImports({ name: 'useRipple', from: resolver.resolve('runtime/app/composables') })
    nuxt.options.css.push(resolver.resolve('./runtime/app/assets/css/main.css'))
    addPlugin(resolver.resolve('./runtime/app/plugin'))
  },
})
