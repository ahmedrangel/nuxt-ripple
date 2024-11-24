import type { NuxtRippleRuntimeOptions } from '../../types'
import { useNuxtApp } from '#app'

export const useRipple = () => {
  const { $ripple } = useNuxtApp()
  const rippleConfig = {
    mode: $ripple.mode,
    color: $ripple.color,
    duration: $ripple.duration,
    scale: $ripple.scale,
    overflow: $ripple.overflow,
    pulseInterval: $ripple.pulseInterval,
  }

  const updateRippleConfig = (config: Partial<NuxtRippleRuntimeOptions>) => {
    const newConfig = Object.assign($ripple.state.value, config)
    $ripple.mount(newConfig)
  }

  if (import.meta.server) {
    updateRippleConfig($ripple.state.value)
  }

  return { ...rippleConfig, updateRippleConfig }
}
