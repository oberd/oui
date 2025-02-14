import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: "dist-test",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        "combo-box": resolve(__dirname, "src/elements/combo-box.html"),
      },
    },
  },
});
