import type { RippleModes } from './types'

export interface NuxtRippleRuntimeOptions {
  /**
   * Default ripple mode
   *
   * @default "click"
   */
  mode: RippleModes

  /**
   * Default ripple color
   *
   * Accepts HEX, RGB or RGBA Values. Use RGBA with low opacity to create a transparent ripple
   *
   * @default "rgba(255, 255, 255, 0.4)"
   *
   */
  color: string

  /**
   * Default ripple duration
   *
   * Propagation duration in miliseconds
   *
   * @default 350
   */
  duration: number

  /**
   * Default ripple scale
   *
   * @default 1
   */
  scale: number

  /**
   * Default ripple overflow behavior
   *
   * If false the ripple will not propagate outside the element; otherwise it will propagate outside the element
   *
   * @default false
   */
  overflow: boolean

  /**
   * Default ripple pulse interval speed
   *
   * Require "pulse" mode enabled. Pulse interval speed in miliseconds
   *
   * @default 1000
   *
   */
  pulseSpeed: number
}
