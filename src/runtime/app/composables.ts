import type { NuxtRippleOptions } from '../../types'
import type { UseRippleReturn } from './types'
import { useNuxtApp } from '#app'

export const useRipple = (): UseRippleReturn => {
  const { $ripple } = useNuxtApp()
  const updateRippleConfig = (config: Partial<NuxtRippleOptions>) => {
    const newConfig = Object.assign($ripple.state.value, config)
    $ripple.mount(newConfig)
  }

  if (import.meta.server) {
    updateRippleConfig($ripple.state.value)
  }

  const { mode, color, duration, scale, overflow, pulseInterval } = $ripple

  return {
    mode,
    color,
    duration,
    scale,
    overflow,
    pulseInterval,
    updateRippleConfig,
  }
}
