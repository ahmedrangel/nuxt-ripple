import { defineNuxtModule, createResolver, addPlugin, addImports } from '@nuxt/kit'
import { schema } from './schema'
import type { ModuleOptions } from './types'
import './vue.d'

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
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Merge options to app.config
    const runtimeOptions = Object.fromEntries(
      Object.entries(options)
        .filter(([key]) => key in schema),
    )

    nuxt.options.appConfig.ripple = Object.assign(
      nuxt.options.appConfig.ripple || {},
      runtimeOptions,
    )

    // Define types for the app.config
    nuxt.hook('schema:extend', (schemas) => {
      schemas.push({
        appConfig: {
          ripple: schema,
        },
      })
    })

    addImports({ name: 'useRipple', from: resolver.resolve('runtime/app/composables') })
    nuxt.options.css.push(resolver.resolve('./runtime/app/assets/css/main.css'))
    addPlugin(resolver.resolve('./runtime/app/plugin'))
  },
})
