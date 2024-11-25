<script setup lang="ts">
const colorMode = useColorMode()
const dark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark',
})

const icons = { sun: 'ph:sun-duotone', moon: 'ph:moon-duotone' }

const nav = ref<{ label: string, to?: string, icon?: string, click?: () => void }[][]>([[
  { label: 'Home', to: '/' },
  { label: 'Advanced Demo', to: '/demo' },
  { label: 'With Layout', to: '/with-layout' },
], [
  { label: '', icon: 'heroicons:paint-brush-20-solid' },
  { label: '', icon: '', click: () => dark.value = !dark.value },
]])

onMounted(() => {
  watch(dark, (val) => {
    nav.value[1][1].icon = val ? icons.moon : icons.sun
  }, { immediate: true })
})
</script>

<template>
  <UHorizontalNavigation :links="nav" class="container mx-auto px-2 pt-2 border-b border-gray-300 dark:border-gray-600">
    <template #icon="{ link }">
      <span class="relative">
        <Icon v-if="link.icon" :name="link.icon" class="flex-shrink-0 w-5 h-5 relative text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
        <ColorPicker v-if="link.icon === 'heroicons:paint-brush-20-solid'" class="absolute -top-1/2 -right-1/2" />
      </span>
    </template>
  </UHorizontalNavigation>
</template>
