import type { NuxtRippleRuntimeOptions } from './schema-types'

export type { NuxtRippleRuntimeOptions }

export type Listeners = Map<HTMLElement, (e: Event) => void>
export type Intervals = Map<HTMLElement, NodeJS.Timeout>

export type RippleModes = 'click' | 'hover' | 'pulse'

type Booleanish = boolean | 'true' | 'false'

export interface RippleDataAttributes {
  'data-ripple-mode'?: RippleModes
  'data-ripple-color'?: string
  'data-ripple-pulseSpeed'?: number | string
  'data-ripple-overflow'?: Booleanish
  'data-ripple-scale'?: number | string
}

export interface RippleDirectiveOptions {
  mode?: NuxtRippleRuntimeOptions['mode']
  color?: NuxtRippleRuntimeOptions['color']
  pulseSpeed?: NuxtRippleRuntimeOptions['pulseSpeed']
  overflow?: NuxtRippleRuntimeOptions['overflow']
}

export interface CssTextBuilder {
  '--t'?: number
  '--o'?: number
  '--d'?: number
  '--x'?: number
  '--y'?: number
  '--s'?: number
  'color'?: string
  'overflow'?: string
}

export type ModuleOptions = Partial<NuxtRippleRuntimeOptions>
