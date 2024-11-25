import { useMutationObserver } from '@vueuse/core'
import { computed, ref, type Ref } from 'vue'
import type { NuxtRippleRuntimeOptions } from '../../types'
import { addHeadStyles, unmountListeners, modeHandler, setAttributes } from './utils'
import type { Listeners, Intervals, UseRippleReturn } from './types'
import { defineNuxtPlugin, useAppConfig } from '#app'

class Ripple {
  state: Ref<NuxtRippleRuntimeOptions>
  listeners: Listeners
  intervals: Intervals
  mode: UseRippleReturn['mode']
  color: UseRippleReturn['color']
  duration: UseRippleReturn['duration']
  scale: UseRippleReturn['scale']
  pulseInterval: UseRippleReturn['pulseInterval']
  overflow: UseRippleReturn['overflow']
  constructor() {
    this.state = ref(useAppConfig().ripple as NuxtRippleRuntimeOptions)
    this.listeners = new Map<HTMLElement, (e: Event) => void>()
    this.intervals = new Map<HTMLElement, NodeJS.Timeout>()
    this.mode = computed(() => this.state.value.mode)
    this.color = computed(() => this.state.value.color)
    this.duration = computed(() => this.state.value.duration)
    this.scale = computed(() => this.state.value.scale)
    this.pulseInterval = computed(() => this.state.value.pulseInterval)
    this.overflow = computed(() => this.state.value.overflow)
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
}

export default defineNuxtPlugin((nuxtApp) => {
  const ripple = new Ripple()
  nuxtApp.hook('page:finish', () => {
    ripple.mount()
    useMutationObserver(document.body, () => {
      ripple.mount()
    }, { childList: true, subtree: true })
  })
  nuxtApp.vueApp.directive<HTMLElement, Partial<NuxtRippleRuntimeOptions>>('ripple', {
    beforeMount(el, binding) {
      el.classList.add('nuxt-ripple')
      setAttributes(el, binding.value)
    },
    updated(el, binding) {
      el.classList.add('nuxt-ripple')
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
