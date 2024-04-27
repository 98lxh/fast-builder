import { vitePluginVueact } from "vite-plugin-vueact"

import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
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
    ],
    '@unocss/nuxt',
    '@vueuse/nuxt',
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
    plugins: [
      vitePluginVueact(),
      Icons({
        scale: 1.5, // Scale of icons against 1em
        defaultStyle: "", // Style apply to icons
        defaultClass: "inline-block h-5 w-5 stroke-current md:h-6 md:w-6", // Class names apply to icons
        compiler: "vue3", // "vue2", "vue3", "jsx"
        jsx: "react", // "react" or "preact"
        autoInstall: true,
      })
    ]
  },
})
