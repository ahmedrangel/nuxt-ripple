<script setup lang="ts">
definePageMeta({ layout: 'layout-example' })

useSeoMeta({
  title: `With Layout | ${SITE.name}`,
})

useHead({
  link: [
    { rel: 'canonical', href: SITE.url + '/with-layout' },
  ],
})
</script>

<template>
  <main>
    <p class="text-3xl mb-4">Layout page</p>
    <UButton v-ripple class="p-10">CLICK ME!</UButton>
  </main>
</template>
