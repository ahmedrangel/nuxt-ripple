import { useMutationObserver } from '@vueuse/core'
import { ref, type Ref } from 'vue'
import type { Intervals, Listeners, NuxtRippleRuntimeOptions, RippleDirectiveOptions } from '../../types'
import { addHeadStyles, unmountListeners, modeHandler } from './utils'
import { defineNuxtPlugin, useAppConfig } from '#app'

class Ripple {
  state: Ref<NuxtRippleRuntimeOptions>
  listeners: Listeners
  intervals: Intervals
  constructor() {
    this.state = ref(useAppConfig().ripple as NuxtRippleRuntimeOptions)
    this.listeners = new Map<HTMLElement, (e: Event) => void>()
    this.intervals = new Map<HTMLElement, NodeJS.Timeout>()
  }

  mount(config?: NuxtRippleRuntimeOptions) {
    this.state.value = config || this.state.value
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
  nuxtApp.hook('app:mounted', () => {
    ripple.mount()
    useMutationObserver(document.body, () => {
      ripple.mount()
    }, { childList: true, subtree: true })
  })
  nuxtApp.vueApp.directive<HTMLElement, Partial<RippleDirectiveOptions>>('ripple', {
    mounted(el) {
      el.classList.add('nuxt-ripple')
    },
    updated(el, binding) {
      const config = binding.value
      if (!config) return
      for (const [key, value] of Object.entries(config)) {
        el.setAttribute(`data-ripple-${key}`, String(value))
      }
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
    provide: { ripple },
  }
})
