<script setup lang="ts">
import chroma from 'color'

const { color, mode, overflow, scale, updateRippleConfig } = useRipple()

const currentMode = ref(mode.value)
const currentColor = ref(toHex(color.value))
const currentOpacity = ref(chroma(color.value).rgb().alpha())
const currentOverflow = ref(overflow.value)
const currentScale = ref(scale.value)
const randomColor = ref(color.value)
const dynamic = ref(false)

watchEffect(() => {
  updateRippleConfig({
    mode: currentMode.value,
    color: toRGBA(currentColor.value, currentOpacity.value),
    overflow: currentOverflow.value,
    scale: currentScale.value,
  })
})

const generateDynamic = async () => {
  dynamic.value = false
  await new Promise(resolve => setTimeout(() => resolve(true), 2000))
  dynamic.value = true
}

onMounted(async () => {
  setInterval(() => randomColor.value = getRandomColor(), 1000)
  await generateDynamic()
})

useSeoMeta({
  title: `Advanced Demo | ${SITE.name}`,
  description: 'Nuxt-Ripple Advanced Demo',
})

useHead({
  link: [
    { rel: 'canonical', href: SITE.url + '/advanced-demo' },
  ],
})
</script>

<template>
  <main>
    <p class="text-2xl">Global settings</p>
    <p class="mb-3">Using <b>updateRippleConfig({ ...options })</b> method from <b>useRipple()</b> composable to mutate the default configs</p>
    <div class="flex flex-wrap gap-2">
      <span class="border rounded p-2 border-gray-300 dark:border-gray-600">
        <p class="text-md">Mode: {{ currentMode }}</p>
        <USelect v-model="currentMode" :options="['click', 'hover', 'pulse']" />
      </span>
      <span class="border rounded p-2 flex gap-4 border-gray-300 dark:border-gray-600">
        <div>
          <p class="text-md">Color: {{ chroma(currentColor).rgb().array() }}</p>
          <input v-model="currentColor" type="color" style="width: 90px; height: 36px;">
        </div>
        <div>
          <p class="text-md">Alpha: {{ currentOpacity }}</p>
          <URange v-model="currentOpacity" :min="0" :max="1" :step="0.1" />
        </div>
      </span>
      <span class="border rounded p-2 border-gray-300 dark:border-gray-600">
        <p class="text-md">Overflow: {{ currentOverflow }}</p>
        <UToggle v-model="currentOverflow" />
      </span>
      <span class="border rounded p-2 w-40 border-gray-300 dark:border-gray-600">
        <p class="text-md">Scale: {{ currentScale }}</p>
        <URange v-model="currentScale" :min="0" :max="5" :step="0.1" class="w-30" />
      </span>
      <span class="border rounded p-2 border-gray-300 dark:border-gray-600">
        <p class="text-md">Dynamic generated: {{ dynamic }}</p>
        <UButton @click="generateDynamic">Reload</UButton>
      </span>
    </div>
    <hr class="my-4 border-1 border-gray-300 dark:border-gray-600">
    <p class="text-2xl">Globally affected</p>
    <div class="flex flex-wrap gap-2 py-2">
      <UButton v-ripple class="p-4">BUTTON</UButton>
      <UButton v-ripple class="p-4">BUTTON</UButton>
    </div>
    <hr class="my-4 border-1 border-gray-300 dark:border-gray-600">
    <p class="text-2xl py-2">Overriding global config</p>
    <p class="text-lg">Passing an object with custom options to <b>v-ripple</b> directive</p>
    <div class="flex flex-wrap gap-4">
      <span>
        <p class="text-lg"><b>Color:</b> string</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple="{ color: toRGBA('green', currentOpacity) }" class="p-4">GREEN</UButton>
          <UButton v-ripple="{ color: toRGBA('red', currentOpacity) }" class="p-4">RED</UButton>
          <UButton v-ripple="{ color: toRGBA(randomColor, currentOpacity) }" class="p-4" @click="randomColor = getRandomColor()">RANDOM</UButton>
        </div>
      </span>
      <span>
        <p class="text-lg"><b>Mode:</b> 'click' | 'hover' | 'pulse'</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple="{ mode: 'click' }" class="p-4">CLICK</UButton>
          <UButton v-ripple="{ mode: 'hover' }" class="p-4">HOVER</UButton>
          <UButton v-ripple="{ mode: 'pulse' }" class="p-4">PULSE</UButton>
        </div>
      </span>
      <span>
        <p class="text-lg"><b>Overflow:</b> boolean</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple="{ overflow: false }" class="p-4">FALSE</UButton>
          <UButton v-ripple="{ overflow: true }" class="p-4">TRUE</UButton>
        </div>
      </span>
      <span>
        <p class="text-lg"><b>Duration:</b> number</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple="{ duration: 1000 }" class="p-4">1000 (ms)</UButton>
          <UButton v-ripple="{ duration: 3000 }" class="p-4">3000 (ms)</UButton>
        </div>
      </span>
      <span>
        <p class="text-lg"><b>Scale:</b> number</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple="{ scale: 1 }" class="p-4">1</UButton>
          <UButton v-ripple="{ scale: 3 }" class="p-4">3</UButton>
        </div>
      </span>
    </div>
    <p class="text-lg">Overriding multiple settings</p>
    <div class="flex flex-wrap gap-2 py-2">
      <UButton v-ripple="{ mode: 'hover', color: toRGBA('red', currentOpacity) }" class="p-4">{ mode: 'hover', color: 'red' }</UButton>
      <UButton v-ripple="{ mode: 'pulse', color: toRGBA('yellow', currentOpacity), pulseInterval: 2000 }" class="p-4">{ mode: 'pulse', color: 'yellow', pulseInterval: 2000 }</UButton>
    </div>
    <hr class="my-4 border-1 border-gray-300 dark:border-gray-600">
    <p class="text-2xl">Dynamically generated</p>
    <div v-if="dynamic" class="flex gap-2 py-2">
      <UButton v-ripple="{ mode: 'click' }" class="p-4">MODE (click)</UButton>
      <UButton v-ripple="{ mode: 'hover' }" class="p-4">HOVER</UButton>
      <UButton v-ripple="{ mode: 'pulse', color: toRGBA('blue', currentOpacity), overflow: true }" class="p-4">BLUE + PULSE + OVERFLOW TRUE</UButton>
    </div>
    <div v-else>
      loading...
    </div>
  </main>
</template>
