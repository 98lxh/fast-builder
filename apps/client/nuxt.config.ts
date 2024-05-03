import { vitePluginVueact } from "vite-plugin-vueact"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icons',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ]
  ],
  devServer: {
    port: 8888
  },
  unocss: {
    theme: {
      colors: {
        'primary': '#1A5CFF'
      }
    }
  },
  css: ["~/assets/css/globals.css", '@unocss/reset/tailwind.css'],
  vite: {
    plugins: [vitePluginVueact()]
  },
})
