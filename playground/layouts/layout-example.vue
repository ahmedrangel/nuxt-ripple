<template>
  <div id="layout" class="container mx-auto py-5">
    <div class="flex gap-2">
      <UButton v-ripple class="p-5 bg-black text-white">
        <NuxtLink to="/with-layout">Go to layout page 1</NuxtLink>
      </UButton>
      <UButton v-ripple class="p-5 bg-black text-white">
        <NuxtLink to="/with-layout-2">Go to layout page 2</NuxtLink>
      </UButton>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>