import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  optimizeDeps: {
    exclude: ["@xmtp/wasm-bindings"],
  },
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [
        {
          browser: "chromium",
          exclude: ["test/Opfs.test.ts"],
        },
        // run OPFS tests in a separate browser context to avoid conflicts
        // with shared OPFS storage
        {
          browser: "chromium",
          name: "OPFS",
          include: ["test/Opfs.test.ts"],
          sequencer: {
            concurrent: false,
          },
        },
      ],
    },
    testTimeout: 120000,
  },
});
