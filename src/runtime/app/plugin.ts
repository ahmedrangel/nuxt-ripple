import { useMutationObserver } from '@vueuse/core'
import { watch, ref, type Ref } from 'vue'
import type { Intervals, Listeners, NuxtRippleRuntimeOptions } from '../../types'
import { addHeadStyles, unmountListeners, modeHandler } from './utils'
import { defineNuxtPlugin, useAppConfig, useState } from '#app'

class Ripple {
  state: Ref<NuxtRippleRuntimeOptions | null>
  listeners: Listeners
  intervals: Intervals
  constructor() {
    this.state = ref(null)
    this.listeners = new Map<HTMLElement, (e: Event) => void>()
    this.intervals = new Map<HTMLElement, NodeJS.Timeout>()
  }

  mountRipple() {
    this.state = useState<NuxtRippleRuntimeOptions>('nuxt-ripple-config')
    watch(this.state, () => {
      const config = this.state.value
      if (!config) return
      addHeadStyles(config)
      const selector = document.querySelectorAll<HTMLElement>('.nuxt-ripple')
      for (const el of selector) {
        unmountListeners(el, this.listeners, this.intervals)
        modeHandler(el, config, this.listeners, this.intervals)
      }
    }, { immediate: true })
  }
}

const ripple = new Ripple()

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig().ripple || {}
  const useRipple = useState('nuxt-ripple-config')
  useRipple.value = config
  nuxtApp.hook('app:mounted', () => {
    useMutationObserver(document.body, () => {
      ripple.mountRipple()
    }, { childList: true, subtree: true })
  })
  nuxtApp.vueApp.directive<HTMLElement, boolean>('ripple', {
    mounted(el) {
      el.classList.add('nuxt-ripple')
    },
    unmounted(el) {
      el.classList.remove('nuxt-ripple')
      unmountListeners(el, ripple.listeners, ripple.intervals)
    },
  })
})
