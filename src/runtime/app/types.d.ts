import type { ComputedRef } from 'vue'
import type { NuxtRippleRuntimeOptions } from '../../types'

// Plugin
export type Listeners = Map<HTMLElement, (e: Event) => void>
export type Intervals = Map<HTMLElement, NodeJS.Timeout>

// Generic type
type ToRequiredComputedRef<T> = {
  [K in keyof T]-?: ComputedRef<T[K]>;
}

// Composable
export interface UseRippleReturn extends ToRequiredComputedRef<NuxtRippleRuntimeOptions> {
  updateRippleConfig: (config: Partial<NuxtRippleRuntimeOptions>) => void
}
