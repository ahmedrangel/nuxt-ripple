import type { ObjectDirective } from 'vue'
import type { NuxtRippleRuntimeOptions } from './schema-types'

declare module 'vue' {
  interface GlobalDirectives {
    vRipple: ObjectDirective<HTMLElement, Partial<NuxtRippleRuntimeOptions>>
  }
}

export {}
