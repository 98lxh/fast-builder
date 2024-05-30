import VueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import { vitePluginVueact } from "vite-plugin-vueact"
import UnoCss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    UnoCss(),
    vitePluginVueact(),
    AutoImport({
      imports: ["vue"],
      dts: "types/auto-imports.d.ts",
      vueTemplate: true,
    })
  ]
});
