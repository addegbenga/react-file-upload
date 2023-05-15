// vite.config.js
import { resolve } from "pathe";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "EasyUpload",
      // the proper extensions will be added
      formats: ["cjs", "umd", "es", "iife"],
      fileName: "easyupload",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
