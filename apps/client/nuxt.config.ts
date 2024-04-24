import { vitePluginVueact } from "vite-plugin-vueact"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ],
  unocss: {
    theme: {
      colors: {
        'primary': '#1A5CFF'
      }
    }
  },
  css: ["~/assets/css/globals.css"],
  vite: {
    plugins: [vitePluginVueact()]
  },
})
