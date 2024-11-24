import type { ObjectDirective } from 'vue'
import type { RippleDirectiveOptions } from './types'

declare module 'vue' {
  interface GlobalDirectives {
    vRipple: ObjectDirective<HTMLElement, Partial<RippleDirectiveOptions>>
  }
}

export {}
