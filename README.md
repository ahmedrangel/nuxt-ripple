# Nuxt Ripple

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Add simple ripple effects to your elements with customizable settings.

- [✨ Release Notes](https://github.com/ahmedrangel/nuxt-ripple/blob/main/CHANGELOG.md)

## Quick Setup

1. Add `nuxt-ripple` dependency to your project.

```bash
pnpm add nuxt-ripple
```

2. Add `nuxt-ripple` to the `modules` section of `nuxt.config.ts`.

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-ripple'
  ]
})
```

## Simple Usage
Use the `v-ripple` directive on any element where you want to apply the ripple effect.
```vue
<button v-ripple>Click me!</button>
```

## Configuration
If you want to modify the default global settings for all your ripple effects, you can set it in the `ripple` app options property in your `nuxt.config.ts` file.
```js
export default defineNuxtConfig({
  // Set the default global settings for all your ripple effects
  ripple: {
    mode: 'click',
    color: 'rgba(255, 255, 255, 0.4)',
    duration: 350,
    scale: 1,
    overflow: false,
    pulseInterval: 1000 // -> Requires 'pulse' mode to be enabled for it to take effect
  },
})
```

## Available options
| Argument | Type | Description | Required |
| --- | --- | --- | --- |
| `mode` | `'click'`, `'hover'` or `'pulse'`  | Ripple mode. | ❌ |
| `color` | `string`  | Ripple color. Accepts HEX, RGB, or RGBA Values. Use RGBA with low opacity to create a transparent ripple effect. | ❌ |
| `duration` | `number`  | Ripple propagation duration in miliseconds. | ❌ |
| `overflow` | `boolean` | Ripple overflow. If false the ripple will not propagate outside the element; otherwise, it will. | ❌ |
| `scale` | `number` | Ripple scale. | ❌ |
| `pulseInterval` | `number` | Ripple pulse interval speed in miliseonds. Require `'pulse'` mode enabled. | ❌ |

## Override global settings for a specific element
If you want to override the default global settings for a specific element, you can pass an object with the desired [options](#available-options) to the `v-ripple` directive.
```vue
<!-- Overrides the mode to 'hover' for this specific element -->
<button v-ripple="{ mode: 'hover' }">Click me!</button>
```

## Utils
You can dynamically update the default global settings using `useRipple().updateRippleConfig({ ...options })` passing the [options](#available-options) you want to update.
```vue
<script setup>
const { updateRippleConfig } = useRipple()

updateRippleConfig({ mode: 'hover', overflow: true })
</script>
```
As an extra, you can get all the global settings as readonly reactive objects
```vue
<script setup>
const { color, mode, duration, overflow, scale, pulseInterval } = useRipple()
// color.value
// ...
</script>

<template>
  <main>{{ color }}</main>
</template>
``` 

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-ripple/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-ripple

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-ripple.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-ripple

[license-src]: https://img.shields.io/npm/l/nuxt-ripple.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-ripple

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
