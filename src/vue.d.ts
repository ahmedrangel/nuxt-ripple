import type { RippleDataAttributes, RippleDataProps } from './types'

declare module 'vue' {
  interface HTMLAttributes extends RippleDataAttributes {}
  interface ComponentCustomProps extends RippleDataProps {}
  interface GlobalDirectives {
    vRipple: boolean
  }
}

export {}
