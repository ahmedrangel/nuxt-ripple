<template>
  <div id="layout" class="container mx-auto py-5">
    <div class="flex gap-2">
      <NuxtLink v-ripple to="/with-layout">
        <UButton class="p-5 bg-black text-white" label="Go to layout page 1" />
      </NuxtLink>
      <NuxtLink v-ripple to="/with-layout-2">
        <UButton class="p-5 bg-black text-white" label="Go to layout page 2" />
      </NuxtLink>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
