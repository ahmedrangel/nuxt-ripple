import type { NuxtRippleRuntimeOptions } from '../../types'
import { useNuxtApp } from '#app'

export function useRipple(config?: Partial<NuxtRippleRuntimeOptions>): Readonly<NuxtRippleRuntimeOptions> {
  const { $ripple } = useNuxtApp()
  if (!import.meta.client) return $ripple.state.value
  const state = $ripple.state.value
  if (!config) return state
  const newConfig = Object.assign(state, config)
  $ripple.mount(newConfig)
  return state
}
