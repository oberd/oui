import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "oui",
      entry: resolve(__dirname, "src/oui.js"),
      fileName: "oui",
    },
  },
});
