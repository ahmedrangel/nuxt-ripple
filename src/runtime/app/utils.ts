import type { Intervals, Listeners, NuxtRippleRuntimeOptions, RippleDataAttributes, CssTextBuilder } from '../../types'

enum RippleEvent {
  CLICK = 'mousedown',
  HOVER = 'mouseover',
  TRANSITION_END = 'transitionend',
}

const cssTextBuilder = (options: CssTextBuilder) =>
  Object.entries(options).filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key === 'color' ? '--nuxt-ripple-background-color' : key}: ${value};`)
    .join('')

const applyEffects = (el: HTMLElement, styles: CssTextBuilder, endTransition?: boolean) => {
  el.style.cssText = cssTextBuilder(styles)
  if (endTransition) el.addEventListener(RippleEvent.TRANSITION_END, () => el.removeAttribute('style'), { once: true })
  else void el.offsetTop
}

export const addHeadStyles = (config: NuxtRippleRuntimeOptions) => {
  const styleId = 'nuxt-ripple-styles'
  const styleContent = `.nuxt-ripple{overflow: ${config.overflow === true ? 'visible' : 'hidden'};}`
    + `.nuxt-ripple:before{`
    + `transition: calc(var(--t, 0) * ${config.duration || 350}ms) linear;`
    + `transform: translate(-50%, -50%) scale(var(--s, ${config.scale || 1}));}`
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

export const animationHandler = (e: MouseEvent | TouchEvent, el: HTMLElement, config: NuxtRippleRuntimeOptions) => {
  const { clientX, clientY } = (e as TouchEvent).touches?.[0] || (e as MouseEvent)
  const { left, top, width, height } = el.getBoundingClientRect()
  const rippleColor = el.getAttribute('data-ripple-color') as RippleDataAttributes['data-ripple-color'] || config.color || 'white'
  const rippleOverflow = el.getAttribute('data-ripple-overflow') as RippleDataAttributes['data-ripple-overflow']
  applyEffects(el, { 'color': rippleColor, '--s': 0, '--o': 1 })
  applyEffects(el, {
    '--t': 1,
    '--o': 0,
    '--d': Math.sqrt(width ** 2 + height ** 2) * 2,
    '--x': clientX - left,
    '--y': clientY - top,
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

export const modeHandler = (el: HTMLElement, config: NuxtRippleRuntimeOptions, listeners: Listeners, intervals: Intervals) => {
  if (listeners.has(el)) return
  el.classList.remove('nuxt-ripple-pulse')
  const rippleMode = el.getAttribute('data-ripple-mode') as RippleDataAttributes['data-ripple-mode']
  const ripplePulseSpeed = Number(el.getAttribute('data-ripple-pulse-speed') as RippleDataAttributes['data-ripple-pulse-speed']) || config.pulseSpeed || 1000
  const rippleOverflow = el.getAttribute('data-ripple-overflow') as RippleDataAttributes['data-ripple-overflow']
  const rippleColor = el.getAttribute('data-ripple-color') as RippleDataAttributes['data-ripple-color'] || config.color || 'white'
  const eventHandler = (e: Event) => animationHandler(e as MouseEvent | TouchEvent, el, config)
  if ((config.mode === 'hover' && !rippleMode) || rippleMode === 'hover') {
    el.addEventListener(RippleEvent.HOVER, eventHandler)
    listeners.set(el, eventHandler)
  }
  else if ((config.mode === 'pulse' && !rippleMode) || rippleMode === 'pulse') {
    el.classList.add('nuxt-ripple-pulse')
    intervals.set(el, setInterval(() => {
      const { width, height } = el.getBoundingClientRect()
      applyEffects(el, { 'color': rippleColor, '--s': 0, '--o': 1 })
      applyEffects(el, {
        '--t': 1,
        '--o': 0,
        '--d': Math.sqrt(width ** 2 + height ** 2) * 2,
        ...rippleOverflow === 'true' || rippleOverflow === true ? { overflow: 'visible' } : rippleOverflow === 'false' || rippleOverflow === false ? { overflow: 'hidden' } : {},
      }, true)
    }, ripplePulseSpeed))
  }
  else {
    el.addEventListener(RippleEvent.CLICK, eventHandler)
    listeners.set(el, eventHandler)
  }
}
