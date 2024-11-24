import type { NuxtRippleRuntimeOptions } from '../../types'
import { useState } from '#app'

export function useRipple(config?: Partial<NuxtRippleRuntimeOptions>): Readonly<NuxtRippleRuntimeOptions> {
  if (!config) {
    const rippleState = useState<NuxtRippleRuntimeOptions>('nuxt-ripple-config')
    return rippleState.value
  }
  const rippleState = useState<NuxtRippleRuntimeOptions>('nuxt-ripple-config')
  rippleState.value = Object.assign(rippleState.value, config);
  return rippleState.value
}
