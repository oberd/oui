import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/oui.js",
      name: "oui",
    },
  },
});
