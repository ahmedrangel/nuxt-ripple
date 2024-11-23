<script setup lang="ts">
import chroma from 'chroma-js'

const ripple = useRipple()
const dynamic = ref(false)

const toRGBA = (hex: string, aplha?: number) => {
  const [r, g, b] = chroma(hex).rgb()
  return `rgba(${r},${g},${b},${aplha || currentOpacity.value})`
}

const toHex = (value: string) => {
  return chroma(value).alpha(1).hex()
}

const randomColor = ref<string>(ripple.value.color)
const currentMode = ref(ripple.value.mode)
const currentColor = ref<string>(toHex(ripple.value.color))
const currentOpacity = ref(1)
const currentOverflow = ref<boolean>(ripple.value.overflow)

const getRandomColor = () => `#${((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0')}`

watchEffect(() => {
  ripple.value.mode = currentMode.value
  ripple.value.color = toRGBA(currentColor.value, currentOpacity.value)
  ripple.value.overflow = currentOverflow.value
})

const generateDynamic = async () => {
  dynamic.value = false
  await new Promise(resolve => setTimeout(() => resolve(true), 2000))
  dynamic.value = true
}

onMounted(async () => {
  setInterval(() => randomColor.value = getRandomColor(), 1000)
  await generateDynamic();
})
</script>

<template>
  <main class="container mx-auto py-5">
    <p class="text-3xl mb-2">Global settings</p>
    <p>Using <b>useRipple()</b> composable to mutate default configs</p>
    <div class="flex flex-wrap gap-2">
      <span class="border p-2">
        <p class="text-lg">Mode: {{ !ripple.mode ? "click" : ripple.mode }}</p>
        <USelect v-model="currentMode" :options="['click', 'hover', 'pulse']" />
      </span>
      <span class="border p-2">
        <p class="text-lg">Color: {{ chroma(currentColor).rgb() }}</p>
        <input v-model="currentColor" type="color" style="width: 90px; height: 36px;">
      </span>
      <span class="border p-2">
        <p class="text-lg">Opacity: {{ currentOpacity }}</p>
        <URange v-model="currentOpacity" :min="0" :max="1" :step="0.1" />
      </span>
      <span class="border p-2">
        <p class="text-lg">Overflow: {{ ripple.overflow ? "true" : "false" }}</p>
        <UToggle v-model="currentOverflow" />
      </span>
      <span class="border p-2">
        <p class="text-lg">Dynamic generated: {{ dynamic ? "true" : "false" }}</p>
        <UButton @click="generateDynamic">Reload</UButton>
      </span>
    </div>
    <hr class="my-4 border-1 border-black">
    <p class="text-3xl">Globally affected</p>
    <div class="flex flex-wrap gap-2 py-2">
      <UButton v-ripple class="p-4">BUTTON</UButton>
      <UButton v-ripple class="p-4">BUTTON</UButton>
    </div>
    <hr class="my-4 border-1 border-black">
    <p class="text-3xl py-2">Override using data attributes</p>
    <div class="flex flex-wrap gap-4">
      <span>
        <p class="text-2xl">data-ripple-color</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple :data-ripple-color="toRGBA('green')" class="p-4">GREEN</UButton>
          <UButton v-ripple :data-ripple-color="toRGBA('red')" class="p-4">RED</UButton>
          <UButton v-ripple :data-ripple-color="toRGBA(randomColor)" class="p-4" @click="randomColor = getRandomColor()">RANDOM</UButton>
        </div>
      </span>
      <span>
        <p class="text-2xl">data-ripple-mode</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple data-ripple-mode="click" class="p-4">CLICK</UButton>
          <UButton v-ripple data-ripple-mode="hover" class="p-4">HOVER</UButton>
          <UButton v-ripple data-ripple-mode="pulse" class="p-4">PULSE</UButton>
        </div>
      </span>
      <span>
        <p class="text-2xl">data-ripple-overflow</p>
        <div class="flex gap-2 py-2">
          <UButton v-ripple data-ripple-overflow="false" class="p-4">FALSE</UButton>
          <UButton v-ripple data-ripple-overflow="true" class="p-4">TRUE</UButton>
        </div>
      </span>
    </div>
    <p class="text-2xl">Override multiple attributes</p>
    <div class="flex flex-wrap gap-2 py-2">
      <UButton v-ripple :data-ripple-color="toRGBA('red')" data-ripple-mode="hover" class="p-4">COLOR (red) + MODE (hover)</UButton>
      <UButton v-ripple :data-ripple-color="toRGBA('yellow')" data-ripple-mode="pulse" data-ripple-pulse-speed="2000" class="p-4">COLOR (yellow) + MODE (pulse) + PULSESPEED (200ms)</UButton>
    </div>
    <hr class="my-4 border-1 border-black">
    <p class="text-3xl">Dynamically generated</p>
    <div v-if="dynamic" class="flex gap-2 py-2">
      <UButton v-ripple data-ripple-mode="click" class="p-4" data-ripple-overflow="true">MODE (click)</UButton>
      <UButton v-ripple data-ripple-mode="hover" class="p-4">HOVER</UButton>
      <UButton v-ripple :data-ripple-color="toRGBA('blue')" data-ripple-mode="pulse" data-ripple-overflow="true" class="p-4">BLUE + PULSE + OVERFLOW TRUE</UButton>
    </div>
    <div v-else>
      loading...
    </div>
    <div class="mt-4 underline">
      <NuxtLink to="/">Go back</NuxtLink>
    </div>
  </main>
</template>
