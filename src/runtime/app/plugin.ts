import { useMutationObserver } from '@vueuse/core'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { Intervals, Listeners, NuxtRippleRuntimeOptions, RippleDirectiveOptions } from '../../types'
import { addHeadStyles, unmountListeners, modeHandler, setAttributes } from './utils'
import { defineNuxtPlugin, useAppConfig } from '#app'

class Ripple {
  state: Ref<NuxtRippleRuntimeOptions>
  listeners: Listeners
  intervals: Intervals
  mode: ComputedRef<NuxtRippleRuntimeOptions['mode']>
  color: ComputedRef<NuxtRippleRuntimeOptions['color']>
  duration: ComputedRef<NuxtRippleRuntimeOptions['duration']>
  scale: ComputedRef<NuxtRippleRuntimeOptions['scale']>
  pulseSpeed: ComputedRef<NuxtRippleRuntimeOptions['pulseSpeed']>
  overflow: ComputedRef<NuxtRippleRuntimeOptions['overflow']>
  clear: boolean
  constructor() {
    this.state = ref(useAppConfig().ripple as NuxtRippleRuntimeOptions)
    this.listeners = new Map<HTMLElement, (e: Event) => void>()
    this.intervals = new Map<HTMLElement, NodeJS.Timeout>()
    this.mode = computed(() => this.state.value.mode)
    this.color = computed(() => this.state.value.color)
    this.duration = computed(() => this.state.value.duration)
    this.scale = computed(() => this.state.value.scale)
    this.pulseSpeed = computed(() => this.state.value.pulseSpeed)
    this.overflow = computed(() => this.state.value.overflow)
    this.clear = false
  }

  mount(config?: NuxtRippleRuntimeOptions) {
    this.state.value = config || this.state.value
    if (!import.meta.client) return
    addHeadStyles(this.state.value)
    const selector = document.querySelectorAll<HTMLElement>('.nuxt-ripple')
    for (const el of selector) {
      unmountListeners(el, this.listeners, this.intervals)
      modeHandler(el, this.state.value, this.listeners, this.intervals)
    }
  }

  clearRipples() {
    if (!import.meta.client) return
    this.clear = true
    const selector = document.querySelectorAll<HTMLElement>('.nuxt-ripple')
    for (const el of selector) {
      unmountListeners(el, this.listeners, this.intervals)
      el.classList.remove('nuxt-ripple-pulse')
      el.classList.remove('nuxt-ripple-ripple')
      this.listeners.delete(el)
      this.intervals.delete(el)
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const ripple = new Ripple()
  nuxtApp.hook('app:mounted', () => {
    ripple.mount()
    useMutationObserver(document.body, () => {
      if (ripple.clear) {
        ripple.clear = false
        return
      }
      ripple.mount()
    }, { childList: true, subtree: true })
  })
  nuxtApp.vueApp.directive<HTMLElement, Partial<RippleDirectiveOptions>>('ripple', {
    mounted(el, binding) {
      el.classList.add('nuxt-ripple')
      setAttributes(el, binding.value)
    },
    updated(el, binding) {
      setAttributes(el, binding.value)
    },
    unmounted(el) {
      el.classList.remove('nuxt-ripple')
      unmountListeners(el, ripple.listeners, ripple.intervals)
    },
    getSSRProps() {
      return {}
    },
  })

  return {
    provide: {
      ripple,
    },
  }
})
