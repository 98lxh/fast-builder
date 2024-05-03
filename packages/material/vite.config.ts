import { resolve } from "node:path";
import VueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import UnoCss from "unocss/vite";
import { vitePluginVueact } from "vite-plugin-vueact"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    UnoCss(),
    vitePluginVueact()
  ],
});
