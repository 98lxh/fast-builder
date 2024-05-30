import type { NuxtPage } from "nuxt/schema"
import { vitePluginVueact } from "vite-plugin-vueact"

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxtjs-naive-ui',
    'nuxt-icons'
  ],
  devServer: {
    port: 8888
  },
  unocss: {
    theme: { colors: { 'primary': '#1A5CFF' } }
  },
  css: ["~/assets/css/globals.css", '@unocss/reset/tailwind.css'],
  vite: { plugins: [vitePluginVueact()] },
  hooks: {
    'pages:extend'(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* some condition */ true) {
            page.meta ||= {}
            page.meta.middleware = ['redirect']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  }
})
