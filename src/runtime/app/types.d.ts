import type { ComputedRef } from 'vue'
import type { NuxtRippleOptions } from '../../types'

// Plugin
export type Listeners = Map<HTMLElement, (e: Event) => void>
export type Intervals = Map<HTMLElement, NodeJS.Timeout>

// Generic type
type ToRequiredComputedRef<T> = {
  [K in keyof T]-?: ComputedRef<T[K]>;
}

// Composable
export interface UseRippleReturn extends ToRequiredComputedRef<NuxtRippleOptions> {
  updateRippleConfig: (config: Partial<NuxtRippleOptions>) => void
}
