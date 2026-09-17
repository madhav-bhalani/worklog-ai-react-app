import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "coverage",
      "dist",
      "node_modules",
      "playwright-report",
      "src/routeTree.gen.ts",
      "test-results",
    ],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["Route"] },
      ],
    },
  },
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "src/test/**/*.ts"],
    languageOptions: {
      globals: globals.vitest,
    },
  },
]);
