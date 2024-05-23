import { vitePluginVueact } from "vite-plugin-vueact"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxtjs-naive-ui',
    'nuxt-icons'
  ],
  devServer: {
    port: 8888
  },
  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
        'data-theme': 'dark'
      }
    }
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
