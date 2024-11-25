import type { NuxtRippleOptions } from '../../types'
import type { Listeners, Intervals } from './types'

enum RippleEvent {
  CLICK = 'mousedown',
  HOVER = 'mouseover',
  TRANSITION_END = 'transitionend',
}

const cssTextBuilder = (options: CssTextBuilder) => Object.entries(options)
  .filter(([_, value]) => value !== undefined)
  .map(([key, value]) => `${key}: ${value};`)
  .join('')

const applyEffects = (el: HTMLElement, styles: CssTextBuilder, endTransition?: boolean) => {
  el.style.cssText = cssTextBuilder(styles)
  if (endTransition) el.addEventListener(RippleEvent.TRANSITION_END, () => el.removeAttribute('style'), { once: true })
  else void el.offsetTop
}

export const addHeadStyles = (config: NuxtRippleOptions) => {
  const styleId = 'nuxt-ripple-styles'
  const styleContent = `[data-ripple-bound="true"]{overflow: ${config.overflow === true ? 'visible' : 'hidden'};}`
    + `[data-ripple-bound="true"]:before{`
    + `background-color: var(--nuxt-ripple-background-color, ${config.color});`
    + `transition: calc(var(--t, 0) * var(--nuxt-ripple-duration, ${config.duration}ms)) linear;`
    + `transform: translate(-50%, -50%) scale(var(--s, ${config.scale}));}`
    + `.nuxt-ripple-pulse:before{`
    + `background-color: var(--nuxt-ripple-background-color, ${config.color});}`
  const rippeStyles = document.getElementById(styleId)
  if (!rippeStyles) {
    const addStyle = document.createElement('style')
    addStyle.id = styleId
    addStyle.innerHTML = styleContent
    document.head.appendChild(addStyle)
  }
  else {
    rippeStyles.innerHTML = styleContent
  }
}

export const animationHandler = (e: MouseEvent | TouchEvent, el: HTMLElement) => {
  const { clientX, clientY } = (e as TouchEvent).touches?.[0] || (e as MouseEvent)
  const { left, top, width, height } = el.getBoundingClientRect()

  const rippleColor = el.getAttribute('data-ripple-color') as RippleDataAttributes['data-ripple-color']
  const rippleOverflow = el.getAttribute('data-ripple-overflow') as RippleDataAttributes['data-ripple-overflow']
  const rippleDuration = el.getAttribute('data-ripple-duration') as RippleDataAttributes['data-ripple-duration']
  const rippleScale = el.getAttribute('data-ripple-scale') as RippleDataAttributes['data-ripple-scale']

  applyEffects(el, {
    '--s': 0,
    '--o': 1,
    ...rippleColor ? { '--nuxt-ripple-background-color': rippleColor } : {},
  })
  applyEffects(el, {
    '--t': 1,
    '--o': 0,
    '--d': Math.sqrt(width ** 2 + height ** 2) * 2,
    '--x': clientX - left,
    '--y': clientY - top,
    ...rippleScale ? { '--s': Number(rippleScale) } : {},
    ...rippleColor ? { '--nuxt-ripple-background-color': rippleColor } : {},
    ...rippleDuration ? { '--nuxt-ripple-duration': String(rippleDuration) + 'ms' } : {},
    ...rippleOverflow === 'true' || rippleOverflow === true ? { overflow: 'visible' } : rippleOverflow === 'false' || rippleOverflow === false ? { overflow: 'hidden' } : {},
  }, true)
}

export const unmountListeners = (el: HTMLElement, listeners: Listeners, intervals: Intervals) => {
  if (listeners.has(el) || intervals.has(el)) {
    const removeListener = listeners.get(el)
    if (removeListener) {
      el.removeEventListener(RippleEvent.HOVER, removeListener)
      el.removeEventListener(RippleEvent.CLICK, removeListener)
      listeners.delete(el)
    }
    const interval = intervals.get(el)
    if (intervals.get(el)) {
      clearInterval(interval)
      intervals.delete(el)
    }
  }
}

export const modeHandler = (el: HTMLElement, config: NuxtRippleOptions, listeners: Listeners, intervals: Intervals) => {
  if (listeners.has(el)) return
  el.classList.remove('nuxt-ripple-pulse')

  const rippleMode = el.getAttribute('data-ripple-mode') as RippleDataAttributes['data-ripple-mode']
  const ripplepulseInterval = Number(el.getAttribute('data-ripple-pulseInterval') as RippleDataAttributes['data-ripple-pulseInterval']) || config.pulseInterval
  const rippleOverflow = el.getAttribute('data-ripple-overflow') as RippleDataAttributes['data-ripple-overflow']
  const rippleColor = el.getAttribute('data-ripple-color') as RippleDataAttributes['data-ripple-color']
  const rippleScale = el.getAttribute('data-ripple-scale') as RippleDataAttributes['data-ripple-scale']

  const eventHandler = (e: Event) => animationHandler(e as MouseEvent | TouchEvent, el)
  if ((config.mode === 'hover' && !rippleMode) || rippleMode === 'hover') {
    el.addEventListener(RippleEvent.HOVER, eventHandler)
    listeners.set(el, eventHandler)
  }
  else if ((config.mode === 'pulse' && !rippleMode) || rippleMode === 'pulse') {
    el.classList.add('nuxt-ripple-pulse')
    intervals.set(el, setInterval(() => {
      const { width, height } = el.getBoundingClientRect()
      applyEffects(el, {
        '--s': 0,
        '--o': 1,
        ...rippleColor ? { '--nuxt-ripple-background-color': rippleColor } : {},
      })
      applyEffects(el, {
        '--t': 1,
        '--o': 0,
        '--d': Math.sqrt(width ** 2 + height ** 2) * 2,
        ...rippleScale ? { '--s': Number(rippleScale) } : {},
        ...rippleColor ? { '--nuxt-ripple-background-color': rippleColor } : {},
        ...rippleOverflow === 'true' || rippleOverflow === true ? { overflow: 'visible' } : rippleOverflow === 'false' || rippleOverflow === false ? { overflow: 'hidden' } : {},
      }, true)
    }, ripplepulseInterval))
  }
  else {
    el.addEventListener(RippleEvent.CLICK, eventHandler)
    listeners.set(el, eventHandler)
  }
}

export const setAttributes = (el: HTMLElement, values?: Partial<NuxtRippleOptions>) => {
  if (!values) return
  for (const [key, value] of Object.entries(values)) {
    el.setAttribute(`data-ripple-${key}`, String(value))
  }
}

// Data Attributes
interface RippleDataAttributes {
  'data-ripple-mode'?: NuxtRippleOptions['mode']
  'data-ripple-color'?: string
  'data-ripple-pulseInterval'?: number | string
  'data-ripple-overflow'?: boolean | 'true' | 'false'
  'data-ripple-scale'?: number | string
  'data-ripple-duration'?: string
}

// CSS variables
interface CssTextBuilder {
  '--t'?: number
  '--o'?: number
  '--d'?: number
  '--x'?: number
  '--y'?: number
  '--s'?: number
  '--nuxt-ripple-background-color'?: string
  '--nuxt-ripple-duration'?: string
  'overflow'?: string
}
