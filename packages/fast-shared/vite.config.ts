import VueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import UnoCss from "unocss/vite";
import { vitePluginVueact } from "vite-plugin-vueact"
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

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
  ],
  resolve: {
    alias: {
      "@fast-builder/shared/": resolve(__dirname, "../fast-shared")
    },
  },
});
