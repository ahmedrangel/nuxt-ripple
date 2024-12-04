<script setup lang="ts">
definePageMeta({ layout: 'layout-example' })
await new Promise(resolve => setTimeout(resolve, 1000))

useSeoMeta({
  title: `With Layout 2 | ${SITE.name}`,
})

useHead({
  link: [
    { rel: 'canonical', href: SITE.url + '/with-layout-2' },
  ],
})
</script>

<template>
  <main>
    <p class="text-3xl mb-4">Layout page 2</p>
    <UButton v-ripple class="p-10">CLICK ME!</UButton>
  </main>
</template>
