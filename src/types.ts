export interface NuxtRippleOptions {
  /**
   * Ripple mode
   *
   * @default "click"
   */
  mode: 'click' | 'hover' | 'pulse'

  /**
   * Ripple color
   *
   * Ripple color. Accepts HEX, RGB, or RGBA Values. Use RGBA with low opacity to create a transparent ripple effect
   *
   * @default "rgba(255, 255, 255, 0.4)"
   *
   */
  color: string

  /**
   * Ripple duration
   *
   * Propagation duration in miliseconds
   *
   * @default 350
   */
  duration: number

  /**
   * Ripple scale
   *
   * @default 1
   */
  scale: number

  /**
   * Ripple overflow behavior
   *
   * If false the ripple will not propagate outside the element; otherwise, it will
   *
   * @default false
   */
  overflow: boolean

  /**
   * Ripple pulse interval speed
   *
   * Requires "pulse" mode enabled. Pulse interval speed in miliseconds
   *
   * @default 1000
   *
   */
  pulseInterval: number
}

export type ModuleOptions = NuxtRippleOptions
