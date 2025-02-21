import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "oui-video-slice",
      entry: resolve(__dirname, "src/video-slice.js"),
      fileName: "oui-video",
    },
  },
});
