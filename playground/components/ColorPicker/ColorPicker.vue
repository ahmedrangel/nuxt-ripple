<!-- Source: https://github.com/nuxt/ui/blob/dev/docs/components/color-picker/ColorPicker.vue  -->
<script setup lang="ts">
import colors from '#tailwind-config/theme/colors'

const appConfig = useAppConfig()
const colorMode = useColorMode()

// Computed

const primaryColors = computed(() =>
  [...appConfig.ui.colors, 'neutral']
    .filter(color => color !== 'primary')
    .map(color => ({ value: color, text: color, hex: colors[color as keyof typeof colors][colorMode.value === 'dark' ? 400 : 500] })),
)
const primary = computed({
  get() {
    return primaryColors.value.find(option => option.value === appConfig.ui.primary)
  },
  set(option) {
    appConfig.ui.primary = option!.value
    window.localStorage.setItem('nuxt-ui-primary', appConfig.ui.primary)
  },
})

const grayColors = computed(() =>
  ['slate', 'cool', 'zinc', 'neutral', 'stone'].map(color => ({
    value: color,
    text: color,
    hex: colors[color as keyof typeof colors][colorMode.value === 'dark' ? 400 : 500],
  })),
)
const gray = computed({
  get() {
    return grayColors.value.find(option => option.value === appConfig.ui.gray)
  },
  set(option) {
    appConfig.ui.gray = option!.value
    window.localStorage.setItem('nuxt-ui-gray', appConfig.ui.gray)
  },
})
</script>

<template>
  <UPopover mode="click">
    <template #default>
      <span class="p-4">&nbsp;</span>
    </template>

    <template #panel>
      <div class="p-2">
        <div class="grid grid-cols-5 gap-px">
          <ColorPickerPill
            v-for="color in primaryColors"
            :key="color.value"
            :color="color"
            :selected="primary!"
            @select="primary = color"
          />
        </div>

        <hr class="border-gray-200 dark:border-gray-800 my-2">

        <div class="grid grid-cols-5 gap-px">
          <ColorPickerPill
            v-for="color in grayColors"
            :key="color.value"
            :color="color"
            :selected="gray!"
            @select="gray = color"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
