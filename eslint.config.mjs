// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
}).append(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'unicorn/escape-case': 'off',
      'no-misleading-character-class': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@stylistic/no-trailing-spaces': 'error',
    },
  },
)
