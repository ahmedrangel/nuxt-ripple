<template>
  <div id="layout" class="container mx-auto py-5">
    <div class="flex gap-2">
      <NuxtLink v-ripple="{ mode: 'click' }" class="p-5 bg-black text-white" to="/with-layout">Go to layout page 1</NuxtLink>
      <NuxtLink v-ripple class="p-5 bg-black text-white" to="/with-layout-2">Go to layout page 2</NuxtLink>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>