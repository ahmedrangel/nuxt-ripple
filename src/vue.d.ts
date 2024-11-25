import type { ObjectDirective } from 'vue'
import type { NuxtRippleOptions } from './types'

declare module 'vue' {
  interface GlobalDirectives {
    vRipple: ObjectDirective<HTMLElement, Partial<NuxtRippleOptions>>
  }
}

export {}
