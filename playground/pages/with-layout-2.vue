<script setup lang="ts">
definePageMeta({ layout: 'layout-example' })
</script>

<template>
  <main>
    <p class="text-3xl mb-4">Layout page</p>
    <UButton v-ripple="{ color: 'rgba(0,0,0,0.4)' }" class="p-10">CLICK ME!</UButton>
    <div class="mt-4 underline">
      <NuxtLink to="/">Go to Index</NuxtLink>
    </div>
  </main>
</template>
