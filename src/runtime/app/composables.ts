import type { NuxtRippleRuntimeOptions } from '../../types'
import { useState } from '#app'
import { computed } from 'vue'

export function useRipple() {
  const rippleState = useState<NuxtRippleRuntimeOptions>('nuxt-ripple-config')
  return computed(() => rippleState.value)
}
