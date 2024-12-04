<script setup lang="ts">
useSeoMeta({
  title: `Demo | ${SITE.name}`,
  description: 'Nuxt-Ripple Demo',
})

useHead({
  link: [
    { rel: 'canonical', href: SITE.url + '/demo' },
  ],
})
</script>

<template>
  <main>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <div class="flex flex-col items-center">
        <p class="text-4xl font-bold mb-4">Nuxt-Ripple</p>
        <UButton v-ripple class="text-2xl p-10 font-bold">Click me!</UButton>
      </div>
    </div>
  </main>
</template>
