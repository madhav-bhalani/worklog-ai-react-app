import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

const sourceDirectory = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  envPrefix: ["VITE_", "SERVER_API_KEY"],
  plugins: [react()],
  resolve: {
    alias: {
      "@": sourceDirectory,
    },
  },
  test: {
    exclude: [...configDefaults.exclude, "e2e/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup-tests.ts"],
    css: true,
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
