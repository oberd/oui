import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "oui",
      entry: resolve(__dirname, "src/oui.js"),
    },
  },
});
