import VueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import UnoCss from "unocss/vite";
import { vitePluginVueact } from "vite-plugin-vueact"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    UnoCss(),
    vitePluginVueact(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
});
