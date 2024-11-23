import type { NuxtRippleRuntimeOptions } from '../../types'
import { useState } from '#app'

export function useRipple() {
  const rippleState = useState<NuxtRippleRuntimeOptions>('nuxt-ripple-config')
  return rippleState
}
