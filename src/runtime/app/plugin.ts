import { computed, ref, type Ref } from 'vue'
import { addHeadStyles, unmountListeners, modeHandler, setAttributes } from './utils'
import type { Listeners, Intervals, UseRipple } from './types'
import { defineNuxtPlugin, useAppConfig } from '#app'
import type { NuxtRippleOptions } from '~/src/types'

class Ripple {
  state: Ref<NuxtRippleOptions>
  listeners: Listeners
  intervals: Intervals
  mode: UseRipple['mode']
  color: UseRipple['color']
  duration: UseRipple['duration']
  scale: UseRipple['scale']
  pulseInterval: UseRipple['pulseInterval']
  overflow: UseRipple['overflow']
  constructor() {
    this.state = ref(useAppConfig().ripple as NuxtRippleOptions)
    this.listeners = new Map<HTMLElement, (e: Event) => void>()
    this.intervals = new Map<HTMLElement, NodeJS.Timeout>()
    this.mode = computed(() => this.state.value.mode)
    this.color = computed(() => this.state.value.color)
    this.duration = computed(() => this.state.value.duration)
    this.scale = computed(() => this.state.value.scale)
    this.pulseInterval = computed(() => this.state.value.pulseInterval)
    this.overflow = computed(() => this.state.value.overflow)
  }

  mount(config?: NuxtRippleOptions) {
    this.state.value = config || this.state.value
    if (!import.meta.client) return
    addHeadStyles(this.state.value)
    const selector = document.querySelectorAll<HTMLElement>('[data-ripple-bound="true"]')
    for (const el of selector) {
      unmountListeners(el, this.listeners, this.intervals)
      modeHandler(el, this.state.value, this.listeners, this.intervals)
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const ripple = new Ripple()
  nuxtApp.hook('app:mounted', () => {
    ripple.mount()
  })
  nuxtApp.vueApp.directive<HTMLElement, Partial<NuxtRippleOptions>>('ripple', {
    beforeMount(el, binding) {
      el.dataset.rippleBound = 'true'
      setAttributes(el, binding.value)
    },
    mounted(el) {
      modeHandler(el, ripple.state.value, ripple.listeners, ripple.intervals)
    },
    updated(el, binding) {
      setAttributes(el, binding.value)
    },
    unmounted(el) {
      unmountListeners(el, ripple.listeners, ripple.intervals)
    },
    getSSRProps() {
      return {}
    },
  })

  return {
    provide: {
      ripple: {
        state: ripple.state,
        mode: ripple.mode,
        color: ripple.color,
        duration: ripple.duration,
        scale: ripple.scale,
        pulseInterval: ripple.pulseInterval,
        overflow: ripple.overflow,
        mount: ripple.mount.bind(ripple),
      },
    },
  }
})
